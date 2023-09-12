import classes from "./TopBar.module.css"
import { FaSquareFacebook, FaSquareTwitter, FaLinkedin, FaMagnifyingGlass, FaArrowRightFromBracket, FaFileInvoice, FaSitemap, FaTags } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import Cookies from "universal-cookie";
import { useState } from "react";
const cookies = new Cookies();

function TopBar() {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const hangleLogout = async (e) => {
        e.preventDefault();
        cookies.remove('TOKEN');
        if(typeof cookies.get('TOKEN') === "undefined"){
            toast("Logout successfull");
            window.location.href = '/login';
        }else{
            toast("Something went wrong!");
        }
    }
    const hangleDropdownMenu = (event) => {
        setDropdownMenu(!dropdownMenu);
    }
    return (
        <>
        <div className={classes.topbar}>
            <div className={classes.leftbar}>
                <FaSquareFacebook className={classes.topLeftIcon}/>
                <FaSquareTwitter className={classes.topLeftIcon}/>
                <FaLinkedin className={classes.topLeftIcon}/>
            </div>
            <div className={classes.centerbar}>
                <ul className={classes.topMenu}>
                    <li className={classes.menu_item} onClick={hangleDropdownMenu}><Link to="/">Home</Link></li>
                    <li className={classes.menu_item} onClick={hangleDropdownMenu}><Link to="/contact">Contact</Link></li>
                    <li className={classes.menu_item} onClick={hangleDropdownMenu}><Link to="/about">About</Link></li>
                    <li className={classes.menu_item} onClick={hangleDropdownMenu}><Link >Blog</Link>
                        <div className={dropdownMenu ? `${classes.dropdown_menu} ${classes.dropdown_active}` : `${classes.dropdown_menu}`}>
                            <Link to="post"><FaFileInvoice className={classes.dropdown_menu_item_icon} /> Posts</Link>
                            <Link to="post"><FaSitemap className={classes.dropdown_menu_item_icon} /> Categories</Link>
                            <Link to="post"> <FaTags className={classes.dropdown_menu_item_icon} /> Tags</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={classes.rightbar}>
                <div>
                    <img className={classes.topImg} src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600w-1714666150.jpg" alt="" />
                </div>
                <FaMagnifyingGlass className={classes.rightSearchIcon}/>
                <FaArrowRightFromBracket className={classes.rightSearchIcon} onClick={hangleLogout}/>
            </div>
        </div>
        <Outlet />
        <Toaster />
        </>
    );
  }
  
  export default TopBar;