import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure({
  ...awsExports,
  API: {
    graphql_endpoints: '/api/graphql',
  },
})

export default function MyApp({ Component, pageProps }) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Component {...pageProps} />
        </main>
      )}
    </Authenticator>
  )
}
