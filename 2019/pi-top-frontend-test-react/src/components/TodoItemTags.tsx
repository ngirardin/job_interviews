import { Chip, makeStyles } from "@material-ui/core";
import React from "react";
import { ITodo } from "../data/ITodo";

const tagsHeight = 2.4;

const useStyles = makeStyles({
  tags: {
    minHeight: `${tagsHeight}rem`
  }
});

export default (props: { todo: ITodo }) => {
  const classes = useStyles();
  const { todo } = props;
  const { details } = todo;

  if (!details) {
    return null;
  }

  return (
    <div className={classes.tags}>
      {details.tags.map(tag => (
        <Chip key={tag} label={tag} variant="outlined" />
      ))}
    </div>
  );
};
