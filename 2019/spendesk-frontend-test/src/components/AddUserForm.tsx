import { Button, createStyles, Grid, makeStyles, MenuItem, Paper, Theme } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import User, { IUser } from "../model/User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(2)
    },
    saveButton: {
      marginRight: theme.spacing(2)
    }
  })
);

const initialValues: IUser = {
  firstName: undefined,
  lastName: undefined,
  gender: undefined,
  email: undefined,
  phone: undefined
};

interface IProps {
  onAddUser: (user: IUser) => void;
  onCancel: () => void;
}

export default (props: IProps) => {
  const classes = useStyles();

  const { onAddUser, onCancel } = props;

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={initialValues}
        validationSchema={User.schema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onAddUser(values);
        }}
      >
        {({ isSubmitting, isValid, submitForm }) => (
          <Form>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field name="firstName" label="First name" component={TextField} />
              </Grid>

              <Grid item>
                <Field name="lastName" label="Last name" component={TextField} />
              </Grid>

              <Grid item>
                <Field name="gender" label="Gender" component={Select}>
                  <MenuItem value="f">f</MenuItem>
                  <MenuItem value="m">m</MenuItem>
                </Field>
              </Grid>

              <Grid item>
                <Field name="email" label="Email" type="email" component={TextField} />
              </Grid>

              <Grid item>
                <Field name="phone" label="Phone" type="phone" component={TextField} />
              </Grid>

              <Grid item>
                <Button
                  className={classes.saveButton}
                  color="primary"
                  disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                  variant="contained"
                >
                  Save
                </Button>

                <Button color="secondary" onClick={onCancel} variant="contained">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
