import './Videos.css'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
import { useState,useEffect, useContext } from 'react'
import {VideoApi} from '../../apis/VideoApi'
import { Category } from '../../contexts/CategoryContext'
import music from '../../assets/music.jpg'
import learning from '../../assets/learning.jpg'
import sports from '../../assets/sports.jpg'
import {Loader} from '../../contexts/LoadContext'
import {SyncLoader} from 'react-spinners'

function Videos(){  

    const [videoList, setVideoList] = useState([]);
    const {category} = useContext(Category)
    const {loading,setLoading} = useContext(Loader)

    var src='';
    switch(category){
        case 'Sports': src=sports
                        break;
        case 'Music': src=music
                        break;
        case 'Learning': src=learning
                        break;
        default : break
    }

    useEffect( ()=>{
        setLoading(true)
        setTimeout(()=>{
            VideoApi(`search/?q=${category}`).then( (data)=> setVideoList( data.contents )  )    //contents coming from api
            setLoading(false)
        },2000)
    } , [category])

    return (
        <>
        {
            loading ? <SyncLoader color='red' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/> :
        
        <div className="videos_section">
            {src !== '' &&
                <div className='placeImg'>
                    <img src={src} alt='img'/>
                </div>
            }
              <div className='recommendVideos'>
                {
                    videoList.map( (item,index)=>
                    item.type === 'video' ?
                        <VideoCard Thumbnail={item?.video?.thumbnails[0].url}
                            Title={item?.video?.title}
                            ChannelName={item?.video?.author?.title}
                            ChannelLogo={item?.video?.author?.avatar[0]?.url}
                            Views={item?.video?.stats?.views}
                            Date={item?.video?.publishedTimeText}
                            ID={item?.video?.videoId}
                            key={index}
                        />
                        : item.type === 'channel' &&
                        <ChannelCard ChannelLogo={item?.channel?.avatar[1]?.url}
                            ChannelName={item?.channel?.title}
                            Username={item?.channel?.username}
                            Subscribers={item?.channel?.stats?.subscribersText}
                            Description={item?.channel?.descriptionSnippet}
                            ID={item?.channel?.channelId}
                            key={index}
                        />
                    )
                }
              </div>
        </div>
    }
    </>
    )
}
export default Videos