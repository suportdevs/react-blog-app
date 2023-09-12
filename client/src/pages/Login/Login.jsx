import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import { useLoginUserMutation } from "../../services/authSlice";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, responseinfo] = useLoginUserMutation();

    const handleLoginUser = async (e) => {
        e.preventDefault();
        const credentials = {
            email,
            password,
        }
        await loginUser(credentials);
    }

    if(responseinfo.isError){
        toast.error(responseinfo.error.data.message);
    }
    if(responseinfo.isSuccess){
        toast.success(responseinfo.data.message);
        cookies.set("token", responseinfo.data.token);
        const defaultHeaders = new Headers();
        if (responseinfo.data.token) {
            defaultHeaders.append("Authorization", `Bearer ${responseinfo.data.token}`);
        }
        window.location.href = "/";
    }

    return(        
        <div className={classes.auth_wrapper}>
            <h2>Sign in to your account</h2>
            <form className={classes.authentication_form} onSubmit={handleLoginUser}>
                {responseinfo.isError ? <span style={{color: 'tomato'}}>{responseinfo.error.data.message}</span> : ''}
                {responseinfo.isSuccess ? <span style={{color: 'green'}}>{responseinfo.data.message}</span> : ''}
                <label htmlFor="email">Email<span style={{color:'tomato'}}>*</span></label>
                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className={classes.input} placeholder="Email" />
                <label htmlFor="password">Password<span style={{color:'tomato'}}>*</span></label>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} className={classes.input} placeholder="Password" />
                <button className={classes.button} disabled={responseinfo.isLoading}>{responseinfo.isLoading? 'Loading...' : 'Sign in'}</button>
                <p className={classes.register_label}>Don’t have an account yet? <Link to="/register" className={classes.link}>Sign up</Link></p>
            </form>
            <Toaster />
        </div>
    )
}