import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import SignUp from './pages/sign-up';
import './App.css';
import Search from "./pages/search";
import Loading from "./components/loading";
import { useEffect } from "react";
import Assign from "./pages/assign";

function App() {

  useEffect(()=>{
    
  },[]);
  return (
    
    <div className="App" >
      {window.location.pathname !=="/loading"?
      <div>
      <div className='wave'></div>
      <div className="logoContainer" align="center">
        <div  className="logo">
            <div className="charge"><div className="inside"></div></div>
        </div>
      </div>
    </div>:
    null}
      
      <div>
        <Router>
          <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/login" element={<SignUp />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/loading" element={<Loading />} />
              <Route exact path="/assign" element={<Assign />} />
          </Routes>
        </Router>
      </div>
      
    </div>
  );
}

export default App;
