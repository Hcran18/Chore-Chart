import { useState } from 'react'

import { Cache } from './cache.js'
import { User } from './user.js'
import { Register } from './Register.js'

import './App.css'

function App() {
  const [username, setUsername] = useState('')

  async function handleSignUp(e) {
    e.preventDefault()

    const cache = Cache.getInstance()
    const id = Math.floor(Math.random() * 1000)
    const user = new User(id, username, 0)

    cache.setUser(user)

    const service = new Register(cache)

    try {
      console.log(await service.signUp())
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h1>Todo Game</h1>
        <h3>Sign up</h3>
        <form>
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSignUp} >Sign up</button>
        </form>
      </div>
    </>
  )
}

export default App
