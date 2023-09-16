import { Link } from "react-router-dom";
import classes from "./Sidebar.module.css";
import timeFormatter from "../../utilies/timeFormatter";

function Sidebar({posts, categories}){
    const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_URL;
    
    return (
        <aside className={classes.widget_wrapper}>
            <div className={classes.single_widget}>
                <div className={classes.single_sidebar_title}>
                    <h2>Popular Posts</h2>
                </div>
                {
                    posts && posts?.map(post => (
                    <div className={classes.single_widget_content} key={post._id}>
                        <div className={classes.widget_post}>
                            <div className={classes.widget_post_thumb}>
                                <Link to={`post/${post._id}`}>
                                    <div className={classes.widget_post_thumb_inner}>
                                    <img src={`${BACKEND_ROOT_URL}/media/${post.featured_image}`} alt={post.title} />
                                    </div>
                                </Link>
                            </div>
                            <div className={classes.widget_post_details}>
                                <Link to={`post/${post._id}`}>
                                <h4>{post.title}</h4>
                                </Link>
                                <p>{timeFormatter(post.createdAt) }</p>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
            <div className={classes.single_widget}>
                <div className={classes.single_sidebar_title}>
                    <h2>Explore Topics</h2>
                </div>
                <div className={classes.single_widget_content}>
                    <ul className={classes.list}>
                        {categories && categories?.map(category => (
                            <li className={classes.list_item} key={category._id}><a href="">{category.name}</a><span>({category.postCount})</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;