import { ITodo } from "../data/ITodo";
import TodoReducer from "./TodoReducer";

const firstTodo: ITodo = {
  id: "first",
  createdAt: new Date("2018-01-01T11:25:52.087Z"),
  title: "Todo without details",
  priority: 1,
  isDone: true
};

const firsTodoDetails = {
  description: "first todo description",
  tags: ["first tag", "second tag"]
};

const firstTodoWithDetails: ITodo = {
  ...firstTodo,
  details: firsTodoDetails
};

const secondTodo: ITodo = {
  id: "second",
  createdAt: new Date("2018-08-07T11:25:52.087Z"),
  title: "Todo with details",
  priority: 2,
  isDone: false,
  details: {
    description: "Description of the stuff to do",
    tags: ["first tag", "second tag"]
  }
};

const initialState = {
  todos: [firstTodo, secondTodo]
};

describe("The reducer", () => {
  it("should add a todo", () => {
    const expected = { todos: [...initialState.todos, secondTodo] };
    expect(TodoReducer(initialState, { type: "ADD_TODO", payload: secondTodo })).toEqual(expected);
  });

  it("should set the todos", () => {
    const payload = [firstTodo, secondTodo];
    const expected = { todos: payload };
    expect(TodoReducer({ todos: [] }, { type: "SET_TODOS", payload })).toEqual(expected);
  });

  it("should toggle a todo", () => {
    const expected = { todos: [firstTodo, { ...secondTodo, isDone: true }] };
    expect(TodoReducer(initialState, { type: "TOGGLE_TODO", id: secondTodo.id })).toEqual(expected);
  });

  it("should update a todos", () => {
    const payload = {
      id: "second",
      createdAt: new Date("2018-01-25T11:25:52.087Z"),
      title: "Second todo updated",
      priority: 2,
      isDone: false,
      details: {
        description: "first todo description",
        tags: ["first tag", "second tag"]
      }
    };

    const newState = TodoReducer(initialState, { type: "UPDATE_TODO", payload });
    const expected = { todos: [firstTodo, payload] };

    expect(newState).toEqual(expected);
  });
});
