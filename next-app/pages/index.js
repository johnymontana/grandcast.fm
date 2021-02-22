import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../lib/auth.js'
import SignIn from '../components/SignIn'
import Episode from '../components/Episode'
import { Container, VStack } from '@chakra-ui/react'

const EpisodeFeed = () => {
  const FeedQuery = gql`
    {
      episodeFeed(first: 50) {
        id
        title
        audio
        summary
        image
        pubDate {
          day
          month
          year
        }
        podcast {
          title
          image
        }
      }
    }
  `

  const PlaylistQuery = gql`
    {
      playlists {
        name
        episodes {
          id
        }
      }
    }
  `

  const { data } = useQuery(FeedQuery)
  const { data: playlistData } = useQuery(PlaylistQuery)
  const { signOut } = useAuth()

  return (
    <div>
      <VStack spacing={8} w={'100%'}>
        {data?.episodeFeed.map((v) => {
          // return <li key={v.id}>{v.title}</li>
          return (
            <Episode
              key={v.id}
              episode={v}
              playlists={playlistData?.playlists}
            />
          )
        })}
      </VStack>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default function Home() {
  const { isSignedIn } = useAuth()
  return (
    <div>
      <Head>
        <title>GRANDcast.FM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        {!isSignedIn() && <SignIn />}
        {isSignedIn() && <EpisodeFeed />}
      </Container>
    </div>
  )
}
