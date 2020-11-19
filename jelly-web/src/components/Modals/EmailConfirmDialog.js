import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GroupContext } from "../ProjectMenu/GroupContext";
import { handlePost } from "../../scripts/apiHelpers";
export default function ConfirmDialog() {
  const [open, setOpen] = useState(false);
  const { projectID } = useContext(GroupContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handlePost("api/project/" + projectID + "/send_mail");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Send email to all students
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
            After you send the email, please do not add any more students or
            groups. The program will get very upset with you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Get me outta here
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            I am sure?(Yes)
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
