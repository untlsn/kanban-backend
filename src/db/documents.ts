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
  subtasks?: {
    title: string,
    done: boolean
  }[]
}

export interface Status {
  statuses: {
    name: string,
    color: string,
  }[]
  _board: string
}
