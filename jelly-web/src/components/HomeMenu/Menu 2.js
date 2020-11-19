import React, { useState, useEffect, createContext } from "react";
import { FormDialog } from "../Modals/FormDialog";
import { ProjectList } from "../ProjectMenu/ProjectList";
import { handleGet } from "../../scripts/apiHelpers";
import HomeHeader from "./HomeHeader";
import { makeStyles } from "@material-ui/core/styles";
export const ProjectContext = createContext(null);

const useStyles = makeStyles(theme => ({
  root: {},
  control: {
    padding: theme.spacing(2)
  }
}));
export function Menu() {
  const classes = useStyles();
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);

  function getProjects() {
    handleGet("api/project")
      .then(data => {
        setProjects(data);
      })
      .catch(console.log);
  }

  useEffect(() => {
    getProjects();
  }, []);
  let content;
  if (projects == undefined) {
    content = <div className={classes.root}> LOADING </div>;
  } else {
    content = (
      <div className={classes.root}>
        <HomeHeader />
        <ProjectContext.Provider
          value={{
            projects,
            getProjects
          }}
        >
          <ProjectList />

          <FormDialog />
        </ProjectContext.Provider>
      </div>
    );
  }
  return content;
}
