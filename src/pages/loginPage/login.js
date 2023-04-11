import React, { useRef ,useContext, useState} from 'react'
import './login.css'
import { CreateAuth } from '../../contexts/AuthContext'
import { DarkMode, Google, LightMode } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import Switch from "react-switch";
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {

    const emailRef = useRef()
    const passRef = useRef()
    const ConfirmPassRef = useRef()
    const [checked, setChecked] = useState(false);

    const {signUp,signIn,GoogleSignIn,theme,setTheme} = useContext(CreateAuth)

    const signupDiv = document.getElementsByName('signup')
    const btn1 = document.getElementsByClassName('signinBtn');
    const btn2 = document.getElementsByClassName('signupBtn');

    function handleForm(e){
      e.preventDefault()

      if ( btn1[0].hidden ) {   // in sign-up page
        ConfirmPassRef.current.value !== passRef.current.value ? toast.error("Passwords Doesn't matched",{autoClose:2000}) :
        passRef.current.value.length < 6 ? toast.error("Password should be 6 characters or more",{autoClose:2000}) :
        signUp( emailRef.current.value, passRef.current.value )
      }  
      else {
        signIn( emailRef.current.value, passRef.current.value )
      }
    }

    function handleClick(e){
      if (e.currentTarget.id === 'div2' ){
        
        signupDiv[0].hidden = false
        btn1[0].hidden = true
        btn2[0].hidden = false

        e.currentTarget.classList.remove('styleDiv2')
        e.currentTarget.classList.add('styleDiv1')  //add box shadow to div2
        e.currentTarget.style.borderRadius = '0 18px 0 0';

        e.currentTarget.previousSibling.classList.remove('styleDiv1') //remove box shadow from div1
        e.currentTarget.previousSibling.classList.add('styleDiv2')

      }
      else{

        btn1[0].hidden = false
        btn2[0].hidden = true
        signupDiv[0].hidden = true

        e.currentTarget.classList.remove('styleDiv2')
        e.currentTarget.classList.add('styleDiv1')
        
        e.currentTarget.nextSibling.classList.remove('styleDiv1')
        e.currentTarget.nextSibling.classList.add('styleDiv2')

      }
    }

  return (
    <div className='loginPage'>
     
      <div className='themeToggle'><Switch checked={checked} 
                                           onChange={ ()=>{
                                                           setChecked(!checked); 
                                                           setTheme(checked ? 'Light' : 'Dark')
                                                    }}
                                           onColor="#1c1c1c"
                                           offColor='#1c1c1c'
                                           uncheckedIcon={<DarkMode/>}
                                           checkedIcon={<LightMode/>}
                                           />
      </div>
 
        <form onSubmit={(e)=>handleForm(e)}>

            <div className='options'>

              <div id='div1' className='styleDiv1' onClick={(e)=>handleClick(e)}>
                <h1>Sign In</h1>
              </div>
              <div id='div2' className='styleDiv2' onClick={(e)=>handleClick(e)}> 
                <h1>Sign Up</h1>
              </div>
              
            </div>

            <div className='elements'>
              <label>Email:</label>
              <input type='email' ref={emailRef} required/>
              <label>Password:</label>
              <input type='password' ref={passRef} required/>

              <div hidden name='signup'>
                <label>Confirm Password:</label>
                <input type='password' ref={ConfirmPassRef}/>
              </div>
              
              <button className='signinBtn'>Sign In</button>
              <button className='signupBtn' hidden>Sign Up</button>

              <div className='signinGoogle' onClick={()=>GoogleSignIn()}>
                <Tooltip title='Sign-in with Google'><Google/></Tooltip>
              </div>

            </div>

        </form>
        <ToastContainer/>
    </div>
  )
}

export default LoginPage