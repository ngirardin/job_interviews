import { Button, Container, createStyles, Icon, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import AddUserForm from "./components/AddUserForm";
import Errors from "./components/Errors";
import UploadArea from "./components/UploadArea";
import UsersTable from "./components/UsersTable";
import User, { IUser } from "./model/User";
import CSVParser, { IInvalidResult, IResult, IValidResult } from "./parser/CSVParser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2)
    },
    container: {
      marginTop: "3rem"
    },

    rightIcon: {
      marginLeft: theme.spacing(1)
    }
  })
);

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [errors, setErrors] = useState<IInvalidResult[]>([]);
  const [addFormVisible, setAddFormVisible] = useState(false);

  const classes = useStyles();

  const onAddUser = (user: IUser) => {
    setAddFormVisible(false);
    setUsers([...users, user]);
  };

  const onAddUserClick = () => setAddFormVisible(true);

  const onCancelAddUser = () => setAddFormVisible(false);

  const onUpload = (file: string): void => {
    setErrors([]);
    const lines = file.split("\n");
    const results: IResult[] = CSVParser.parse(lines);

    const invalid: IInvalidResult[] = results.filter(result => !result.valid) as IInvalidResult[];

    if (invalid.length > 0) {
      setErrors(invalid);
      return;
    }

    const users = results.filter(result => result.valid).map(result => (result as IValidResult).user);
    setUsers(users);
  };

  const onDeleteUser = (user: IUser) => setUsers(users.filter(u => u !== user));

  const onEditUser = (newUser: IUser, oldUser: IUser): boolean => {
    const errors = User.validate(newUser);

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    setUsers(
      users.map(user => {
        if (user === oldUser) {
          return newUser;
        }

        return user;
      })
    );

    return true;
  };

  const onSendClick = async () => {
    await fetch("/api/invite", {
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  };

  const showUploadArea = users.length === 0;
  const showUsersTable = users.length > 0 && !addFormVisible && errors.length === 0;
  const showAddUserForm = users.length > 0 && addFormVisible && errors.length === 0;
  const showErrors = users.length === 0 && errors.length > 0;

  return (
    <Container className={classes.container}>
      {showUploadArea ? <UploadArea onUpload={onUpload} /> : null}
      {showUsersTable ? (
        <>
          <UsersTable
            onAddUserClick={onAddUserClick}
            onDeleteUser={onDeleteUser}
            onEditUser={onEditUser}
            users={users}
          />
          <Button className={classes.button} onClick={onSendClick} variant="contained" color="primary">
            Send <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </>
      ) : null}
      {showAddUserForm ? <AddUserForm onAddUser={onAddUser} onCancel={onCancelAddUser} /> : null}
      {showErrors ? <Errors errors={errors} /> : null}
    </Container>
  );
};

export default App;
