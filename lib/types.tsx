
export interface User {
  id: string
  email: string
  name: string
}

export interface Entry {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
}
export interface EntryInput {
  title: string
  content: string
}