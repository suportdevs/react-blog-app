import classes from "./SinglePost.module.css"
import Sidebar from "../../components/Sidebar/Sidebar";
import PostDetails from "../../components/Post/PostDetails";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery, useGetPostsQuery } from "../../services/webSlice";

export default function SinglePost(){
    const {id} = useParams();
    const {data: posts} = useGetPostsQuery();
    const {data: categories = []} = useGetCategoriesQuery();
    return(
        <div className={classes.post_details_wrapper}>
            <PostDetails id={id} />
            <Sidebar posts={posts?.slice(posts.length - 10, posts.length)}  categories={categories} />
        </div>
    );
}