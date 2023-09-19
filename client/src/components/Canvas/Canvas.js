import classes from "./Canvas.module.css";
import {Link} from 'react-router-dom';
import { FaSquareFacebook, FaSquareTwitter, FaLinkedin, FaMagnifyingGlass, FaAngleDown, FaXmark, FaFileInvoice, FaSitemap, FaTags} from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Canvas ({canvasOpen, setCanvasOpen, handleOverlay, overlay}) {
    const user = useSelector((state) => state.user.user);
    const [homeAngle, setHomeAngle] = useState(false);
    const [postAngle, setPostAngle] = useState(false);
    return(
        <>
        <div className={canvasOpen? `${classes.canvas_wrapper} ${classes.canvas_open}` : `${classes.canvas_wrapper}`}>
            <div className={classes.canvas_area}>
                <div className={classes.logo}><h2>Blog</h2> <FaXmark onClick={() => setCanvasOpen(!canvasOpen)} /></div>
                <nav className={classes.canvas_navbar}>
                    <ul className={classes.vertical_menu}>
                        <li><Link to="/">Home</Link> <FaAngleDown className={homeAngle ? `${classes.angle_icon} ${classes.angle_open}` : `${classes.angle_icon}`} onClick={() => setHomeAngle(!homeAngle)} />
                        <ul className={homeAngle ? `${classes.vertical_submenu} ${classes.submenu_open}` : `${classes.vertical_submenu}`} >
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">About</Link></li>
                            <li><Link to="/">Contact</Link></li>
                            <li><Link to="/">Blog</Link></li>
                        </ul>
                    </li>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/">Contact</Link></li>
                        <li><Link to="/">Blog</Link> <FaAngleDown className={postAngle ? `${classes.angle_icon} ${classes.angle_open}` : `${classes.angle_icon}`} onClick={() => setPostAngle(!postAngle)} />
                            <ul className={postAngle ? `${classes.vertical_submenu} ${classes.submenu_open}` : `${classes.vertical_submenu}`} >
                                <li><Link to="post"><FaFileInvoice /> Posts</Link></li>
                                <li><Link to="post"><FaSitemap /> Categories</Link></li>
                                <li><Link to="post"> <FaTags /> Tags</Link></li>
                            </ul>
                        </li>
                    {
                        !user ? (
                            <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            </>
                        ) : ''
                    }
                    </ul>
                </nav>
                <div className={classes.social_icons}>
                    <FaSquareFacebook className={classes.social_icon_item}/>
                    <FaSquareTwitter className={classes.social_icon_item}/>
                    <FaLinkedin className={classes.social_icon_item}/>
                    <FaMagnifyingGlass className={classes.social_icon_item}/>
                </div>
            </div>
        </div>
        </>
    )
}