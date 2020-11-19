import React, { useState } from "react";
import { useParams } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end"
  }
}));

export default function ProminentAppBar() {
  let { name } = useParams();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <NavLink to="/">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            </NavLink>
            <Typography className={classes.title} variant="h5" noWrap>
              Project: {name}
            </Typography>
            <Typography>

            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
