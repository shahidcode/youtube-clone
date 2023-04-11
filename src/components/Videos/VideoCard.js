import { Link } from 'react-router-dom';
import './VideoCard.css'
import {abbreviateNumber} from 'js-abbreviation-number'

function VideoCard({Thumbnail,Title,ChannelName,ChannelLogo,Views,Date,ID}){
    return(
        <div className='VideoCard'>
            <Link to={`/watch/${ID}`}>
                <img src={Thumbnail} alt='thumbnail'/>
            </Link>
            <div className='heading'>
                <img alt={ChannelName} src={ChannelLogo}/>
                <div className='subHeading'>
                    <h3>{Title.slice(0,40)}</h3>
                    <h5>{ChannelName}</h5>
                    <p>{abbreviateNumber(Views,0)} • {Date}</p>
                </div>
            </div> 
        </div>
    )
}

export default VideoCard;