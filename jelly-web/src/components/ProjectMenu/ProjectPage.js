import React, { useEffect, useState } from "react";
import StudentTable from "../Assests/StudentTable";
import GroupTable from "../Assests/GroupTable";
import { useLocation } from "react-router";
import { StudentContext } from "./StudentContext";
import { GroupContext } from "./GroupContext";
import ProjectHeader from "./ProjectHeader";
import OutputTable from "../Assests/OutputTable";
import { Container, Grid, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmDialog from "../Modals/ConfirmDialog";
import { handleGet } from "../../scripts/apiHelpers";
import EmailConfirmDialog from "../Modals/EmailConfirmDialog";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import IconButton from "@material-ui/core/IconButton";
import MysteryButton from "../Assests/MysteryButton";
import "../../style/meme.css";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1",
    borderBottom: 10,
    borderTop: 10
  },
  header: {
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
export function ProjectPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [runs, setRuns] = useState([]);
  const projectID = useLocation().state.id;
  const [run, setRun] = useState();

  const [toggleState, setToggleState] = useState("off");

  function toggle() {
    setToggleState(toggleState === "off" ? "on" : "off");
  }

  function getStudents() {
    let getURL = "api/project/" + projectID + "/student";
    handleGet(getURL).then(data => {
      setStudents(data);
    });
  }

  function getGroups() {
    let getURL = "api/project/" + projectID + "/group";
    handleGet(getURL).then(data => {
      setGroups(data);
    });
  }

  function getRuns() {
    const postURL = "/api/project/" + projectID + "/output";
    handleGet(postURL).then(data => {
      setRuns(data);
    });
  }

  useEffect(() => {
    getStudents();
  }, [setStudents, setGroups]);

  useEffect(() => {
    getGroups();
  }, [setGroups]);

  useEffect(() => {
    getRuns();
  }, [setRuns]);
  console.log(toggleState);
  let content;
  if (toggleState == "on") {
    content = (
      <div className="meme">
        <div className={classes.root}>
          <Container>
            <div className={classes.header}>
              <ProjectHeader />
            </div>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <StudentContext.Provider
                  value={{ students, projectID, getStudents }}
                >
                  <StudentTable />
                </StudentContext.Provider>
              </Grid>
              <GroupContext.Provider
                value={{ groups, getGroups, projectID, getRuns, runs }}
              >
                <Grid item xs={6}>
                  <GroupTable />
                </Grid>
                <Grid item xs={6}>
                  <ConfirmDialog />
                </Grid>
                <Grid item xs={6}>
                  <EmailConfirmDialog />
                </Grid>

                <Grid item xs={12}>
                  <OutputTable />
                </Grid>
              </GroupContext.Provider>
            </Grid>
          </Container>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.root}>
        <Container>
          <div className={classes.header}>
            <ProjectHeader />
          </div>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <StudentContext.Provider
                value={{ students, projectID, getStudents }}
              >
                <StudentTable />
              </StudentContext.Provider>
            </Grid>
            <GroupContext.Provider
              value={{ groups, getGroups, projectID, getRuns, runs }}
            >
              <Grid item xs={6}>
                <GroupTable />
              </Grid>
              <Grid item xs={6}>
                <ConfirmDialog />
              </Grid>
              <Grid item xs={6}>
                <EmailConfirmDialog />
              </Grid>

              <Grid item xs={12}>
                <OutputTable />
              </Grid>
            </GroupContext.Provider>
          </Grid>
        </Container>
      </div>
    );
  }
  return (
    <>
      {content}
      <div className={`switch ${toggleState}`} onClick={toggle} />
    </>
  );
}
