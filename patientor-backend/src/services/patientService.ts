import patientEntries from './../data/patients';
import uuid from 'uuid';

import { NonSensitivePatient, Patient, NewPatientEntry } from '../types/patient';

const patients: Array<NonSensitivePatient> = patientEntries.map(
  ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries
  })
);

const getEntries = (): Array<NonSensitivePatient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (patientId: string): NonSensitivePatient | undefined => {
  console.log(patientId);
  return patients.find(patient => patient.id === patientId);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient
};