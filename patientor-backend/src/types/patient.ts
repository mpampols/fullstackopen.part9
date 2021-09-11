// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NonSensitivePatient = Omit<Patient, 'ssn' >;

export type NewPatientEntry = Omit<Patient, 'id' >;

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}