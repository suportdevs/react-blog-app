import { useState } from "react";
import classes from "./Posts.module.css";
import Post from "./Post";

function Posts({posts, isLoading, isFetching, isError}) {

    let post;
    if(isFetching){
        post = <div>Fetching...</div>;
    }else if(isLoading){
        post = <div>Loading...</div>;
    }else if(isError){
        post = <div>Something went wrong!</div>;
    }
    // pagination code
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setTtemsPerPage] = useState(10);

    const [pageNumberLimit, setPageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = [];
    for(var i =1; i <= Math.ceil(posts?.length / itemsPerPage); i++){
        pages.push(i);
    }
    const indexOfFirstItem = ((currentPage - (pageNumberLimit / 2)) <= 0) ? 0 : currentPage - (pageNumberLimit / 2);
    const indexOfLastItem = currentPage + (pageNumberLimit / 2);
    
    const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem);
        
    const handlePaginatePage = (event) => {
        setCurrentPage(Number(event.target.id));
        setMinPageNumberLimit(indexOfFirstItem);
        setMaxPageNumberLimit(indexOfLastItem);
    }
    const handlePreviousBtn = (event) => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMinPageNumberLimit(indexOfFirstItem);
            setMaxPageNumberLimit(indexOfLastItem);
        }
    }
    const handleNextBtn = (event) => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMinPageNumberLimit(indexOfFirstItem);
            setMaxPageNumberLimit(indexOfLastItem);
        }
    }
    return(
        <article className={classes.post_content_wrapper}>
            <div className={classes.post_content_area}>
                {post ?? currentItems.map((post) => (<Post post={post} key={post._id}/>))}
            </div>
                    <ul className={classes.pagination_list}>
                        <li className={classes.pagination_list_item} onClick={handlePreviousBtn} >
                            <button disabled={currentPage === pages[0] ? true : false}>Previous</button>
                        </li>
                        {pages.map(number => {
                            if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                                return (
                                    <li key={number} id={number} className={currentPage === number ? (`${classes.pagination_list_item}  ${classes.active}`) : classes.pagination_list_item} onClick={handlePaginatePage}>{number}</li>
                                )
                            }else{
                                return null;
                            }
                        }
                        )}
                        <li className={classes.pagination_list_item} onClick={handleNextBtn}>
                            <button disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
                        </li>
                    </ul>
            
        </article>
    );
}

export default Posts;