import { Flex, Text, Box } from '@chakra-ui/react'
import { useState } from 'react'
import Link from 'next/Link'

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

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

const Header = () => {
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <Flex
      mb={8}
      p={8}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
    >
      <Box w="200px">
        <Text fontSize="lg" fontWeight="bold">
          GRANDcast.FM
        </Text>
      </Box>

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
          <MenuItem to="/search">Search</MenuItem>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
