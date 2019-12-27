import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createTask, deleteTask, getTasks, patchTask } from '../api/tasks-api'
import Auth from '../auth/Auth'
import { Task } from '../types/Todo'

interface TasksProps {
  auth: Auth
  history: History
}

interface TasksState {
  tasks: Task[]
  loadingTasks: boolean
}

export class Tasks extends React.PureComponent<TasksProps, TasksState> {
  state: TasksState = {
    tasks: [],
    loadingTasks: true
  }

  async componentDidMount() {
    try {
      const tasks = await getTasks(this.props.auth.getIdToken())
      this.setState({
        tasks,
        loadingTasks: false
      })
    } catch (e) {
      alert(`Failed to fetch tasks: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Tasks</Header>
        {this.renderTasks()}
      </div>
    )
  }

  renderTasks() {
    if (this.state.loadingTasks) {
      return this.renderLoading()
    }

    return this.renderTasksList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Tasks...
        </Loader>
      </Grid.Row>
    )
  }

  renderTasksList() {
    return (
      <Grid padded>
        {this.state.tasks.map(task => {
          return (
            <Grid.Row key={task.taskId}>
              <Grid.Column width={10} verticalAlign="middle">
                {task.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {task.dueDate}
              </Grid.Column>
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
