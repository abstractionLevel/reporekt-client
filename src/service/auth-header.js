import Cookies from 'js-cookie';

export default function authHeader() {
    const user = Cookies.get("wtu");
    if(user ) {
        return {headers:{ 'Bearer' : user}};
    }
    else {
        return {};
    }
}