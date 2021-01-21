import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useQuery, useMutation, gql } from '@apollo/client'

import { useAuth } from '../lib/auth'

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

const EpisodeFeed = () => {
  const { data } = useQuery(FeedQuery)
  const { signOut } = useAuth()
  return (
    <div>
      <h1>Episode Feed</h1>
      <ul>
        {data?.episodeFeed.map((v) => {
          return <li key={v.id}>{v.title}</li>
        })}
      </ul>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signOut } = useAuth()

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
        <button type="submit">Sign In</button>
      </form>
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
      <h1>GRANDcast.FM</h1>
      {!isSignedIn() && <SignIn />}
      {isSignedIn() && <EpisodeFeed />}
    </div>
  )
}
