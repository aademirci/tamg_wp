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
import Medium from './page/Medium'
import City from './page/City'
import Search from './page/Search'
import NotFound from './component/NotFound'
import Page from './page/Page'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/:slug' element={<Page />} />
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
        <Route path='/ortam/:slug' element={<Medium />} />
        <Route path='/sehir/:slug' element={<City />} />
        <Route path='/search/:search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
