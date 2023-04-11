import { Route ,Routes} from "react-router-dom";
import Videos from './components/Videos/Videos'
import Search from "./pages/searchPage/Search";
import Watch from "./pages/watchPage/Watch";
import LikedVideos from "./pages/likedVideos/LikedVideos";
import SubsVideos from "./pages/subscriptions/SubsVideos";

function ChildRoutes(){
    return(
        <Routes>
            <Route exact path="/">
                <Route index element ={<Videos/>} />
                <Route path='Home' element={<Videos/>} />
                <Route path='Music' element={<Videos/>} />
                <Route path='Sports' element={<Videos/>} />
                <Route path='Learning' element={<Videos/> }/>
                <Route path='search/:id' element={<Search/>} />
                <Route path='watch/:id' element={<Watch/>} />
                <Route path='Liked-Videos' element={<LikedVideos/>} />
                <Route path='Subscriptions' element={<SubsVideos/>} />
            </Route>
        </Routes>
    )
}

export default ChildRoutes;
