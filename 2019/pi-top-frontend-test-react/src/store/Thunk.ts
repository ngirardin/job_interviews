import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import Api from "../data/Api";
import { ICreateTodo, ITodo } from "../data/ITodo";
import { addTodo, setTodos, updateTodo } from "./Actions";
import { AppState } from "./Store";

const thunkAddTodo = (todo: ICreateTodo): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const addedTodo: ITodo = await Api.create(todo);
  dispatch(addTodo(addedTodo));
};

const thunkFetchTodos = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  // Fetch all the todos
  const allTodos: ITodo[] = await Api.all();

  // Make an additional async call for each todo to detch its description
  dispatch(setTodos(allTodos));

  allTodos.forEach(async todo => {
    const todoWithDetails = await Api.get(todo);
    dispatch(updateTodo(todoWithDetails));
  });
};

const thunkToggleTodo = (todo: ITodo): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const todoWithDetails = await Api.toggle(todo);
  dispatch(updateTodo(todoWithDetails));
};

const thunkResetTodos = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  await Api.reset();
  dispatch(thunkFetchTodos());
};

export { thunkAddTodo, thunkFetchTodos, thunkResetTodos, thunkToggleTodo };
