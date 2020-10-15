import React from 'react';
import {ScheduleForm} from "../../Forms/ScheduleForm/ScheduleForm";
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";

export const ScheduleCreatePage: React.FC = () => {

  return (
    <DefaultFormLayout
      title="Create New Schedule"
    >
      <ScheduleForm
        onSubmit={(values) => console.log(values)}
      />
    </DefaultFormLayout>
  )
}