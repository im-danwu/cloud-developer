export interface Task {
  todoId: string
  createdAt: string
  name: string
  completedAt: string
  done: boolean
  attachmentUrl?: string
}
