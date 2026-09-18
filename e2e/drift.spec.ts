import { expect, test, type Page } from "@playwright/test";

/**
 * Path independence.
 *
 * The complaint was "after scrolling and zooming a bit, things get out of
 * place". The property that guarantees it cannot happen is this: how you
 * arrived at a view must not change the view. So we drive a random sequence of
 * gestures, read the URL the app wrote, open that URL cold, and demand that
 * every visible marker sit in the same place to within a pixel. We also check
 * each marker against the axis, so both loads being wrong in the same way is
 * not a pass.
 */

const LINEAR_FLOOR = -3300;

type Snap = {
  ppy: number;
  offsetY: number;
  nowYear: number;
  markers: Record<string, { x: number; y: number; w: number; h: number; anchor: number; yearTop: number }>;
};

async function settle(page: Page) {
  // Drop the hover lens first. It legitimately reveals extra labels under the
  // pointer, which widens a marker's box; a cold load has no pointer, so the
  // two are only comparable once both are un-hovered.
  await page.evaluate(() => {
    const el = document.querySelector("[data-testid=timeline-canvas]");
    if (!el) return;
    for (const type of ["pointerup", "pointerout", "pointerleave"])
      el.dispatchEvent(
        new PointerEvent(type, {
          pointerId: 1,
          bubbles: true,
          relatedTarget: null,
        }),
      );
  });
  // fly-to animations, the debounced URL write, and fonts
  await page.waitForTimeout(900);
  await page.evaluate(
    () =>
      new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r())),
      ),
  );
}

async function snapshot(page: Page): Promise<Snap> {
  return page.evaluate(() => {
    const canvas = document.querySelector("[data-testid=timeline-canvas]")!;
    const markers: Record<string, unknown> = {};
    // Union of the marker's drawn shapes, excluding its text label: a label is
    // revealed or hidden by the hover lens and by collision, which is a
    // labelling decision, not a position. The shapes are the position.
    const shapeBox = (el: Element) => {
      let x1 = Infinity,
        y1 = Infinity,
        x2 = -Infinity,
        y2 = -Infinity;
      for (const c of Array.from(el.querySelectorAll("*"))) {
        if (c.tagName === "text" || c.tagName === "tspan") continue;
        const b = c.getBoundingClientRect();
        if (b.width === 0 && b.height === 0) continue;
        x1 = Math.min(x1, b.x);
        y1 = Math.min(y1, b.y);
        x2 = Math.max(x2, b.x + b.width);
        y2 = Math.max(y2, b.y + b.height);
      }
      if (!Number.isFinite(x1)) return null;
      return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
    };
    for (const el of Array.from(document.querySelectorAll("[data-id][data-anchor-y]"))) {
      const r = shapeBox(el);
      if (!r) continue;
      markers[el.getAttribute("data-id")!] = {
        x: r.x,
        y: r.y,
        w: r.width,
        h: r.height,
        anchor: Number(el.getAttribute("data-anchor-y")),
        yearTop: Number(el.getAttribute("data-year-top")),
      };
    }
    return {
      ppy: Number(canvas.getAttribute("data-ppy")),
      offsetY: Number(canvas.getAttribute("data-offset-y")),
      nowYear: Number(canvas.getAttribute("data-now-year")),
      markers,
    } as never;
  });
}

/** What the axis says this year's pixel is, on this frame's scale. */
function axisY(s: Snap, year: number): number {
  return (s.nowYear - year) * s.ppy - s.offsetY;
}

function rand(seed: number) {
  let x = seed >>> 0;
  return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 0x100000000);
}

async function wheelZoom(page: Page, y: number, deltaY: number) {
  await page.evaluate(
    ([clientY, dy]) => {
      const el = document.querySelector("[data-testid=timeline-canvas]")!;
      el.dispatchEvent(
        new WheelEvent("wheel", {
          deltaY: dy,
          clientX: Math.round(window.innerWidth / 2),
          clientY,
          ctrlKey: true,
          bubbles: true,
          cancelable: true,
        }),
      );
    },
    [Math.round(y), deltaY] as const,
  );
}

async function pinch(page: Page, centerY: number, factor: number) {
  await page.evaluate(
    ([cy, f]) => {
      const el = document.querySelector("[data-testid=timeline-canvas]")!;
      const cx = Math.round(window.innerWidth / 2);
      const mk = (type: string, id: number, x: number, y: number) =>
        el.dispatchEvent(
          new PointerEvent(type, {
            pointerId: id,
            pointerType: "touch",
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
          }),
        );
      const d0 = 80;
      mk("pointerdown", 101, cx, cy - d0);
      mk("pointerdown", 102, cx, cy + d0);
      const d1 = d0 * f;
      mk("pointermove", 101, cx, cy - d1);
      mk("pointermove", 102, cx, cy + d1);
      mk("pointerup", 101, cx, cy - d1);
      mk("pointerup", 102, cx, cy + d1);
    },
    [Math.round(centerY), factor] as const,
  );
}

test.describe("scroll and zoom never move a marker off its date", () => {
  test("random gesture sequences land on the same view as a cold load", async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    let worstPaint = 0;
    let worstWho = "";
    let worstAxis = 0;
    let compared = 0;

    for (let run = 0; run < 3; run++) {
      const r = rand(1000 * (run + 1) + testInfo.project.name.length);
      await page.addInitScript(() => {
        try {
          localStorage.setItem("itl-onboarded", "1");
        } catch {}
      });
      await page.goto("./?y=1258&z=2.6", { waitUntil: "load" });
      await page.waitForTimeout(300);
      const intro = page.getByTestId("onboarding");
      if (await intro.isVisible().catch(() => false))
        await intro.getByRole("button", { name: "Skip" }).click();
      await settle(page);
      const box = page.viewportSize()!;

      const steps = 9;
      for (let i = 0; i < steps; i++) {
        const pick = Math.floor(r() * 6);
        const y = 120 + r() * (box.height - 240);
        if (pick === 0) {
          await page.mouse.move(box.width / 2, y);
          await page.mouse.wheel(0, Math.round((r() - 0.35) * 900));
        } else if (pick === 1) {
          await wheelZoom(page, y, Math.round((r() - 0.5) * 500));
        } else if (pick === 2) {
          await pinch(page, y, 0.6 + r() * 1.2);
        } else if (pick === 3) {
          await page.keyboard.press(r() > 0.5 ? "+" : "-");
        } else if (pick === 4) {
          await page.keyboard.press(r() > 0.5 ? "ArrowDown" : "ArrowUp");
        } else {
          // a fly-to, then let it finish
          await page.keyboard.press(r() > 0.6 ? "Home" : "PageDown");
          await page.waitForTimeout(700);
        }
        await page.waitForTimeout(90);
      }
      // a resize, the last thing that could leave a stale layout behind
      await page.setViewportSize({
        width: box.width,
        height: Math.max(420, box.height - 60),
      });
      await page.waitForTimeout(250);
      await page.setViewportSize(box);
      await settle(page);

      const after = await snapshot(page);
      const url = page.url();

      const fresh = await page.context().newPage();
      await fresh.addInitScript(() => {
        try {
          localStorage.setItem("itl-onboarded", "1");
        } catch {}
      });
      await fresh.setViewportSize(box);
      await fresh.goto(url, { waitUntil: "load" });
      await settle(fresh);
      const cold = await snapshot(fresh);
      await fresh.close();

      expect(
        Object.keys(after.markers).length,
        "the interacted view should have markers to compare",
      ).toBeGreaterThan(5);

      for (const [id, a] of Object.entries(after.markers)) {
        const b = cold.markers[id];
        if (!b) continue;
        compared++;
        const e = Math.max(
          Math.abs(a.x - b.x),
          Math.abs(a.y - b.y),
          Math.abs(a.w - b.w),
          Math.abs(a.h - b.h),
        );
        if (e > worstPaint) {
          worstPaint = e;
          worstWho =
            `${id} url=${url} after(ppy=${after.ppy},off=${after.offsetY.toFixed(2)}) ` +
            `cold(ppy=${cold.ppy},off=${cold.offsetY.toFixed(2)}) ` +
            `a=${JSON.stringify(a)} b=${JSON.stringify(b)}`;
        }
        if (a.yearTop >= LINEAR_FLOOR)
          worstAxis = Math.max(worstAxis, Math.abs(a.anchor - axisY(after, a.yearTop)));
        if (b.yearTop >= LINEAR_FLOOR)
          worstAxis = Math.max(worstAxis, Math.abs(b.anchor - axisY(cold, b.yearTop)));
      }
    }

    console.log(
      `[${testInfo.project.name}] path independence: ${compared} markers compared, ` +
        `max paint error ${worstPaint.toFixed(3)} px, max axis error ${worstAxis.toFixed(3)} px`,
    );
    if (worstPaint > 1) console.log(`worst offender: ${worstWho}`);
    expect(compared).toBeGreaterThan(30);
    expect(worstPaint).toBeLessThanOrEqual(1);
    expect(worstAxis).toBeLessThanOrEqual(1);
    expect(errors, `console errors: ${errors.join(" | ")}`).toHaveLength(0);
  });
});
