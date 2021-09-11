import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry, Gender, Entry } from '../types/patient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patientId = req.params.id;
  res.send(patientService.getPatient(patientId));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    console.log(e);
    res.status(400).send('error');
  }
});

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };

  return newEntry;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || typeof dateOfBirth !== 'string' || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }

  return dateOfBirth;
};

const parseName = (name: unknown): string => {
  if (!name || typeof name !== 'string') {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || typeof ssn !== 'string') {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!gender || typeof gender !== 'string' || isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || typeof occupation !== 'string') {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default router;