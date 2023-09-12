// external imports
const Post = require("../models/Post");
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

async function getPost(req, res){
    const id = req.query.id;
    const username = req.query.user;
    const catName = req.query.category;
    const tagName = req.query.tag;
    try{
        let posts;
        if(id){
            posts = await Post.findOne({_id: id}).populate('category').populate('author');
        }else if(username){
            const user = await User.findOne(username);
            posts = await Post.find({user_id: user._id}).populate('category').populate('author');
        }else if(catName){
            const category = await Category.findOne({name: catName});
            posts = await Post.find({category_id: category._id}).populate('category').populate('author');
        }else if(tagName){
            posts = await Post.find({tags: {
                $in: [tagName]
            }}).populate('category');
        }else{
            posts = await Post.find().populate('category').populate('author');
        }
        return res.status(200).send(posts);
    }catch(error){
        return res.status(500).send(error);
    }
}
async function getSinglePost(req, res){
    try{
        const post = await Post.findById(req.params.id).populate('category').populate('author').populate('tags');
        if(!post) return res.status(404).send({message: "Something went wrong!"});
        return res.status(200).send(post);
    }catch(error){
        return res.status(500).send(error);
    }
}

async function postStore (req, res){
    const {title, category, status, content} = new Post(req.body);
    const imageFile = req.file;
    try{
        const existTitle = await Post.findOne({title});
        if(existTitle) return res.status(401).send({message: `This ${title} title already used. You should choose different one.`});

        const slug = title
        .toLowerCase()                 // Convert to lowercase
        .replace(/\s+/g, '-')          // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove non-word characters except -
        .replace(/--+/g, '-')          // Replace multiple -- with single -
        .replace(/^-+|-+$/g, '');

        const newPost = new Post({
            featured_image: imageFile ? imageFile.filename : null,
            title,
            slug,
            category,
            status,
            content,
            author: req.user?.userId ?? null,
        })

        const savedPost = await newPost.save();
        return res.status(200).send({message: 'Post created sucessfull', post: savedPost});
    }catch(error){
        return res.status(500).send({message: "something went wrong! " + error, error});
    }
}

async function postUpdate(req, res){
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(402).send("Something went wrong!");
        const {title, category, status, content} = req.body;
        const imageFile = req.file;
        
        const slug = title
        .toLowerCase()                 // Convert to lowercase
        .replace(/\s+/g, '-')          // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove non-word characters except -
        .replace(/--+/g, '-')          // Replace multiple -- with single -
        .replace(/^-+|-+$/g, '');

        let postObj;
        if(imageFile){
            const post_file_dir = path.join(__dirname, '..', '..') + '/public/media/';
            fs.unlink(post_file_dir + post.featured_image, (err) => {
                if (err) {
                    throw err;
                }
            });
            postObj = {
                title,
                slug,
                featured_image: imageFile?.filename,
                category,
                status,
                content,
                author: req.user?.userId,
            }
        }else{
            postObj = {
                title,
                slug,
                category,
                status,
                content,
                author: req.user?.userId,
            }
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: postObj,
        }, {new: true});
        return res.status(200).send({message: "Record updated successfull", updatedPost})
    }catch(error){
        return res.status(500).send({message: "Record updated successfull",error})
    }
}

async function postDelete(req, res){
    try{
        const post = await Post.findById(req.params.id);
        if(!post)return res.status(401).send({message: "Something went wrong!"});

        const post_file_dir = path.join(__dirname, '..', '..') + '/public/media/';
        fs.unlink(post_file_dir + post.featured_image, (err) => {
            if (err) {
                throw err;
            }
        });
        await Post.findByIdAndDelete(post._id);
        return res.status(200).send({message: "Record deleted successfull"});
    }catch(error){
        return res.status(500).send({message: "Record deleted successfull", error});
    }
}

module.exports = {getPost, getSinglePost, postStore, postUpdate, postDelete}