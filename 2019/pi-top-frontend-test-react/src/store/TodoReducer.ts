import { ADD_TODO, ITodoState, SET_TODOS, TodosActionsTypes, TOGGLE_TODO, UPDATE_TODO } from "./Types";

const initialState: ITodoState = {
  todos: []
};

export default (state = initialState, action: TodosActionsTypes): ITodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload]
      };

    case SET_TODOS:
      return {
        todos: action.payload
      };

    case TOGGLE_TODO:
      return {
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, isDone: !todo.isDone };
          }

          return todo;
        })
      };

    case UPDATE_TODO:
      const todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });

      return { todos };

    default:
      return state;
  }
};
