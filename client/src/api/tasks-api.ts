import { apiEndpoint } from '../config'
import { Task } from '../types/Task'
import Axios from 'axios'

export async function getTasks(idToken: string): Promise<Task[]> {
  console.log('Fetching tasks')

  const response = await Axios.get(`${apiEndpoint}/tasks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('Tasks:', response.data)
  return response.data.items
}
