import { useState } from "react";
import classes from "./Register.module.css";
import {Link} from 'react-router-dom';
import { useCreateUserMutation} from "../../services/authSlice";
import toast, { Toaster } from 'react-hot-toast';

export default function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, responseinfo] = useCreateUserMutation();
   
    const hangleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const userObj = {
            username,
            email,
            password,
        }
        await createUser(userObj);
    }
    if(responseinfo.isError){
        toast.error(responseinfo.error.data.message);
    }
    if(responseinfo.isSuccess){
        toast.success(responseinfo.data.message);
    }

    return(
        <div className={classes.auth_wrapper}>
            <h2>Sign up to your account</h2>
            <form className={classes.authentication_form} onSubmit={hangleRegistrationSubmit}>
                {responseinfo.isError ? <span style={{color:'tomato'}}>{responseinfo.error.data.message}</span> : ''}
                {responseinfo.isSuccess ? <span style={{color:'green'}}>{responseinfo.data.message}</span> : ''}
                <label htmlFor="username">Username<span style={{color:'tomato'}}>*</span></label>
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)}  className={classes.input} placeholder="Username" required/>
                <label htmlFor="email">Email<span style={{color:'tomato'}}>*</span></label>
                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}  className={classes.input} placeholder="Email" required/>
                <label htmlFor="password">Password<span style={{color:'tomato'}}>*</span></label>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}  className={classes.input} placeholder="Password" required/>
                <button className={classes.button} disabled={responseinfo.isLoading}>{responseinfo.isLoading ? 'Loading...' : 'Sign up'}</button>
                <p className={classes.register_label}>Already have an account? <Link to='/login' className={classes.link}>Sign in</Link></p>
            </form>
            <Toaster />
        </div>
    )
}