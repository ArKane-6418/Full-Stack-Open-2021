import patientData from "../../data/patients";
import { NoIdPatient, Patient, PublicPatient } from "../types";
import { v1 as uuid } from 'uuid';

const getPublicPatients = (): PublicPatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
  );
};

const addPatient = (patient: NoIdPatient): Patient => {
  const patientObj = {...patient, id: uuid()};
  console.log(`Patient object: ${patientObj}`);
  return patientObj;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
}

export default {
  getPublicPatients,
  addPatient,
  findById
};




