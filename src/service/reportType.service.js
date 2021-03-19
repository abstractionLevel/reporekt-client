import SETTINGS from '../utility/settings';
import axios from "axios";

let userRegion = localStorage.getItem("userRegion");
if(userRegion) {
    if(userRegion === "eune") {
        userRegion = "eu_nordic_and_est";
    }

}


const FETCH_REPORT_TYPES_OF_PLAYER = SETTINGS.SERVER_PROXY+"/api/v1/players/reportsType?username=";
const FETCH_ALL_REPORTS_TYPE =  SETTINGS.SERVER_PROXY+"/api/v1/reportTypeRegion/all?region=";

const fetchReportsTypeByPlayerNickname = (nickname) => {
    return axios.get(FETCH_REPORT_TYPES_OF_PLAYER+nickname+'&region='+userRegion).then(
        (response) => {
            return response.data;
        })
        .catch(error => {
            console.log(error)
        });
};

const fetchAllReportsType = () => {
    return axios.get(FETCH_ALL_REPORTS_TYPE+userRegion).then(
        (response) => {
            return response.data;
        })
        .catch(error => {
            console.log(error)
        });        
};
export default {
    fetchReportsTypeByPlayerNickname,
    fetchAllReportsType,
}

