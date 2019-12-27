import React from 'react'
import {
  Link,
  Route,
  Router,
  Switch,
  RouteComponentProps
} from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditReward } from './components/EditReward'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { Todos } from './components/Task'
import { Rewards } from './components/Rewards'
import { AccountBalance } from './components/AccountBalance'
import { provideAccount } from './state/accountState'

export interface AppProps {}

export interface AppProps extends RouteComponentProps {
  auth: Auth
}

const App: React.FunctionComponent<AppProps> = ({ children, ...props }) => {
  const { auth, history } = props

  const handleLogin = () => auth.login()

  const handleLogout = () => auth.logout()

  const generateMenu = () => (
    <Menu>
      <Menu.Item name="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      {auth.isAuthenticated() && (
        <Menu.Item name="tasks">
          <Link to="/tasks">Tasks</Link>
        </Menu.Item>
      )}
      <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
    </Menu>
  )

  const logInLogOutButton = () =>
    auth.isAuthenticated() ? (
      <Menu.Item name="logout" onClick={handleLogout}>
        Log Out
      </Menu.Item>
    ) : (
      <Menu.Item name="login" onClick={handleLogin}>
        Log In
      </Menu.Item>
    )

  const generateCurrentPage = () => {
    if (!auth.isAuthenticated()) {
      return <LogIn auth={auth} />
    }

    return (
      <Switch>
        <Route path="/" exact>
          <AccountBalance auth={auth} />
          <Rewards history={history} auth={auth} />
        </Route>

        <Route path="/tasks" exact>
          <AccountBalance auth={auth} />
          <Todos history={history} auth={auth} />
        </Route>

        <Route
          path="/rewards/:rewardId/edit"
          exact
          render={routeProps => (
            <>
              <AccountBalance auth={auth} />
              <EditReward auth={auth} {...routeProps} />
            </>
          )}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }

  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={props.history}>
                {generateMenu()}
                {generateCurrentPage()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

export default provideAccount(App)
