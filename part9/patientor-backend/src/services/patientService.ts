import patientData from "../../data/patients";
import { NoIdPatient, Patient, PublicPatient } from "../types";
import { v1 as uuid } from 'uuid';

export const getPublicPatients = (): PublicPatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
  );
};

export const addPatient = (patient: NoIdPatient): Patient => {
  const patientObj = {...patient, id: uuid()};
  patientData.push(patientObj);
  return patientObj;
};

export default {
  getPublicPatients,
  addPatient
};




