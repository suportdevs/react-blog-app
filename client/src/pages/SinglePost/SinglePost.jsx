import classes from "./SinglePost.module.css"
import Sidebar from "../../components/Sidebar/Sidebar";
import PostDetails from "../../components/Post/PostDetails";
import { useParams } from "react-router-dom";

export default function SinglePost(){
    const {id} = useParams();
    return(
        <div className={classes.post_details_wrapper}>
            <PostDetails id={id} />
            <Sidebar />
        </div>
    );
}