import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import * as React from "react";
import { connect } from "react-redux";
import "./App.css";
import TodoList from "./components/TodoList";
import { AppState } from "./store/Store";
import { thunkFetchTodos, thunkResetTodos } from "./store/Thunk";
import { ITodoState } from "./store/Types";

interface AppProps {
  todos: ITodoState;
  thunkFetchTodos: () => void;
  thunkResetTodos: () => void;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

const App: React.FC<AppProps> = (props: AppProps) => {
  const { todos, thunkFetchTodos, thunkResetTodos } = props;

  React.useEffect(() => {
    thunkFetchTodos();
  }, [thunkFetchTodos]);

  return (
    <Container>
      <TodoList todos={todos.todos} />
      <Button onClick={thunkResetTodos}>Delete all TODOs</Button>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { thunkFetchTodos, thunkResetTodos }
)(App);
