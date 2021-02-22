import { useState } from 'react'
import { useAuth } from '../lib/auth.js'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Input,
} from '@chakra-ui/react'
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
      <FormControl b={'1px'} id="signin">
        <FormLabel m={4}>Sign In</FormLabel>
        <Input
          m={4}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Input
          m={4}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button w={'100%'} m={4} type="submit" onClick={onSubmit}>
          Log In
        </Button>
      </FormControl>
    </div>
  )
}

export default SignIn
