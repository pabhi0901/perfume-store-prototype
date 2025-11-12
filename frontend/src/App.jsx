import React from 'react'
import NavBar from './components/NavBar';
import MainRoute from './MainRoute';

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <main style={{ paddingTop: '80px' }}>
        <MainRoute />
      </main>
    </div>
  )
}

export default App
