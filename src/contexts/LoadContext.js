import { useState, createContext } from "react";

export const Loader = createContext(null)

function LoadContext(props){

    const [loading,setLoading] = useState(false)

    return(
        <Loader.Provider value={{loading,setLoading}}>
            {props.children}
        </Loader.Provider>
    )
}
export default LoadContext