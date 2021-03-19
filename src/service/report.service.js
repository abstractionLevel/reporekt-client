import axios from "axios";
import authHeader from '../service/auth-header';
import SETTINGS from '../utility/settings';


var userRegion = localStorage.getItem("userRegion")
const headers = authHeader();

if(userRegion) {
    if(userRegion === "eune") {
        userRegion = "eu_nordic_and_est";
    }

}


const API_URL_REPORT = SETTINGS.SERVER_PROXY+"/api/v1/reports?region="+userRegion;
const API_URL_FETCH_REPORT_BY_PLAYER =  SETTINGS.SERVER_PROXY+"/api/v1/reports/players/";
const API_URL_FETCH_LAST_REPORT_OF_REGION =  SETTINGS.SERVER_PROXY+"/api/v1/reports/last?region="+userRegion;



const fetchReportByPlayerUsername = (username) => {
    return axios.get(API_URL_FETCH_REPORT_BY_PLAYER +username+'?region='+userRegion);
};

const fetchLastReportOfRegion = () => {
    return axios.get(API_URL_FETCH_LAST_REPORT_OF_REGION).then(
        (response)=>{
            return response.data
        });
};

const doReport = (nickname,reportType,description) => {
    return axios.post(API_URL_REPORT, {
        nickname,reportType,description},headers
        )
    .then((response)=>{
        return response.status;
    })
    .catch(
        (error) => {
            return error.response.status;
        });
};
export default {
    fetchReportByPlayerUsername,
    doReport,
    fetchLastReportOfRegion,
};