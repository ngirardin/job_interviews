import { Card, Grid, makeStyles } from "@material-ui/core";
import * as React from "react";
import { ITodo } from "../data/ITodo";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

interface IProps {
  todos: ITodo[];
}

const useStyles = makeStyles({
  card: {
    height: "17rem"
  },
  gridContainer: {
    marginTop: "1rem"
  }
});

export default (props: IProps) => {
  const classes = useStyles();

  const sortedDesc = props.todos.sort((t1, t2) => t2.createdAt.getTime() - t1.createdAt.getTime());

  const todoTodos = sortedDesc.filter(todo => !todo.isDone);
  const remainingTodos = sortedDesc.filter(todo => todo.isDone);
  const todos = [...todoTodos, ...remainingTodos];

  return (
    <Grid container className={classes.gridContainer} spacing={2}>
      <Grid item xs={3}>
        <Card className={classes.card}>
          <CreateTodo />
        </Card>
      </Grid>
      {todos.map(todo => (
        <Grid item xs={3} key={todo.id}>
          <Card className={classes.card}>
            <TodoItem todo={todo} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
