import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { IInvalidResult } from "../parser/CSVParser";

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontSize: "2rem"
    }
  })
);

export default (props: { errors: IInvalidResult[] }) => {
  const classes = useStyles();

  const errors = props.errors.slice(0, 10);

  const andMore =
    props.errors.length > 10 ? <Typography>... and {props.errors.length - 10} more errors</Typography> : null;

  return (
    <>
      <Typography variant="h2" className={classes.h2}>
        There's something wrong with this file:
      </Typography>
      <ul>
        {errors.map(error => (
          <li key={error.index}>
            <Typography>
              On line {error.index + 1}: {error.message}
            </Typography>
          </li>
        ))}
      </ul>
      {andMore}
    </>
  );
};
