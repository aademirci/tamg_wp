import { Fragment } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Anecdotes from './page/Anecdotes'
import SingleAnecdote from './page/SingleAnecdote'
import Homepage from './page/Homepage'
import NavBar from './component/NavBar'
import Band from './page/Band'
import 'normalize.css'
import './style.scss'
import Person from './page/Person'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route element={
        <Fragment>
          <NavBar />
          <Outlet />
        </Fragment>
      }>
        <Route path='/olay' element={<Anecdotes />} />
        <Route path='/olay/:slug' element={<SingleAnecdote />} />
        <Route path='/grup/:slug' element={<Band />} />
        <Route path='/kisi/:slug' element={<Person />} />
      </Route>
    </Routes>
  )
}

export default App
