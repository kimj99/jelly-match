import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { handlePost } from "../../scripts/apiHelpers";
import { ProjectContext } from "../HomeMenu/Menu";
export function FormDialog() {
  const { projects, getProjects } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    const body = {
      name: name,
      description: desc
    };
    console.log(body);
    handlePost("api/project", body).then(() => getProjects());
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
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
          <DialogContentText>Descriptioon</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
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
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
