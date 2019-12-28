import React, { useEffect } from 'react'
import { Grid, Header, Loader } from 'semantic-ui-react'

import Auth from '../auth/Auth'
import { useAccount } from '../state/accountState'

interface AccountBalanceProps {
  auth: Auth
}

export const AccountBalance: React.FunctionComponent<AccountBalanceProps> = props => {
  const { account, handleSyncTasks } = useAccount()
  const { balance, syncingTasks } = account

  const { auth } = props

  useEffect(() => {
    if (auth.getIdToken()) {
      handleSyncTasks(auth.getIdToken())
    }
  }, [auth])

  return syncingTasks ? (
    <Grid.Row>
      <Loader indeterminate active inline="centered">
        Checking your balance...
      </Loader>
    </Grid.Row>
  ) : (
    <div>
      <Header as="h1">
        Account Balance
        <Header.Subheader>{balance} points</Header.Subheader>
      </Header>
    </div>
  )
}
