// internal imports
const Tag = require("../models/Tag");

async function getTag (req, res){
    try{
        const categories = await Tag.find();
        return res.status(200).send(categories);
    }catch(error){
        return res.status(500).send({message:error});
    }
}

async function storeTag(req, res){
    const newTag = new Tag(req.body);
    try{
        const savedTag = await newTag.save();
        return res.status(200).send(savedTag);
    }catch(error){
        return res.status(500).send({message: error});
    }
}

async function TagDelete(req, res){
    try{
        await Tag.findByIdAndDelete(req.params.id);
        return res.status(200).send({message: "Record deleted successful"});
    }catch(error){
        return res.status(500).send({message:error});
    }
}


module.exports = {getTag, storeTag, TagDelete};