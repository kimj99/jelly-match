import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function GroupCard({ group }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={group.name} />
      <CardContent>
        <List>
          {group.students.map(value => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem >
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  );
}
