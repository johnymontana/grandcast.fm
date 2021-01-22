import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../lib/auth.js'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()

  function onSubmit(e) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

const EpisodeFeed = () => {
  const FeedQuery = gql`
    {
      episodeFeed(first: 50) {
        id
        title
        audio
        podcast {
          title
        }
      }
    }
  `

  const { data } = useQuery(FeedQuery)
  const { signOut } = useAuth()

  return (
    <div>
      <h1>Episode Feed:</h1>
      <ul>
        {data?.episodeFeed.map((v) => {
          return <li key={v.id}>{v.title}</li>
        })}
      </ul>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default function Home() {
  const { isSignedIn } = useAuth()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>GRANDcast.FM</h1>
        {!isSignedIn() && <SignIn />}
        {isSignedIn() && <EpisodeFeed />}
      </main>
    </div>
  )
}
