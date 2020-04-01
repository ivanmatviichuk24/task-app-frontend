import openSocket from "socket.io-client";

class TodoService {
  checkStatus(response) {
    if (!response.ok) {
      throw new Error();
    }
  }
  baseURL = "https://task-app-test.herokuapp.com";
  socket = openSocket("https://task-app-test.herokuapp.com");

  connectSocket(email) {
    this.socket.emit("login", email);
    this.socket.on("reconnect", () => {
      this.socket.emit("login", email);
    });
  }
  disconnectSocket() {
    this.socket.disconnect();
    this.socket = openSocket("https://task-app-test.herokuapp.com");
  }

  async signIn(email, password) {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.checkStatus(response);
    return await response.json();
  }

  async getToken() {
    return await localStorage.getItem("userToken");
  }
  async createUser(user) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.checkStatus(response);
    return await response.json();
  }

  async share(sharedTask) {
    const response = await fetch(`${this.baseURL}/tasks/share`, {
      method: "POST",
      body: JSON.stringify(sharedTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
    this.checkStatus(response);
    return await response.json();
  }

  async signOut() {
    return await fetch(`${this.baseURL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
  }

  async signOutAll(token) {
    return await fetch(`${this.baseURL}/users/logoutAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getProfile() {
    const token = await this.getToken();
    const response = await fetch(`${this.baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    this.checkStatus(response);
    return await response.json();
  }

  async updateProfile(token, user) {
    return await fetch(`${this.baseURL}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteProfile(token) {
    return await fetch(`${this.baseURL}/users/me`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  async addTask(task) {
    const response = await fetch(`${this.baseURL}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
    this.checkStatus(response);
    return await response.json();
  }
  async updateTask(task, id) {
    const response = await fetch(`${this.baseURL}/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
    this.checkStatus(response);
    return await response.json();
  }

  async loadTask(id) {
    return await fetch(`${this.baseURL}/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
  }
  async loadTasks() {
    const token = await this.getToken();
    console.log("token" + token);
    return await fetch(`${this.baseURL}/tasks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteTask(id) {
    const token = await this.getToken();
    return await fetch(`${this.baseURL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export default TodoService;
