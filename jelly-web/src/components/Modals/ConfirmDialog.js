import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GroupContext } from "../ProjectMenu/GroupContext";
import { handlePost } from "../../scripts/apiHelpers";
export default function ConfirmDialog() {
  const [open, setOpen] = React.useState(false);
  const { projectID, getRuns } = useContext(GroupContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRun = () => {
    const postURL = "/api/project/" + projectID + "/run";
    handlePost(postURL).then(() => getRuns());
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Run Jelly Match!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"About to Match like Peanut Butter and Jelly!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Running Jelly Match will no longer allow you to edit or add new
            students or groups. Is that Okay?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Nooo
          </Button>
          <Button onClick={handleRun} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
