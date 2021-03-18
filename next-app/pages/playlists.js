import SignIn from '../components/SignIn'
import Episode from '../components/Episode'
import { useAuth } from '../lib/auth'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  Container,
  FormControl,
  Select,
  Button,
  Flex,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'

const GET_PLAYLISTS = gql`
  {
    playlists {
      name
      episodes {
        title
        id
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

const CREATE_PLAYLIST = gql`
  mutation createNewPlaylist($playlistName: String!) {
    createPlaylist(name: $playlistName) {
      name
    }
  }
`

export default function Playlists() {
  const { isSignedIn } = useAuth()
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const [newPlaylist, setNewPlaylist] = useState('')
  const { data } = useQuery(GET_PLAYLISTS)
  const [createPlaylist] = useMutation(CREATE_PLAYLIST)

  const filteredPlaylist = data?.playlists?.filter((p) => {
    return p.name === selectedPlaylist
  })[0]

  return (
    <Container>
      {!isSignedIn() && <SignIn />}
      {isSignedIn() && (
        <div>
          <FormControl id="playlists">
            <Flex>
              <Select
                placeholder="Select playlist"
                onChange={(e) => setSelectedPlaylist(e.target.value)}
              >
                {data?.playlists?.map((p) => {
                  return (
                    <option key={p.name} value={p.value}>
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
          </FormControl>
          <VStack mt={4} spacing={4}>
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
