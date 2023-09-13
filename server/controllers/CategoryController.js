// internal imports
const Category = require("../models/Category");

async function getCategory (req, res){
    try{
        const categories = await Category.aggregate([
            {
              $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'category',
                as: 'posts',
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                postCount: { $size: '$posts' },
              },
            },
          ]);
        return res.status(200).send(categories);
    }catch(error){
        return res.status(500).send({message:error});
    }
}

async function storeCategory(req, res){
    const {name, description} = req.body;
    const imageFile = req.file;
    
    try{
        const existCategory = await Category.findOne({name});
        if(existCategory){
            return res.status(401).send({message: `${name} category already exist!`});
        } else{
            const newCategory = new Category({
                image: imageFile ? imageFile.filename : null,
                name,
                description,
                author: req.user.userId ?? null,
            });
            const savedCategory = await newCategory.save();
            return res.status(200).send({message: "Category created successful", savedCategory});
        }
    }catch(error){
        return res.status(500).send({message: error});
    }
}

async function categoryDelete(req, res){
    try{
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).send({message: "Record deleted successful"});
    }catch(error){
        return res.status(500).send({message:error});
    }
}


module.exports = {getCategory, storeCategory, categoryDelete};