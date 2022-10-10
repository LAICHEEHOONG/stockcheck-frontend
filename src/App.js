import React, { useContext} from 'react';
import { MyContext } from './context';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Auth from './components/auth';
import Modal from './components/modal';
import Input from './components/input';
import List from './components/list';
import Upload from './components/upload';
import History from './components/history';
import Admin from './components/admin';
import Navbar from './components/navbar';
import './css/app.css';


const App = () => {








  return (
    <BrowserRouter>




      <Modal />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/input' element={<Input />} />
        <Route path='/list' element={<List />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/history' element={<History />} />
        <Route path='/admin' element={<Admin />} />
        <Route
          path="*"
          element={
            <main>
              <Navbar />
              <h1 className='pt-5 mt-5'>There's nothing here!</h1>
            </main>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App;