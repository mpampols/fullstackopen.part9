/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry } from "../types";

const PatientPage = () => {
  const [{ patients, diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  const genderIconProps = {
    male: { name: "mars" as "mars", color: "blue" as "blue" },
    female: { name: "venus" as "venus", color: "pink" as "pink" },
    other: { name: "genderless" as "genderless", color: "grey" as "grey" },
  };

  if (!patient || !diagnoses) {
    return null;
  }

  return (
    <Router>
      <Container textAlign="center">
        <h3>Patient</h3>
      </Container>
      <h1>{ patient.name } <Icon {...genderIconProps[patient.gender]} /></h1>
      <div> ssn: { patient.ssn }</div>
      <div> ocupation: { patient.occupation } </div>
      <h2>entries</h2>
      <div> {Object.values(patient.entries).map((entry: Entry) => (
        <div key={ entry.id }>
          <div>{ entry.date } { entry.description }</div>
          {entry.diagnosisCodes &&
          <ul>
            {Object.values(entry.diagnosisCodes).map(diagnosisCode => (
              <li key={ diagnosisCode }>{ diagnosisCode } { diagnoses[diagnosisCode].name }</li>
            ))}
          </ul>
          }
        </div>
      ))} </div>
    </Router>
  );
};

export default PatientPage;
