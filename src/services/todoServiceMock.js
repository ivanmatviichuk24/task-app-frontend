let tasks = [
  {
    id: 1,
    title: "create task app",
    description: "nerdysoft test app"
  },
  {
    id: 2,
    title: "task 2",
    description: "description 2"
  },
  {
    id: 3,
    title: "task 3",
    description: "description 3"
  },
  {
    id: 4,
    title: "task 4",
    description: "description 4"
  }
];

const users = [
  {
    name: "ivan",
    email: "ivan@example.com",
    password: "user123"
  },
  {
    name: "ivan",
    email: "ivan1@example.com",
    password: "user123"
  }
];

class TodoService {
  async authenticate(email, password) {
    const user = users.filter(
      user => user.email === email && user.password === password
    )[0];
    if (!user) {
      throw new Error("Error");
    }
    return user;
  }

  async signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }

  async loadTasks() {
    return tasks;
  }
  async addTask(task) {
    tasks = [task, ...tasks];
    return tasks;
  }
}

export default TodoService;
