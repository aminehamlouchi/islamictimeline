import type { TimelineRecord } from "@/lib/types";
import { prophetRecords } from "./prophets";
import { sirahRecords } from "./sirah";
import { companionRecords } from "./companions";
import { earlyScholarRecords } from "./scholars-early";
import { classicalScholarRecords } from "./scholars-classical";
import { laterScholarRecords } from "./scholars-later";
import { bookRecords } from "./books";
import { stateRecords } from "./states";
import { battleRecords } from "./battles";
import { scienceCultureRecords } from "./science-culture";
import { worldRecords } from "./world";
import { movementRegionalRecords } from "./movements-regional";
import { additionRecords } from "./additions";
import { schoolRecords } from "./schools";
import { worldExtraRecords } from "./world-extra";

export const allRecords: TimelineRecord[] = [
  ...prophetRecords,
  ...sirahRecords,
  ...companionRecords,
  ...earlyScholarRecords,
  ...classicalScholarRecords,
  ...laterScholarRecords,
  ...bookRecords,
  ...stateRecords,
  ...battleRecords,
  ...scienceCultureRecords,
  ...worldRecords,
  ...movementRegionalRecords,
  ...additionRecords,
  ...schoolRecords,
  ...worldExtraRecords,
];
