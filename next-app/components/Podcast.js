import {
  Button,
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Tag,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { gql, useMutation } from '@apollo/client'

const PODCAST_SUBSCRIBE = gql`
  mutation podcastSubscribe($itunesID: String!) {
    subscribeToPodcast(itunesId: $itunesID) {
      title
      itunesId
    }
  }
`

const Podcast = ({ podcast }) => {
  const { title, itunesId, description, artwork, categories } = podcast
  const [subscribeMutation, { data }] = useMutation(PODCAST_SUBSCRIBE)

  return (
    <Flex rounded="lg" borderWidth="2px" m={4} style={{ maxWidth: '700px' }}>
      <Box width="200px">
        <Image src={artwork} boxSize="200px" />
        <Button
          width="100%"
          onClick={() =>
            subscribeMutation({ variables: { itunesID: itunesId } })
          }
        >
          <AddIcon />
        </Button>
      </Box>

      <Box m={4} maxWidth="300px">
        <Heading noOfLines={2}>{title}</Heading>
        <Text noOfLines={3}>{description}</Text>

        <Stack isInline>
          {categories.slice(0, 3).map((c) => {
            return <Tag>{c}</Tag>
          })}
        </Stack>
      </Box>
    </Flex>
  )
}

export default Podcast
