import type { Page } from "@playwright/test";

/** A visitor on a phone drags; mobile WebKit has no wheel at all. */
export const isPhone = (project: string) => project.includes("phone");

export async function dismissIntro(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem("itl-onboarded", "1");
    } catch {}
  });
}

/** Travel through time the way this device can: a wheel, or a drag. */
export async function travel(page: Page, project: string, dy: number, atY?: number) {
  const h = page.viewportSize()!.height;
  const y = atY ?? h / 2;
  if (isPhone(project)) {
    const x = page.viewportSize()!.width / 2;
    const from = Math.min(Math.max(y, 80), h - 80);
    await page.mouse.move(x, from);
    await page.mouse.down();
    await page.mouse.move(x, Math.min(Math.max(from - dy, 40), h - 40), { steps: 10 });
    await page.mouse.up();
  } else {
    await page.evaluate(
      ([clientY, deltaY]) => {
        document.querySelector("[data-testid=timeline-canvas]")!.dispatchEvent(
          new WheelEvent("wheel", {
            deltaY,
            clientX: Math.round(window.innerWidth / 2),
            clientY,
            bubbles: true,
            cancelable: true,
          }),
        );
      },
      [Math.round(y), dy] as const,
    );
  }
}

/** Two fingers, the way zoom works on a phone. */
export async function pinch(page: Page, centerY: number, factor: number) {
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
