import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { formatDistance } from "date-fns";
import * as React from "react";
import { connect } from "react-redux";
import { ITodo } from "../data/ITodo";
import { thunkToggleTodo } from "../store/Thunk";
import TodoItemDescription from "./TodoItemDescription";
import TodoItemTags from "./TodoItemTags";

interface IProps {
  thunkToggleTodo: (todo: ITodo) => void;
  todo: ITodo;
}

interface StyleProps {
  isDone: boolean;
  priority: number;
}

const getColorPriority = (priority: number) => {
  if (priority === 1) {
    return "auto";
  }

  if (priority === 2) {
    return "orange";
  }

  return "red";
};

const useStyles = makeStyles({
  title: (props: StyleProps) => ({
    textDecorationLine: props.isDone ? "line-through" : "none",
    color: getColorPriority(props.priority)
  })
});

const TodoItem = (props: IProps) => {
  const { thunkToggleTodo, todo } = props;

  const classes = useStyles({
    isDone: todo.isDone,
    priority: todo.priority
  });

  const onCardClick = () => {
    thunkToggleTodo(todo);
  };

  return (
    <CardActionArea>
      <CardContent onClick={onCardClick}>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {todo.isDone ? "Done:" : ""}
          {todo.title}
        </Typography>
        <TodoItemDescription todo={todo} />
        <TodoItemTags todo={todo} />
        <Typography title={todo.createdAt.toLocaleString()}>{formatDistance(todo.createdAt, new Date())}</Typography>
      </CardContent>
    </CardActionArea>
  );
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  { thunkToggleTodo }
)(TodoItem);
