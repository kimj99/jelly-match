import React, { useContext, useState, useEffect } from "react";
import { ProjectContext } from "../HomeMenu/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { handleDelete } from "../../scripts/apiHelpers";
export default function ConfirmDialog(id) {
  const { getProjects } = useContext(ProjectContext);
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(id);
  }, [id]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = () => {
    let urlDelete = "api/project/" + state.id;
    handleDelete(urlDelete).then(() => getProjects());
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"About to delete yuor project"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting the project will delete everything inside. Are you willing
            to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemove} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Nah Cuzin
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
