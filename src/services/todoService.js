import openSocket from "socket.io-client";

class TodoService {
  baseURL = "http://localhost:5000";
  socket = openSocket("http://localhost:5000");
  async signIn(email, password) {
    return await fetch(`${this.baseURL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async getToken() {
    return await localStorage.getItem("userToken");
  }
  async createUser(user) {
    return await fetch(`${this.baseURL}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async share(sharedTask) {
    return await fetch(`${this.baseURL}/tasks/share`, {
      method: "POST",
      body: JSON.stringify(sharedTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
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
    return await fetch(`${this.baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
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
    return await fetch(`${this.baseURL}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
  }
  async updateTask(task, id) {
    return await fetch(`${this.baseURL}/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getToken()}`
      }
    });
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
