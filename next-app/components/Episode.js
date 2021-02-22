import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

import { AddIcon, CheckIcon } from '@chakra-ui/icons'

import { gql, useMutation } from '@apollo/client'

const ADD_EPISODE_TO_PLAYLIST = gql`
  mutation addToPlaylist($episodeId: ID!, $playlistName: String!) {
    addEpisodeToPlaylist(name: $playlistName, podcastId: $episodeId) {
      name
    }
  }
`

const Episode = ({ episode, playlists }) => {
  console.log(playlists)
  const [addEpisode] = useMutation(ADD_EPISODE_TO_PLAYLIST)

  const isEpisodeInPlaylist = (playlistName) => {
    //return true

    const playlist = playlists.filter((i) => {
      return playlistName === i.name
    })

    console.log(playlist)

    const episodes = playlist[0].episodes?.map((v) => {
      console.log(v)
      return v.id
    })

    console.log(episodes)

    return episodes?.includes(episode.id)

    // playlists = [{name: "Foobar", episodes: [{id: 123}]}]
  }

  return (
    <Flex
      style={{ maxWidth: '700px', width: '100%' }}
      border="1px"
      rounded="lg"
    >
      <Box style={{ width: '125px' }}>
        <Image boxSize="125px" src={episode.podcast.image} m={2} />
        <Menu m={2} style={{ width: '125px' }}>
          <MenuButton m={2} style={{ width: '125px' }} as={Button}>
            <AddIcon />
          </MenuButton>
          <MenuList>
            {playlists?.map((v) => {
              return (
                <MenuItem
                  icon={isEpisodeInPlaylist(v.name) ? <CheckIcon /> : null}
                  key={v.name}
                  onClick={() => {
                    addEpisode({
                      variables: {
                        episodeId: episode.id,
                        playlistName: v.name,
                      },
                      // update: (proxy) => {
                      //   const data = proxy.readQuery({
                      //     query: gql`
                      //       {
                      //         playlists {
                      //           name
                      //           episodes {
                      //             id
                      //           }
                      //         }
                      //       }
                      //     `,
                      //   })
                      //   console.log('optmistic data')
                      //   console.log(data)

                      //   const newData = { playlists: [...data.playlists] }

                      //   newData.playlists[0].episodes = [
                      //     ...newData.playlists[0].episodes,
                      //     {
                      //       __typename: 'Episode',
                      //       id: episode.Id,
                      //     },
                      //   ]

                      //   proxy.writeQuery({
                      //     query: gql`
                      //       {
                      //         playlists {
                      //           name
                      //           episodes {
                      //             id
                      //           }
                      //         }
                      //       }
                      //     `,
                      //     data: newData,
                      //   })
                      // },
                    })
                  }}
                >
                  {v.name}
                </MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      </Box>
      <Flex ml={4} direction="column" style={{ width: '100%' }}>
        <div>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading size="sm">{episode.title}</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} m={4}>
                <div
                  dangerouslySetInnerHTML={{ __html: episode.summary }}
                ></div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <Flex direction="column">
          <Text fontSize="lg" mr={4} isTruncated>
            {episode.podcast?.title}
          </Text>
          <Spacer />
          <Text mr={4} as="i">
            {`${episode.pubDate.month}/${episode.pubDate.day}/${episode.pubDate.year}`}
          </Text>
        </Flex>
        <div
          style={{
            marginRight: '4px',
            marginBottom: '4px',
            marginTop: 'auto',
          }}
        >
          <audio style={{ width: '100%' }} controls>
            <source src={episode.audio} type="audio/mpeg"></source>
          </audio>
        </div>
      </Flex>
    </Flex>
  )
}

export default Episode
