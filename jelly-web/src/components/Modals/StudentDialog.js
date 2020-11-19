import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { handleGet } from "../../scripts/apiHelpers";
import { StudentContext } from "../ProjectMenu/StudentContext";
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

export default function StudentDialog({ student }) {
  const { projectID } = useContext(StudentContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [preferences, setPreferences] = useState([]);

  function getPreferences() {
    const getURL =
      "/api/project/" + projectID + "/student/" + student + "/preferences";
    handleGet(getURL).then(data => {
      setPreferences(data);
    });
  }
  useEffect(() => {
    getPreferences();
  }, [setPreferences]);

  const students = preferences.students;
  const groups = preferences.groups;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let content;
  if (students == undefined && groups == undefined) {
    content = <div>None Yet</div>;
  } else {
    content = (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Preferences
        </Button>
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
                Student Preferences
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container>
            <Grid item xs={6}>
              <List>
                {students.map(value => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem key={value} button>
                      <ListItemText
                        id={labelId}
                        primary={`Student: ${value}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                {groups.map(value => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem key={value} button>
                      <ListItemText id={labelId} primary={`Group: ${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
  // const handleToggle = value => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  return content;
}
