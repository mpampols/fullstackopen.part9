/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef } from "react";
import axios from "axios";

import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Card, Container, Icon } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";
import { toPatient } from "../utils";
import { Patient } from "../types";
import { InvalidPatientError } from "../helpers/errorHelper";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

  const genderIconProps = {
    male: { name: "mars" as "mars", color: "blue" as "blue" },
    female: { name: "venus" as "venus", color: "pink" as "pink" },
    other: { name: "genderless" as "genderless", color: "grey" as "grey" },
  };

  let patient = patients[id];

  try {
    patient = toPatient({ ...patient });
  } catch (e) {
    if (e instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(updatePatient(patientFromApi));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch (e) {
        console.error(e);
      }
    };

    if (fetchStatus.current.shouldFetch) {
      void fetchPatient();
    }
  }, [id, dispatch]);

  if (!patient) return null;

  return (
    <Router>
      <Container textAlign="center">
        <h3>Patient</h3>
      </Container>
      <h1>{ patient.name } <Icon {...genderIconProps[patient.gender]} /></h1>
      <div> ssn: { patient.ssn }</div>
      <div> ocupation: { patient.occupation } </div>

      {patient.entries.length > 0 && <h2>Entries</h2>}
      <Card.Group>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Card.Group>
    </Router>
  );
};

export default PatientPage;
