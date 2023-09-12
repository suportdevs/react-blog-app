import classes from "./Canvas.module.css";
import {Link} from 'react-router-dom';
import { FaSquareFacebook, FaSquareTwitter, FaLinkedin, FaMagnifyingGlass, FaAngleDown, FaXmark} from "react-icons/fa6";
import { useState } from "react";

export default function Canvas ({canvasOpen, setCanvasOpen, handleOverlay, overlay}) {
    const [homeAngle, setHomeAngle] = useState(false);
    return(
        <>
        <div className={canvasOpen? `${classes.canvas_wrapper} ${classes.canvas_open}` : `${classes.canvas_wrapper}`}>
            <div className={classes.canvas_area}>
                <div className={classes.logo}><h2>Blog</h2> <FaXmark onClick={() => setCanvasOpen(!canvasOpen)} /></div>
                <nav>
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
                        <li><Link to="/">Blog</Link></li>
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