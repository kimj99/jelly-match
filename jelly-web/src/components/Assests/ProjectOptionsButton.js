import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import DeleteConfirmDialog from "../Modals/DeleteConfirmDialog";
import { EditDialog } from "../Modals/EditDialog";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from '@material-ui/core/Tooltip';
import { ProjectContext } from "../HomeMenu/Menu";
import { handleDelete, handlePut } from "../../scripts/apiHelpers";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function ProjectOptionsButton(id) {

  const [state, setState] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setState(id);
  }, [id]);





  // function handleEdit() {
  //   let urlPut = "api/project/" + state.id;
  //   handlePut(urlPut).then(() => getProjects());
  // };

  return (
    <div className={classes.root}>
      <EditDialog id={state.id} />

      <DeleteConfirmDialog id={state.id} />



    </div>
  );
}
