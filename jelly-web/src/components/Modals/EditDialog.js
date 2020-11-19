import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { handlePut } from "../../scripts/apiHelpers";
import { ProjectContext } from "../HomeMenu/Menu";
export function EditDialog(id) {
  const { getProjects } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(id);
  }, [id]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    const body = {
      name: name,
      description: desc
    };
    console.log(body);
    handlePut("api/project/" + state.id, body).then(() => getProjects());
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit" aria-label="edit">
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
        <DialogContent>
          <DialogContentText>Project</DialogContentText>
          <TextField
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Description</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
