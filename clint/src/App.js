import './App.css';
import Home from './components/Home/Home';
import LoginPage from './components/LoginPage/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import NgoHome from './components/NgoHome/NgoHome';

import CaterningHome from './components/CaterningHome/CaterningHome';
import { useEffect, useState } from 'react';
import Adming from './components/Admin/Adming';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './components/Admin/AdminLogin';



function App() {
  const [ngoAvb, setNgoAvb] = useState()
  const [catAvb, setcatAvb] = useState()
  const [adminAvb, setAdminAvb] = useState()
  const [log, setLog] = useState()

  const ngo = JSON.parse(localStorage.getItem('ngo_id'))
  const caterning = JSON.parse(localStorage.getItem('cat_id'))
  const admin = JSON.parse(localStorage.getItem('admin_id'))

  useEffect(() => {

    setNgoAvb(ngo)
    setcatAvb(caterning)
    setAdminAvb(admin)

  }, [log])

  console.log(admin);


  return (
    <div >
      <BrowserRouter>
        <NavBar
          ngoAvb={ngoAvb}
          setNgoAvb={setNgoAvb}
          catAvb={catAvb}
          setcatAvb={setcatAvb}
          setLog={setLog}
          adminAvb={adminAvb}
          setAdminAvb={setAdminAvb}
          log={log}

        />

        <Routes>

          <Route path='/admin-login' element={<AdminLogin setLog={setLog}
            log={log} />} />
          <Route path='/admin' element={<Adming />} />
          <Route path='/' element={<Home />} />
          <Route
            path="/login"
            element={<LoginPage
              setLog={setLog}
              log={log} />
            }
          />
          <Route path="/ngo-home" element={<NgoHome />} />
          <Route path="/caterning-home" element={<CaterningHome />} />

        </Routes>
        <ToastContainer
          theme='dark'
        />


      </BrowserRouter>



    </div>
  );
}

export default App;
