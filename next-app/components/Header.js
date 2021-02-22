import Link from 'next/Link'
import { useState } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const MenuItem = ({ children, isLast, to = '/' }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
    >
      <Link href={to}>{children}</Link>
    </Text>
  )
}

const Header = (props) => {
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      //color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      <Flex align="center">
        <Box w="200px">
          <Text fontSize="lg" fontWeight="bold">
            GRANDcast.FM
          </Text>
        </Box>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/podcasts">Podcasts</MenuItem>
          <MenuItem to="/playlists">Playlists</MenuItem>
          <MenuItem to="/search" isLast>
            Search
          </MenuItem>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
