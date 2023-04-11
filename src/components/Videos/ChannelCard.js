import './ChannelCard.css'

function ChannelCard({Username,ChannelName,ChannelLogo,Subscribers,Description}){
    return(
        <div className='ChannelCard'>
            <img src={ChannelLogo} alt='thumbnail'/>
            <div className='details'>
                <h3>{ChannelName}</h3>
                <p>{Username} • {Subscribers}</p>
                <p>{Description.slice(0,60)}</p>
            </div> 
        </div>
    )
}

export default ChannelCard;