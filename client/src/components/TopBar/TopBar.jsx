import classes from "./TopBar.module.css"
import { FaSquareFacebook, FaSquareTwitter, FaLinkedin, FaMagnifyingGlass, FaAlignCenter, FaFileInvoice, FaSitemap, FaTags, FaAngleDown, FaArrowRightFromBracket, FaRegUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import Cookies from "universal-cookie";
import { useState } from "react";
import Canvas from "../Canvas/Canvas";
import Overlay from "../Overlay/Overlay";
const cookies = new Cookies();

function TopBar() {
    const user = useSelector((state) => state.user.user);
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [canvasOpen, setCanvasOpen] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const handleOverlay = (event) => {
        setOverlay(!overlay);
    }
    const hangleLogout = async (e) => {
        e.preventDefault();
        cookies.remove('token');
        if(typeof cookies.get('token') === "undefined"){
            toast("Logout successfull");
            window.location.href = '/login';
        }else{
            toast("Something went wrong!");
        }
    }
    return (
        <>
        <div className={classes.topbar}>
            <div className={classes.leftbar}>
                <Link to="/"><h2>BLOG</h2></Link>
            </div>
            <div className={classes.centerbar}>
                <ul className={classes.topMenu}>
                    <li className={classes.menu_item} ><Link to="/">Home</Link></li>
                    <li className={classes.menu_item} ><Link to="/contact">Contact</Link></li>
                    <li className={classes.menu_item} ><Link to="/about">About</Link></li>
                    <li className={classes.menu_item} onClick={(e) => setDropdownMenu(!dropdownMenu)}>Blog <FaAngleDown className={classes.icon} />
                        <div className={dropdownMenu ? `${classes.dropdown_menu} ${classes.dropdown_active}` : `${classes.dropdown_menu}`}>
                            <Link to="posts"><FaFileInvoice className={classes.dropdown_menu_item_icon} /> Posts</Link>
                            <Link to="categories"><FaSitemap className={classes.dropdown_menu_item_icon} /> Categories</Link>
                            <Link to="post"> <FaTags className={classes.dropdown_menu_item_icon} /> Tags</Link>
                        </div>
                    </li>
                    {
                        !user ? (
                            <>
                            <li className={classes.menu_item} ><Link to="/login">Login</Link></li>
                            <li className={classes.menu_item} ><Link to="/register">Register</Link></li>
                            </>
                        ) : ''
                    }
                </ul>
            </div>
            <div className={classes.rightbar}>
                <FaSquareFacebook className={classes.rightSearchIcon}/>
                <FaSquareTwitter className={classes.rightSearchIcon}/>
                <FaLinkedin className={classes.rightSearchIcon}/>
                <FaMagnifyingGlass className={classes.rightSearchIcon}/>
                <FaAlignCenter className={classes.rightSearchIcon} onClick={() => setCanvasOpen(!canvasOpen)}/>
                {
                    user ? (
                        <>
                        <span className={classes.user_avatar}>
                        <img className={classes.topImg} src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600w-1714666150.jpg" alt="" onClick={(e) => setUserDropdown(!userDropdown)}/>
                        <div className={userDropdown ? `${classes.dropdown_menu} ${classes.dropdown_active}` : `${classes.dropdown_menu}`}>
                                <Link to="/profile" ><FaRegUser className={classes.dropdown_menu_item_icon} /> Profile</Link>
                                <Link onClick={hangleLogout} ><FaArrowRightFromBracket className={classes.dropdown_menu_item_icon} /> Logout</Link>
                            </div>
                        </span>
                        </>
                    ) : ''
                }
            </div>
        </div>
        <Overlay overlay={overlay || canvasOpen}/>
        <Canvas canvasOpen={canvasOpen} setCanvasOpen={setCanvasOpen} handleOverlay={handleOverlay} overlay={overlay} />
        <Outlet />
        <Toaster />
        </>
    );
  }
  
  export default TopBar;