import { ITodo } from "../data/ITodo";

export interface ITodoState {
  todos: ITodo[];
}

export const ADD_TODO = "ADD_TODO";
export const SET_TODOS = "SET_TODOS";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const RESET_TODOS = "RESET_TODOS";
export const UPDATE_TODO = "UPDATE_TODO";

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: ITodo;
}

interface DeleteTodoAction {
  type: typeof RESET_TODOS;
}

interface SetTodosAction {
  type: typeof SET_TODOS;
  payload: ITodo[];
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  id: string;
}

interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: ITodo;
}

export type TodosActionsTypes = AddTodoAction | DeleteTodoAction | SetTodosAction | ToggleTodoAction | UpdateTodoAction;
