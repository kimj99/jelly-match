import React, { useContext, useEffect } from "react";
import { ProjectContext } from "../HomeMenu/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ProjectOptionsButton from "../Assests/ProjectOptionsButton";
import { IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 20,
        color: "inherit",
        backgroundColor: "white"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});
export function ProjectList() {
    const classes = useStyles();
    const { projects } = useContext(ProjectContext);

    const projectList = projects.length ? (
        projects.map(project => {
            return (
                <Grid item xs={3}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {project.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {project.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">
                                <div className="collection-item" key={project.id}>
                                    <Link
                                        to={{
                                            pathname: project.name,
                                            state: {
                                                id: project.id,
                                                content: "Click Here"
                                            }
                                        }}
                                    >
                                        Click For Details
                  </Link>
                                </div>
                            </Button>
                            <ProjectOptionsButton id={project.id} />
                        </CardActions>
                    </Card>
                </Grid>
            );
        })
    ) : (
            <p className="center"> No Projects </p>
        );
    return (
        <Grid container direction="row">
            {projectList}
        </Grid>
    );
}
