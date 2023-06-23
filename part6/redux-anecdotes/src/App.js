import React from 'react'
import List from './components/List'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <List />
      <Form />
    </div>
  )
}

export default App