import classes from "./Home.module.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Post/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useGetCategoriesQuery, useGetPostsQuery } from "../../services/webSlice";

function Home(){
    const {data: posts, isLoading, isFetching, isSuccess, isError} = useGetPostsQuery();
    const {data: categories = [], isLoading:isCategoryLoading, isFetching:isCategoryFetching, isSuccess:isCategorySuccess, isError:isCategoryError} = useGetCategoriesQuery();

    return (
        <>
        <Header sliders={posts} />

        <div className={classes.content_wrapper}>
            <Posts posts={posts} isLoading={isLoading} isFetching={isFetching} isSuccess={isSuccess} isError={isError}/>
            <Sidebar posts={posts?.slice(posts.length - 10, posts.length)}  categories={categories}/>
        </div>
        </>
    );
}

export default Home;