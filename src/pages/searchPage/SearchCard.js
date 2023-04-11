import './SearchCard.css'
import { Link } from 'react-router-dom';
import {abbreviateNumber} from 'js-abbreviation-number'
function SearchCard({Thumbnail,Title='How to',ChannelName='channel',ChannelLogo,Views=10,Date='12-1',Description,ID}){
    return(
        <div className='SearchCard'>
            <Link to={`/watch/${ID}`}>
                <img src={Thumbnail} alt='thumbnail'/>
            </Link>
            <div className='heading'>
                <h3>{Title.slice(0,40)}</h3>
                <p>{abbreviateNumber(Views,0)} • {Date}</p>
                <div className='subHeading'>
                    <img alt={ChannelName} src={ChannelLogo}/>
                    <h5>{ChannelName}</h5>
                </div>
                <p>{Description}</p>
            </div> 
        </div>
    )
}

export default SearchCard;