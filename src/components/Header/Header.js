import React, { useContext, useState } from "react"
import { Link } from "react-router-dom";
import {Search,YouTube, LightMode, Person, DarkMode} from '@mui/icons-material';
import { Tooltip } from '@mui/material'
import './Header.css'
import {CreateAuth} from '../../contexts/AuthContext'

function Header( ) {
    const [search,setSearchUrl] = useState('')
    const {signOutUser,theme,setTheme,currentUser} = useContext(CreateAuth)

    return (
        <div className="header">
            <div className="leftChild">
                    <a href="/"><YouTube/></a>
                    <h3>YouTube</h3>
            </div>
            <div className="searchDiv">
                    <input type='text' onChange={ (e)=>setSearchUrl(e.target.value) } placeholder="Search"/>

                    <Link to={`search/${search}`}>
                        <Search className="searchIcon" />
                    </Link>
            </div>
            <div className="rightChild">
                <div className="themeBtn" onClick={ ()=>setTheme(theme === 'Light' ? 'Dark' : 'Light') }>
                    {theme === 'Light' ? <LightMode/> : <DarkMode/>}
                </div>

                <div className="userProfile" onClick={()=>signOutUser()}>
                    <Tooltip title='Logout'><Person/></Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Header