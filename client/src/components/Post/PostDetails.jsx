import classes from "./PostDetails.module.css";
import { Link } from "react-router-dom";
import { useGetSinglePostQuery, usePostDeleteMutation } from "../../services/webSlice";
import { FaRegCalendarDays, FaRegEye, FaRegComments, FaRegThumbsUp, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import timeFormatter from "../../utilies/timeFormatter";

export default function PostDetails({id}){
    const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_URL;
    const [postDelete, responseinfo] = usePostDeleteMutation();
    const {data: post, isFetching, isLoading, isError, isSuccess}=useGetSinglePostQuery(id);
    let fetchedPostData;
    if(isFetching){
        fetchedPostData = <div>Fetching...</div>;
    }else if(isLoading){
        fetchedPostData = <div>Loading...</div>;
    }else if(isError){
        fetchedPostData = <div>Something went wrong!</div>;
    }else if(isSuccess){
        fetchedPostData = (
            <div className={classes.single_post_content}>
                <div className={classes.post_thumb}>
                    <div className={classes.inner}>
                        <img src={`${BACKEND_ROOT_URL}media/${post.featured_image}`} alt={post.title} />
                    </div>
                </div>
                <div className={classes.post_detials}>
                    <ul className={classes.meta}>
                        <li className={classes.meta_item}> <a href=""><img src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600w-1714666150.jpg" alt="" /> <span>{post.author?.username}</span></a></li>
                        <li  className={classes.meta_item}><a href="">{post.category && post.category.name}</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegCalendarDays /> {timeFormatter(post.createdAt)}</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegComments /> 2000</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegEye /> 2000</a></li>
                        <li  className={classes.meta_item}><a href=""><FaRegThumbsUp /> 2000</a></li>
                    </ul>
                    <div className={classes.post_title}>
                        <h2>{post.title}</h2>
                        <div className={classes.post_title_right}>
                            <Link to={`/post/edit/${post._id}`}>
                            <FaRegPenToSquare className={classes.post_title_icon} />
                            </Link>
                            <FaRegTrashCan onClick={() => handlePostDelete(post._id)} className={classes.post_title_icon} />
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
            )
    }

    const handlePostDelete = async (id) => {
        await postDelete(id)
    }
    if(responseinfo.isSuccess){
        toast.success(responseinfo.data.message);
        window.location.href = "/";
    }
    if(responseinfo.isError){
        toast.error(responseinfo.error.data.message);
    }

    return(
        <>
        <article className={classes.post_content_wrapper}>
            <div className={classes.post_content_area}>
                <div className={classes.single_post_content_area}>
                    {fetchedPostData }
                </div>
            </div>
        </article>
        </>
    )
}