import classes from "./PostEdit.module.css";
import { Link, useParams } from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import toast from "react-hot-toast";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from "react";
import { useGetCategoriesQuery, useGetPostEditQuery, useUpdatePostMutation } from "../../services/webSlice";

export default function PostEdit(){
    const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_URL;

    const {id} = useParams();
    const {data: post, isFetching: isPostFetching, isLoading: isPostLoading, isError: isPostError} = useGetPostEditQuery(id);
    const {data: categories, isFetching, isLoading} = useGetCategoriesQuery();
    const [updatePost, responseinfo] = useUpdatePostMutation();

    let categoriesOpns;
    if(isFetching){
        categoriesOpns = <option>Category is fetching...</option>
    }else if(isLoading){
        categoriesOpns = <option>Loading...</option>
    }else{
        categoriesOpns = (<>
            <option value=''>Select Category</option>
                {categories.map((category) => (<option value={category._id} key={category._id} selected={category._id === post?.category?._id ? 'selected' : ''}>{category.name}</option>))
            }
        </>);
    }

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(isPostError || isPostLoading ? '' : post?.title ?? '');
    const [category, setCategory] = useState(isPostError || isPostLoading ? '' : post?.category?._id ?? '');
    const [status, setStatus] = useState(isPostError || isPostLoading ? '' : post?.status ?? '');
    const [content, setContent] = useState(isPostError || isPostLoading ? '' : post?.content ?? '');
    
    const handleUpdatePost = async (e) => {
        e.preventDefault();
        
        const postObj = new FormData();
        postObj.append('image', image);
        postObj.append('title', title);
        postObj.append('category', category);
        postObj.append('status', status);
        postObj.append('content', content);
        await updatePost({id, postObj});
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
        window.location.href = `/post/${id}`;
    }
    
    return(
        <section className={classes.create_post_area}>
            <div className={classes.create_post}>
                <form className={classes.create_post} onSubmit={(e) => handleUpdatePost(e)}>
                    <div className={classes.post_thumb}>
                        {
                            image ? (<img src={URL.createObjectURL(image)} alt="" />) : (<img src={`${BACKEND_ROOT_URL}/media/${post?.featured_image}`} alt="" />)
                        }
                    </div>
                    <div className={classes.input_group}>
                        <label htmlFor="image"><FaPlus className={classes.plus_icon} /></label>
                        <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} style={{display: 'none'}} />
                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={classes.post_input} placeholder="Write a post title..." required/>
                    </div>
                    <div className={classes.input_group}>
                        <select name="category_id" id="category_id" defaultValue={category} onChange={(e) => setCategory(e.target.value)} className={classes.post_input} required>
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
                            data={(!isPostError && post) ? post.content : ''}
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