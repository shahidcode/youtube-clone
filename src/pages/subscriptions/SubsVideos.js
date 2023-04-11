import './SubsVideos.css'
import { useContext, useEffect, useState } from 'react';
import ChannelCard from '../../components/Videos/ChannelCard';
import { CreateAuth } from '../../contexts/AuthContext';
import {SyncLoader} from 'react-spinners'
import { Loader } from '../../contexts/LoadContext';

function SubsVideos(){

    const {showDocuments} = useContext(CreateAuth)
    const [data,setData] = useState([])
    const {loading,setLoading} = useContext(Loader)

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            const results = showDocuments()
            results.then( (contents) => {
                setData(contents[0].subsVideos)
                setLoading(false)
            })
        }, 2000);
    },[])

    return(
        <div className="subs_section">
                <h1>Subscribed Videos</h1>
            <div className='subsVideos'>
                {    loading ? <SyncLoader color='red' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/> : 
                    data.length!==0 &&
                    Object.keys(data).map( (item,index)=>(
                        <ChannelCard key={index}
                                    ChannelLogo={data[item]?.ChannelLogo}
                                    ChannelName={data[item]?.ChannelName}
                                    Username={data[item]?.Username}
                                    Subscribers={data[item]?.Subscribers}
                                    Description={data[item]?.Description}
                                    ID={data[item]?.ID}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SubsVideos;