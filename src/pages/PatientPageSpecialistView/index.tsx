import React from "react";
import { useParams } from "react-router-dom";

const PatientPageSpecialistView = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      {id}
      <div>PatientPageSpecialistView</div>
    </div>
  );
};

export default PatientPageSpecialistView;
