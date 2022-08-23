import diagnoseData from "../../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = diagnoseData;

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};