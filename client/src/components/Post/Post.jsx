import { FaRegCalendarDays, FaRegEye, FaRegComments, FaRegThumbsUp } from "react-icons/fa6";
import classes from "./Post.module.css";
import timeFormatter from "../../utilies/timeFormatter";
import {Link} from "react-router-dom";

function Post ({post}){
    const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_URL;

    return(
        <div className={classes.single_post_content_area}>
            <div className={classes.single_post_content}>
                <div className={classes.post_thumb}>
                    <Link to={`/post/${post._id}`}>
                        <div className={classes.inner}>
                            <img src={`${BACKEND_ROOT_URL}media/${post.featured_image}`} alt="" />
                        </div>
                    </Link>
                </div>
                <div className={classes.post_detials}>
                    <ul className={classes.meta}>
                        <li className={classes.meta_item}> <a href=""><img src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600w-1714666150.jpg" alt="" /> <span>{post.author?.username}</span></a></li>
                        <li  className={classes.meta_item}><a href="">{post.category_id}</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegCalendarDays /> {timeFormatter(post.createdAt) }</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegComments /> 2000</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegEye /> 2000</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegThumbsUp /> 2000</a></li>
                    </ul>
                    <Link to={`/post/${post._id}`}><h2>{post.title}</h2></Link>
                    <div dangerouslySetInnerHTML={{ __html: post.content.slice(0, 50).concat('…') }} />
                </div>
            </div>
        </div>
    )
}

export default Post;