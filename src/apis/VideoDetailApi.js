//Get details of a video

import axios from 'axios';

const BASE_URL= 'https://youtube138.p.rapidapi.com/video/details'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
  }
};

export const VideoDetailApi = async (query)=>{
    const {data} = await axios.get(`${BASE_URL}/${query}`, options)
    
    return data;
  }