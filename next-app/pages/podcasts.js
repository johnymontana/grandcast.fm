import { useLazyQuery, gql } from '@apollo/client'
import { useState } from 'react'
import { useAuth } from '../lib/auth'
import SignIn from '../components/SignIn'
import Podcast from '../components/Podcast'

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Flex,
  VStack,
} from '@chakra-ui/react'

const PodcastSearchQuery = gql`
  query podcastSearch($searchTerm: String!) {
    podcastSearch(searchTerm: $searchTerm) {
      itunesId
      title
      description
      feedURL
      artwork
      categories
    }
  }
`

const Podcasts = () => {
  const [getPodcasts, { data }] = useLazyQuery(PodcastSearchQuery)
  const { isSignedIn } = useAuth()
  const [searchString, setSearchString] = useState('')
  return (
    <Container>
      {!isSignedIn() && <SignIn />}
      {isSignedIn() && (
        <div>
          <FormControl id="podcastsearch">
            <FormLabel>Search podcasts</FormLabel>
            <Flex>
              <Input onChange={(e) => setSearchString(e.target.value)} />
              <Button
                ml={4}
                onClick={() =>
                  getPodcasts({ variables: { searchTerm: searchString } })
                }
              >
                Search
              </Button>
            </Flex>
          </FormControl>
          <VStack>
            {data?.podcastSearch.map((p) => {
              return <Podcast podcast={p} />
            })}
          </VStack>
        </div>
      )}
    </Container>
  )
}

export default Podcasts
