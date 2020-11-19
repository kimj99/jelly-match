import React, { useState, useContext, useEffect } from "react";
import { GroupContext } from "../ProjectMenu/GroupContext";
import { handlePost, handlePut, handleDelete } from "../../scripts/apiHelpers";
import MaterialTable from "material-table";

export default function Table() {
  const { groups, projectID } = useContext(GroupContext);

  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "name"
      },
      {
        title: "Description",
        field: "description"
      }
    ],
    data: []
  });

  useEffect(() => {
    setState(s => {
      return {
        ...s,
        data: groups
      };
    });
  }, [groups]);
  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1
      }}
      title="Groups"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                const urlPost = "api/project/" + projectID + "/group";
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
                    "api/project/" + projectID + "/group/" + oldData.id;
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
                  "api/project/" + projectID + "/group/" + oldData.id;
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
