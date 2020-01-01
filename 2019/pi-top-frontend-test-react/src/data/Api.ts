import Http from "./Http";
import { ICreateTodo, ITodo } from "./ITodo";

const apiBase = "https://backend.pi-top.com/todo-test/v1";

type IDetails = {
  description: string;
  tags: string[];
};

const parseDetails = (json: any): IDetails | undefined => {
  const hasDescription = json.description;
  const hasTags = json.tags;

  if (!hasDescription && !hasTags) {
    return;
  }

  if (!hasDescription) {
    throw new Error("Missing description");
  }

  if (!hasTags) {
    throw new Error("Missing tags");
  }

  return {
    description: json.description,
    tags: json.tags
  };
};

const toTodo = (json: any): ITodo => ({
  createdAt: new Date(json.createdAt),
  id: json.id,
  isDone: json.isDone,
  priority: parseInt(json.priority, 10),
  title: json.title,
  details: parseDetails(json)
});

// The API need and retrun a number for "create", but a string for "all" and "get"
// Looks like the server app could use some typescript love :)
export default {
  all: async (): Promise<ITodo[]> => {
    const apiTodo = await Http.get<any[]>(`${apiBase}/todos`);
    return apiTodo.map(toTodo).sort((o1: ITodo, o2: ITodo) => o1.createdAt.getTime() - o2.createdAt.getTime());
  },

  create: async (todo: ICreateTodo): Promise<ITodo> => {
    const addedTodo = await Http.post<any>(`${apiBase}/todos`, todo);
    return toTodo(addedTodo);
  },

  get: async (todo: ITodo): Promise<ITodo> => {
    const { id } = todo;
    const apiTodo = await Http.get<any>(`${apiBase}/todos/${id}`);
    return toTodo(apiTodo);
  },

  reset: async (): Promise<void> => {
    await Http.postWithoutResponse(`${apiBase}/reset`);
  },

  toggle: async (todo: ITodo): Promise<ITodo> => {
    const { id } = todo;
    const apiTodo = await Http.put(`${apiBase}/todos/${id}`, { isDone: !todo.isDone });
    return toTodo(apiTodo);
  }
};
