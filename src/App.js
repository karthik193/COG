import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import SignUp from './pages/sign-up';
import './App.css';
import './style/common.css'
import Search from "./pages/search";
import Loading from "./components/loading";
import { useEffect } from "react";
import Assign from "./pages/assign";
import Logo from "./components/logo";
import PrivateRoute from "./components/PrivateRoute";
import Requests from "./pages/requests";

function App() {

  useEffect(()=>{
    
  },[]);

  return (
    
    <div className="App" >
      <div>
          {
            window.location.pathname !=="/loading"?
            <div>
              <div className='wave'></div>
                <div className="logoContainer" align="center">
                  <Logo />
                </div>
            </div>:
            null
          }
          <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/search" element={ <PrivateRoute><Search /></PrivateRoute> } />
              <Route exact path="/loading" element={<Loading />} />
              <Route exact path="/request" element={ <PrivateRoute><Assign /></PrivateRoute>} />
              <Route exact path="/myrequests" element={ <PrivateRoute><Requests /></PrivateRoute>} />
          </Routes>
      </div>
      
    </div>
  );
}

export default App;
