// import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

const verifyCurrentUser = () => {
    try{
        const cookies = new Cookies();
        const token = cookies.get('token');
        const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
    }catch(error){
        return null;
    }
}
export default verifyCurrentUser;