import { makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { ITodo } from "../data/ITodo";

const descriptionHeight = 8;
const tagsHeight = 2.5;

const useStyles = makeStyles({
  description: {
    minHeight: `${descriptionHeight}rem`
  }
});

export default (props: { todo: ITodo }) => {
  const classes = useStyles();
  const { todo } = props;
  const { details } = todo;

  if (!details) {
    return <Skeleton variant="rect" height={`${descriptionHeight + tagsHeight}rem`} />;
  }

  return (
    <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
      {details.description}
    </Typography>
  );
};
