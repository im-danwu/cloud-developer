import dateFormat from 'dateformat'
import { History } from 'history'
import * as React from 'react'
import { Divider, Grid, Header, Loader } from 'semantic-ui-react'

import { getTasks } from '../api/tasks-api'
import Auth from '../auth/Auth'
import { Task } from '../types/Task'

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
        <Divider />
        <Header as="h1">Completed Tasks</Header>
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
        {this.state.tasks
          .sort((a, b) =>
            new Date(a.completedAt) < new Date(b.completedAt) ? 1 : -1
          )
          .map(task => {
            return (
              <Grid.Row key={task.todoId}>
                <Grid.Column width={10} verticalAlign="middle">
                  <Header as="h3">
                    {task.name}
                    <Header.Subheader>
                      {dateFormat(task.completedAt, 'yyyy-mm-dd')}
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width={3} floated="right"></Grid.Column>
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
