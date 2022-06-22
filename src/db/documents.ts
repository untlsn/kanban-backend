export interface User {
  login: string,
  email: string,
  password: string
}

export interface Board {
  name: string,
  owner: string
}

export interface Task {
  title: string,
  desc: string,
  status: number,
  _board: string
}

export interface Subtask {
  title: string,
  done: boolean
  _task: string
}

export interface Status {
  name: string,
  owner: string
}
