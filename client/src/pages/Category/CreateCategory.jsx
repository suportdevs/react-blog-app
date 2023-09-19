import classes from "./CreateCategory.module.css";
import toast from "react-hot-toast";
import {FaPlus} from "react-icons/fa6";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from "react";
import { useStoreCategoryMutation } from "../../services/webSlice";

export default function CreateCategory(){
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    const [storeCategory, responseinfo] = useStoreCategoryMutation();

    const handleCategoryStore = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        await storeCategory(formData);
        e.target.reset();
        if(responseinfo.isSuccess){
            setImage(null);
            setName("");
            setDescription("");
        }
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
                <form className={classes.create_post} onSubmit={(e) => handleCategoryStore(e)}>
                    <div className={classes.post_thumb}>
                        {
                            image && <img src={URL.createObjectURL(image)} alt="" />
                        }
                    </div>
                    <div className={classes.input_group}>
                        <label htmlFor="image"><FaPlus className={classes.plus_icon} /></label>
                        <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} style={{display: 'none'}}/>
                        <input type="text"  name="name" id="name" onChange={(e) => setName(e.target.value)} className={classes.post_input} value={name} placeholder="Write a Name" required/>
                    </div>
                    <div >
                        {/* <textarea name="description" id="description" cols="2" rows="3" placeholder="Write a story..." className={classes.post_input}></textarea> */}
                        <CKEditor
                            editor={ ClassicEditor }
                            data={description}
                            value={description}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                // console.log( { event, editor, data } );
                                setDescription(data);
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