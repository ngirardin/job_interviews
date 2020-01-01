export interface ITodo {
  createdAt: Date;
  id: string;
  isDone: boolean;
  priority: number;
  title: string;
  details?: {
    description: string;
    tags: string[];
  };
}

export interface ICreateTodo {
  title: string;
  description: string;
  priority: number;
  tags: string[];
}
