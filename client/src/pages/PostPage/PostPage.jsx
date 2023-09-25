import classes from "./PostPage.module.css";
import Posts from "../../components/Post/Posts";
import { useGetPostsQuery } from "../../services/webSlice";

export default function PostPage() {
    const {data: posts, isLoading, isFetching, isSuccess, isError} = useGetPostsQuery();

    return (
        <div className={classes.post_page_wrapper}>
            <Posts posts={posts} isLoading={isLoading} isFetching={isFetching} isSuccess={isSuccess} isError={isError}/>
        </div>
    )
}