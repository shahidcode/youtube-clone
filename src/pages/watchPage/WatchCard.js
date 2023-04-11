import './WatchCard.css'
import { Link } from 'react-router-dom';
import {abbreviateNumber} from 'js-abbreviation-number'

function WatchCard({Thumbnail,Title,ChannelName,ChannelLogo,Views=10,Date='12-1',ID}){
    return(
        <Link to={`/watch/${ID}`}>
            <div className='WatchCard'>
                <img src={Thumbnail} alt='thumbnail'/>
                <div className='heading'>
                    <h3>{Title.slice(0,50)}</h3>
                    <p>{abbreviateNumber(Views,0)} • {Date}</p>
                    <div className='subHeading'>
                        <img alt={ChannelName} src={ChannelLogo}/>
                        <h5>{ChannelName}</h5>
                    </div>
                </div> 
            </div>
        </Link>
    )
}

export default WatchCard;