import axios from 'axios';
import SETTINGS from '../utility/settings';



var userRegion = localStorage.getItem('userRegion');
if(userRegion) {
    if(userRegion === "eune") {
        userRegion = "eu_nordic_and_est";
    }

}


const FETCH_PLAYER = SETTINGS.SERVER_PROXY+"/api/v1/players/search?username=";
const FETCH_TOP_PLAYERS = SETTINGS.SERVER_PROXY+"/api/v1/players/top?region=";
const FETCH_LATEST_PLAYERS = SETTINGS.SERVER_PROXY+"/api/v1/players/latest?region=";
 
const searchPlayer = (username) => {
    return axios.get(FETCH_PLAYER+username+'&region='+userRegion).then(
        (response) => { 
            return response.data;
        })
        .catch(error => {
        });
};

const fetchTopPlayer = () => {
    return axios.get(FETCH_TOP_PLAYERS+userRegion).then(
        (response) => {
            return response.data;
        })
        .catch(error => {
            console.log(error)
        });
};

const fetchLatestPlayers = () => {
    return axios.get(FETCH_LATEST_PLAYERS+userRegion).then(
        (response) => {
            return response.data
        })
        .catch(error=>{
            console.log(error)
        });
}

export default {
    searchPlayer,
    fetchTopPlayer,
    fetchLatestPlayers,
};