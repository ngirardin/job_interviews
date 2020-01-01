import { ITodo } from "../data/ITodo";
import { ADD_TODO, RESET_TODOS, SET_TODOS, TOGGLE_TODO, UPDATE_TODO } from "./Types";

export const addTodo = (todo: ITodo) => ({
  type: ADD_TODO,
  payload: todo
});

export const resetTodos = () => ({
  type: RESET_TODOS
});

export const setTodos = (todos: ITodo[]) => ({
  type: SET_TODOS,
  payload: todos
});

export const updateTodo = (updatedTodo: ITodo) => ({
  type: UPDATE_TODO,
  payload: updatedTodo
});

export const toggleTodo = (id: string) => ({
  type: TOGGLE_TODO,
  id: id
});
