import axios from 'axios';

const fetchTopSummoners= () => {
      return axios.get('http://localhost:3002/top-summoners')
        .then(res =>  res)
}

export default fetchTopSummoners;
