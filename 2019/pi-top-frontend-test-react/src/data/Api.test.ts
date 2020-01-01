import Api from "./Api";
import { ITodo } from "./ITodo";

// This is an integration test, in the real world we'll run it against a staging api or a mock that provides a
// response
describe("The Api", () => {
  beforeAll(async () => {
    await Api.reset();
  });

  it("should fetch all the todos", async () => {
    const todos = await Api.all();
    expect(todos).toBe(todos);
  });

  it("should fetch a todo", async () => {
    const expected: ITodo = {
      id: "gsrbE1H3Z",
      createdAt: new Date("2018-08-07T11:26:01.463Z"),
      title: "conquer the world",
      isDone: false,
      priority: 8,
      details: {
        description: "- get media attention\n- show up at the White House a lot\n- put everyone in fondu",
        tags: ["power", "dairy"]
      }
    };

    // Fetch all the todos
    const allTodos = await Api.all();

    // Fetch the details for the second todo
    const secondTodo = allTodos[1];

    const secondTodoDetails = await Api.get(secondTodo);
    expect(secondTodoDetails).toEqual(expected);
  });
});
