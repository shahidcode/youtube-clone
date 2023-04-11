import { createContext, useState, useEffect } from "react";
import {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,
    signInWithPopup,signOut,provider,onAuthStateChanged,getDocs,setDoc,
    doc,db
} from '../firebase'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { collection, query, where } from "firebase/firestore";

const CreateAuth = createContext(null)

export{
    CreateAuth
}

function AuthContext( {children} ){

    const [isLogin,setIsLogin] = useState(false)
    const [currentUser,setCurrentUser] = useState('');

    useEffect(()=>{
        onAuthStateChanged(auth,(userDetails)=>{
            setCurrentUser(userDetails)
        })
        
    },[])

    //create structure of db when user sign-up
    async function addSubCol(userEmail,userId){       //userId is uid
        await setDoc(doc(db,`users/${userEmail}`),        //colls/doc/colls/doc...
            {
                likedVideos: {},
                subsVideos: {},
                uid: userId
            },
            {merge:true}
        )}

    //sign-up
    async function signUp(email,password){
        await createUserWithEmailAndPassword(auth,email,password)
        .then(user => {
            // toast.success('Account Created Successfully',{autoClose:2000})
            addSubCol(user.user.email,user.user.uid)
        })
        .catch(err => {
            toast.error('User Already Exists',{autoClose:2000})
        })    
    }

    //sign-in
    async function signIn(email,password){
        await signInWithEmailAndPassword(auth,email,password)
        .then(user => {
            // console.log('User Details',user)
            // toast.success("Logged In Successfully",{autoClose:2000})
        })
        .catch(err => {
            toast.error('Invalid User Credentials',{autoClose:2000})
        })
    }

    //sign-up google
    async function GoogleSignIn(){
        await signInWithPopup(auth,provider)
        .then( data => {
            // toast.success("Logged In Successfully",{autoClose:2000})
        })
        .catch(err=> {
            toast.error('Invalid User Credentials',{autoClose:2000})
        })
    }

    //sign-out
    async function signOutUser(){
        await signOut(auth)
        .then((data)=>{
            toast.success('Logged Out Successfully',{autoClose:2000})
        })
    }

    //display database
    const q = query(collection(db,'users'),where('uid','==',`${currentUser?.uid}`))    //query to fetch only current user's data
    
    async function showDocuments(){
        const listOfDocuments = [];
        await getDocs(q)   
        .then( (snapshot)=>{
            snapshot.docs.forEach( (doc)=>{
                listOfDocuments.push(doc.data())
            } )
        } )
        return listOfDocuments
    }
    // showDocuments()  

    //add docs
    async function addDocuments(data,videoId,type){
        if(type === 'like'){
            await setDoc(doc(db,`users/${currentUser.email}`),        //colls/doc/colls/doc...
                {
                    likedVideos: { [videoId]: data },    //key is dynamic
                },
            {merge:true}
            )
        }
        else{
            await setDoc(doc(db,`users/${currentUser.email}`),
                {
                    subsVideos: { [videoId]: data },
                },
            {merge:true}
            )
        }
    }

    const [theme,setTheme] = useState('Light')

    const value={
        isLogin,
        setIsLogin,
        signUp,
        signIn,
        GoogleSignIn,
        currentUser,
        signOutUser,
        showDocuments,
        addDocuments,
        theme,
        setTheme
    }

    return(
        <CreateAuth.Provider value={value}>
            {children}      
        </CreateAuth.Provider>
    )
}

export default AuthContext