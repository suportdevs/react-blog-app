import classes from "./CreatePost.module.css";
import { Link } from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import toast from "react-hot-toast";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from "react";
import { useGetCategoriesQuery, useStorePostMutation } from "../../services/webSlice";

export default function CreatePost(){
    const {data: categories, isFetching, isLoading} = useGetCategoriesQuery();
    const [storePost, responseinfo] = useStorePostMutation();

    let categoriesOpns;
    if(isFetching){
        categoriesOpns = <option>Category is fetching...</option>;
    }else if(isLoading){
        categoriesOpns = <option>Loading...</option>;
    }else{
        categoriesOpns = (<>
            <option value=''>Select Category</option>;
                {categories.map((category) => (<option value={category._id} key={category._id}>{category.name}</option>))
            }
        </>);
    }

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [content, setContent] = useState("");
    
    const handleStorePost = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('status', status);
        formData.append('content', content);
        await storePost(formData);
        e.target.reset();
    }
    
    if(responseinfo.isError){
        if(Array.isArray(responseinfo.error.data)){
            responseinfo.error.data.message.map(error => toast.error(error.message));
        }else if(responseinfo.data.message != null && typeof responseinfo.data.message=== 'object'){
            toast.error(responseinfo.error.data?.message.message);
        }else{
            toast.error(responseinfo.error.data?.message);
        }
    }
    if(responseinfo.isSuccess){
        toast.success(responseinfo.data.message);
    }
        
    return(
        <section className={classes.create_post_area}>
            <div className={classes.create_post}>
                <form className={classes.create_post} onSubmit={(e) => handleStorePost(e)}>
                    <div className={classes.post_thumb}>
                        {
                            image && <img src={URL.createObjectURL(image)} alt="" />
                        }
                    </div>
                    <div className={classes.input_group}>
                        <label htmlFor="image"><FaPlus className={classes.plus_icon} /></label>
                        <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} style={{display: 'none'}} required/>
                        <input type="text"  name="title" id="title" onChange={(e) => setTitle(e.target.value)} className={classes.post_input} placeholder="Write a post title..." required/>
                    </div>
                    <div className={classes.input_group}>
                        <select name="category_id" id="category_id" onChange={(e) => setCategory(e.target.value)} className={classes.post_input} required>
                            {categoriesOpns}
                        </select>
                        <Link to="/create-category" className={classes.category_create_link}><FaPlus /></Link>
                        <select name="status" id="status" onChange={(e) => setStatus(e.target.value)} className={classes.post_input} required>
                            <option value="Publish">Publish</option>
                            <option value="Draft">Draft</option>
                        </select>
                    </div>
                    <div >
                        {/* <textarea name="content" id="content" cols="2" rows="3" placeholder="Write a story..." className={classes.post_input}></textarea> */}
                        <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                // console.log( { event, editor, data } );
                                setContent(data);
                            } }
                            onBlur={ ( event, editor ) => {
                                // console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                // console.log( 'Focus.', editor );
                            } }
                        />
                    </div>

                    <div className={classes.input_group}>
                        <button className={classes.button}>Save</button>
                        </div>
                </form>
            </div>
        </section>
    )
}