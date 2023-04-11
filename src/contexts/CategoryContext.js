import { useState, createContext } from "react";

export const Category = createContext(null)

function CategoryContext(props){

    const [category,setCategory] = useState('Home');
    const [videos,setVideos] = useState( { likedList:[],subscriptionList:[] } )

    return(
        <Category.Provider value={{category,setCategory,videos,setVideos}}>
            {props.children}
        </Category.Provider>
    )
}
export default CategoryContext