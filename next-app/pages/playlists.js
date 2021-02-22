import { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Episode from '../components/Episode'
import SignIn from '../components/SignIn'
import { useAuth } from '../lib/auth'
import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Container,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Flex,
  Input,
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'

const CREATE_PLAYLIST = gql`
  mutation createNewPlaylist($playlistName: String!) {
    createPlaylist(name: $playlistName) {
      name
    }
  }
`

const GET_PLAYLISTS = gql`
  {
    playlists {
      name
      episodes {
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
  }
`

export default function Playlists() {
  const [createPlaylist] = useMutation(CREATE_PLAYLIST)
  const [newPlaylist, setNewPlaylist] = useState('')
  const { data } = useQuery(GET_PLAYLISTS)

  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const isPopoverOpen = useState(false)

  const { isSignedIn } = useAuth()

  // show signin form if not authenticated
  // create new playlist
  // dropdown to select playlist
  // show episodes for each playlist when selected

  const filteredPlaylist = data?.playlists.filter((p) => {
    return p.name === selectedPlaylist
  })[0]

  return (
    <Container>
      {!isSignedIn() && <SignIn />}
      {isSignedIn() && (
        <div>
          <FormControl id="playlists">
            <FormLabel>Playlists</FormLabel>
            <Flex>
              <Select
                placeholder="Select playlist"
                onChange={(e) => setSelectedPlaylist(e.target.value)}
              >
                {data?.playlists?.map((p) => {
                  return (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  )
                })}
              </Select>
              <Popover>
                <PopoverTrigger>
                  <Button ml={4}>
                    <AddIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Create new playlist</PopoverHeader>
                  <PopoverBody>
                    <FormControl id="newplaylist">
                      <FormLabel>New playlist</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setNewPlaylist(e.target.value)}
                      />
                      <Button
                        mt={4}
                        onClick={() =>
                          createPlaylist({
                            variables: { playlistName: newPlaylist },
                            update: (proxy) => {
                              const data = proxy.readQuery({
                                query: GET_PLAYLISTS,
                              })
                              proxy.writeQuery({
                                query: GET_PLAYLISTS,
                                data: {
                                  playlists: [
                                    ...data.playlists,
                                    {
                                      __typename: 'Playlist',
                                      name: newPlaylist,
                                    },
                                  ],
                                },
                              })
                            },
                          })
                        }
                      >
                        Create
                      </Button>
                    </FormControl>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <FormHelperText>Foobar</FormHelperText>
          </FormControl>
          <VStack spacing={4}>
            {filteredPlaylist?.episodes?.map((e) => {
              return (
                <Episode key={e.id} episode={e} playlists={data.playlists} />
              )
            })}
          </VStack>
        </div>
      )}
    </Container>
  )
}
