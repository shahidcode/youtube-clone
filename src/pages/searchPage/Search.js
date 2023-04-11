import './Search.css'
import { useParams } from 'react-router-dom'
import {useEffect,useState, useContext} from 'react'
import LocalApi from '../../apis/LocalApi'
import {VideoApi} from '../../apis/VideoApi'
import SearchCard from './SearchCard'
import ChannelCard from '../../components/Videos/ChannelCard'
import { Loader } from '../../contexts/LoadContext'
import { SyncLoader } from 'react-spinners'

function Search(){

    const {id} = useParams()
    const [searchResults,setSearchResults] = useState([]);
    const {loading,setLoading} = useContext(Loader);

    useEffect( ()=>{
        setLoading(true)
        setTimeout(()=>{
            VideoApi(`search/?q=${id}`).then( (res) => setSearchResults(res.contents) )
            setLoading(false)
        },2000)

    } ,[id])

    return(
        <div className='search_section'>
            {
            <div className='search_videos'>
                { loading ? <SyncLoader color='red' style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}/> :
                    searchResults.map( (item,index)=>
                    item.type === 'video' ?
                        <SearchCard Thumbnail={item.video.thumbnails[0].url}
                            Title={item.video.title}
                            ChannelName={item.video.author.title}
                            ChannelLogo={item.video.author.avatar[0].url}
                            Views={item.video.stats.views}
                            Date={item.video.publishedTimeText}
                            Description={item.video.description?.slice(0,60)}
                            ID={item.video.videoId}
                            key={index}
                        />
                        : item.type === 'channel' &&
                        <ChannelCard ChannelLogo={item.channel.avatar[1].url}
                            ChannelName={item.channel.title}
                            Username={item.channel.username}
                            Subscribers={item.channel.stats.subscribersText}
                            Description={item.channel.descriptionSnippet?.slice(0,60)}
                            ID={item.channel.channelId}
                            key={index}
                        />
                    )
                }
            </div>
            }
        </div>
    )
}

export default Search