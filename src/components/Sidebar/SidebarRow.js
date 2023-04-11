import './SidebarRow.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CreateAuth } from '../../contexts/AuthContext';

function SidebarRow( {Icon, Title, category, setCategory} ){

    const {theme} = useContext(CreateAuth)
    
    return(
        <Link to= {Title} >
                <div className="SidebarRows" onClick={ ()=> setCategory( Title ) }
                    style={{
                        color : category === Title  && theme==='Light' && 'red',
                    }}
                >
                    {/* icon is prop as a component */}
                    <Icon className='styleIcon'     
                        style={{
                            color : category === Title  && 'red'
                        }}
                    />   
                    <h2>{Title}</h2>
            </div>
        </Link>
    )
}

export default SidebarRow;
