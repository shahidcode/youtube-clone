import './Sidebar.css'
import SidebarRow from './SidebarRow';
import { categories } from '../../utils/categories';
import React,{useContext} from 'react';
import { Category } from '../../contexts/CategoryContext';

function Sidebar(){
    const {category, setCategory} = useContext(Category)

    return (
        <div className='main'>
            <div className='Sidebar'>
                {categories.map( (item,index) =>
                    <React.Fragment key={index}>    {/* for assigning key I took react.fragment which won't add extra div*/}
                            <SidebarRow Icon={item[1]}  Title={item[0]} category={category} setCategory={setCategory} />
                                {
                                index===2 && 
                                <>
                                    <hr></hr>
                                    <h3>Explore</h3>
                                </>
                                }
                    </React.Fragment>
                )}

                <hr></hr>
            </div>
        </div>
    )
}

export default Sidebar;