import React, { useState, useContext, useEffect } from "react";
import { StudentContext } from "../ProjectMenu/StudentContext";
import MaterialTable from "material-table";
import StudentDialog from "../Modals/StudentDialog";
import { handlePost, handlePut, handleDelete } from "../../scripts/apiHelpers";

export default function Table() {
  const { students, projectID } = useContext(StudentContext);

  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "name"
      },
      {
        title: "Email",
        field: "email"
      },
      {
        title: "View Prefernces",
        field: "preferences",
        render: rowData => <StudentDialog student={rowData ? rowData.id : 0} />,
        editable: "never"
      }
    ],
    data: []
  });

  useEffect(() => {
    setState(s => {
      return {
        ...s,
        data: students
      };
    });
  }, [students]);

  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1
      }}
      title="Students"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                const urlPost = "api/project/" + projectID + "/student";
                handlePost(urlPost, newData)
                  .then(data.push(newData))
                  .catch(error => console.log(error));
                return {
                  ...prevState,
                  data
                };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  const urlPut =
                    "api/project/" + projectID + "/student/" + oldData.id;
                  handlePut(urlPut, newData)
                    .then((data[data.indexOf(oldData)] = newData))
                    .catch(error => console.log(error));
                  return {
                    ...prevState,
                    data
                  };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                const urlPut =
                  "api/project/" + projectID + "/student/" + oldData.id;
                handleDelete(urlPut)
                  .then(data.splice(data.indexOf(oldData), 1))
                  .catch(error => console.log(error));
                return {
                  ...prevState,
                  data
                };
              });
            }, 600);
          })
      }}
    />
  );
}
