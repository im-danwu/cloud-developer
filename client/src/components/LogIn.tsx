import * as React from 'react'
import Auth from '../auth/Auth'
import { Header, Button, Message, Icon } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState {}

export class LogIn extends React.PureComponent<LogInProps, LogInState> {
  onLogin = () => {
    this.props.auth.login()
  }

  render() {
    const list = [
      'Enable Google Tasks for your GMail account.',
      'Create and complete a few tasks.',
      'Log in to the app using the green button below. You will have to give permissions for the app to read your Google Tasks data.',
      'Your account balance should equal the number of tasks completed in Google Tasks.',
      'Create a reward. Update its cost and adding a picture.',
      'Redeem the reward and see your balance go down by the cost of the reward.',
      'Click the Tasks tab to see which tasks have been synced to the app.'
    ]

    return (
      <div>
        <Header as="h1">Please log in</Header>
        <Message
          info
          size="large"
          icon="info circle"
          header="Instructions"
          content="This content should have been available with the Udacity project submission as well."
          list={list}
        />
        <Message attached="bottom" warning>
          <Icon name="help" />
          Not familiar with Google Tasks?&nbsp;
          <a href="https://support.google.com/tasks/answer/7675772?co=GENIE.Platform%3DDesktop&hl=en">
            Get started here.
          </a>
        </Message>
        <Button onClick={this.onLogin} size="huge" color="olive">
          Log in
        </Button>
      </div>
    )
  }
}
