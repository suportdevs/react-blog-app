import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function Protected({children}){
const token = cookies.get("token");

    if (!token) {
        return <Navigate to="/login" replace />;
      }
    
      return children;
}