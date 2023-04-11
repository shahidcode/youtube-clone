import './LikedVideos.css'
import { useContext, useEffect, useState } from 'react';
import SearchCard from '../searchPage/SearchCard'
import { CreateAuth } from '../../contexts/AuthContext';
import {SyncLoader} from 'react-spinners'
import {Loader} from '../../contexts/LoadContext'
function LikedVideos(){

    const {showDocuments} = useContext(CreateAuth)
    const [data,setData] = useState([])
    const {loading,setLoading} = useContext(Loader)

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            const results = showDocuments()
            results.then( (contents) => {
                setData(contents[0].likedVideos)
                setLoading(false)
            })
        }, 2000);
    },[])

    return(
        <div className="liked_section">
            <h1>Liked Videos</h1>
            <div className='likedVideos'>
                {    loading ? <SyncLoader color='red' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/> : 
                    data.length!==0 &&
                    Object.keys(data).map( (item,index)=>(
                        <SearchCard key={index}
                                    Thumbnail={data[item]?.Thumbnail}
                                    Title={data[item]?.Title}
                                    ChannelName={data[item]?.ChannelName}
                                    ChannelLogo={data[item]?.ChannelLogo}
                                    Views={data[item]?.Views}
                                    Date={data[item]?.Date}
                                    Description={data[item]?.Description.slice(0,60)}
                                    ID={data[item]?.ID}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default LikedVideos;