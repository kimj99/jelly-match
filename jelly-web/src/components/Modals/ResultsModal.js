import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import ListIcon from "@material-ui/icons/List";
import { Grid } from "@material-ui/core";
import GroupCard from "../Assests/GroupCard";
import { GroupContext } from "../ProjectMenu/GroupContext"
import { handleGet } from "../../scripts/apiHelpers";
const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultsModal(runID) {
  const { projectID } = useContext(GroupContext)
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState([]);

  const handleClickOpen = () => {
    const getURL = "/api/project/" + projectID + "/output/" + runID.runID;
    handleGet(getURL).then(response => setState(response));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <ListIcon />
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Matching Results
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>

          {state.map(group => {
            return (
              <Grid item xs={3}>
                <GroupCard group={group} />
              </Grid>
            );
          }
          )}

        </Grid>
      </Dialog>
    </div>
  );
}
