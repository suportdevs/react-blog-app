import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { FaLinkedin, FaMagnifyingGlass, FaSquareFacebook, FaSquareTwitter } from "react-icons/fa6";
export default function Footer(){
    return (
    <div className={classes.footer}>
        <div className={classes.footer_top}>

        <div>
        <Link to="/"><h2>BLOG</h2></Link>
        </div>
        <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/categories">Categories</Link>
        </div>
        <div>
        <Link to="/">Privacy Police</Link>
        <Link to="/contact">Terms of Use</Link>
        <Link to="/about">FAQ</Link>
        <Link to="/about">Suport</Link>
        <Link to="/about">Report</Link>

        </div>
        </div>
        <hr />
        <div className={classes.footer_bottom}>
            <span>Copyright © 2023, All Rights Reserved</span>
            <div>
            <FaSquareFacebook className={classes.icon}/>
                <FaSquareTwitter className={classes.icon}/>
                <FaLinkedin className={classes.icon}/>
                <FaMagnifyingGlass className={classes.icon}/>
            </div>
        </div>
    </div>
    )
}