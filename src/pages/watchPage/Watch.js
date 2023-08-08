import './Watch.css'
import { useEffect,useState,useRef,useContext } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Subscriptions,ThumbUpOffAlt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import WatchCard from '../watchPage/WatchCard'
import {VideoRelated} from '../../apis/VideoRelated'
import { VideoDetailApi } from '../../apis/VideoDetailApi'
import { CreateAuth } from '../../contexts/AuthContext'

function Watch(){

    const {addDocuments} = useContext(CreateAuth);

    const {id} = useParams();
    var [temp,setTemp] = useState([])   //stores details of current video
    const likeRef = useRef()    //changes color of like-btn
    const subRef = useRef()
    const [watch,setWatch] = useState([]);  //stores details of relatedVideo
    const [isLiked,setIsLiked] = useState(false);
    const [isSub,setSub] = useState(false)

    useEffect( ()=>{
        fetchVideoDetails()
        fetchRelatedDetails()
        setIsLiked(false)
        setSub(false)
        likeRef.current.style.color = 'black'
        subRef.current.style.color = 'black'
    } ,[id])

    const fetchVideoDetails = ()=> VideoDetailApi(`?id=${id}`).then( (data)=> setTemp(data))
    const fetchRelatedDetails = ()=> VideoRelated(`?id=${id}`).then( (res)=> setWatch(res.contents) )

    function handleLike(){
        if(!isLiked){  
            setIsLiked(!isLiked)
            likeRef.current.style.color = 'red';
            addDocuments(
                    {
                        Thumbnail : temp?.thumbnails[0]?.url,
                        Title : temp?.title,
                        ChannelName : temp?.author?.title,
                        ChannelLogo : temp?.author?.avatar[0]?.url,
                        Views : temp?.stats?.views,
                        Date : temp?.publishedDate,
                        Description : temp?.description?.slice(0,200),
                        ID : temp?.videoId                   
                },temp?.videoId,'like')
        }
        else{
            setIsLiked(!isLiked)
            likeRef.current.style.color = 'black';
        }

    }

    //subscribe functionality
    function handleSub(){
        if(!isSub){  
            setSub(!isSub)
            subRef.current.style.color = 'red';
            addDocuments(
                {
                    ChannelLogo : temp?.author?.avatar[0]?.url,
                    ChannelName : temp?.author?.title,
                    Username : temp?.author?.canonicalBaseUrl,
                    Subscribers : temp?.author?.stats?.subscribersText,
                    Description : temp?.description,
                    ID : temp?.author?.channelId       
            },temp?.author.channelId,'sub')
            }
        else{
            setSub(!isSub)
            subRef.current.style.color = 'black';
         }
         
    }


    return(
        <div className='watch_section'>
            <div className='player'>
                <div className='reactPlayer'>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='reactPlayer' controls/>
                
                <h3>{temp.title}</h3>
                <div className='playerDetails'>
                    <Avatar src={temp.author?.avatar[0]?.url} alt='img'/>
                    <div className='channelDetails'>
                        <h4 style={{fontWeight:'500'}}>{temp.author?.title}</h4>
                        <p>{temp.author?.stats?.subscribersText}</p>
                    </div>

                    <button onClick={()=>handleSub()} ref={subRef}><Subscriptions/></button>
                    <button onClick={()=>handleLike()} ref={likeRef}><ThumbUpOffAlt/></button>

                </div>
                
                <p>{temp.description?.slice(0,250)}</p>
            </div>
            </div>
            <div className='suggested_videos'>
                {watch.map( (item,index)=>(
                    item.type === 'video' &&
                    <WatchCard Thumbnail={item?.video?.thumbnails[0].url} 
                        Title={item?.video?.title}
                        ChannelName={item?.video?.author.title}
                        ChannelLogo={item?.video?.author.avatar[0].url} 
                        Views={item?.video?.stats.views}
                        Date={item?.video?.publishedTimeText}
                        ID={item?.video?.videoId}
                        key={index} />
                ) )}
            </div>
        </div>
    )
}

export default Watch
