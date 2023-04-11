import './App.css';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar';
import { useContext, useEffect, useState } from 'react';
import CategoryContext from './contexts/CategoryContext';
import { CreateAuth } from './contexts/AuthContext';
import LoadContext from './contexts/LoadContext'
import ChildRoutes from './routes';
import LoginPage from './pages/loginPage/login';
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {BarLoader} from 'react-spinners'

function App(){

  const [loading,setLoading] = useState(false);
  const {currentUser,theme} = useContext(CreateAuth)

  function showMessage(){toast.success("Logged In Successfully",{autoClose:1500})}

  useEffect(()=>{
    setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2000)
  },[])


  return (
          <CategoryContext>
            <LoadContext>

              <div className="App" id={theme}>
                { loading ? <BarLoader color='red' width='100vw'/> :
                  !currentUser ? <LoginPage/> :
                  <>
                      {showMessage()}
                      <Header/>
                      <div className = "App_bottom">
                        <Sidebar/>
                        <ChildRoutes/>
                      </div>
                    </>
                }
                <ToastContainer/>
              </div>

              </LoadContext>
          </CategoryContext>
  );
}

export default App;
