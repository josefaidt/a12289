import { useEffect, useState } from 'react'
import { Auth, API } from 'aws-amplify'
import * as queries from '../graphql/queries'
import * as mutations from '../graphql/mutations'

export async function graphql(query, variables) {
  let data
  let error
  try {
    data = await API.graphql({
      query,
      variables,
    })
  } catch (cause) {
    if (cause.errors) {
      error = cause.errors
    }
    data = cause.data
  }
  return { data, error }
}

export async function listTodos() {
  return graphql(queries.listTodos)
}

export async function createTodo() {
  return graphql(mutations.createTodo)
}

export default function HomePage(props) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    listTodos().then(({ data, error }) => {
      setData(data)
      setError(error)
    })
  }, [])

  return (
    <div>
      {/* <button onClick={getData}>Get Data</button> */}
      {!data && !error && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  )
}
