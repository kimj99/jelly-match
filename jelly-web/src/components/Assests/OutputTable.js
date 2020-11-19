import React, { useContext, useState, useEffect } from "react";
import { GroupContext } from "../ProjectMenu/GroupContext";
import MaterialTable from "material-table";
import ResultsModal from "../Modals/ResultsModal";
export default function OutputTable() {
  const { runs, getRuns } = useContext(GroupContext)
  const [matches, setMatches] = useState([]);
  const [state, setState] = useState({
    columns: [
      { title: "Run Number", field: "name" },
      { title: "Unhappiness Score(Lower the better!)", field: "score" },
      {
        title: "View Results",
        field: "runs",
        render: rowData => <ResultsModal runID={rowData.id} />,
        editable: "never"
      }],
    data: []
  })

  useEffect(() => {
    setState(r => {
      return {
        ...r,
        data: runs
      };
    });
  }, [runs]);
  return (
    <MaterialTable
      title="Run Results "
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
