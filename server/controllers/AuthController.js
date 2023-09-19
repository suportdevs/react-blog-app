// extarnal imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal imports
const User = require("../models/User");

async function register(req, res){
    const {username, email, password} = req.body;
    await bcrypt.hash(password, 10).then(hashedPassword => {
        const user = new User({username, email, password: hashedPassword});
        user.save().then(result => {
            return res.status(201).send({
                message: "User Created Successfully",
                result,
            })
        })
        .catch(error => {
            return res.status(500).send({message: "Error creating user!", error})
        })
    })
    .catch(error => {
        return res.status(500).send({message: "Enable to hash password!", error});
    })
}

async function login(req, res){
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).send({message: "Email not found!"});

        // match user password
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).send({
              message: "Passwords do not match!"
            });
        const userData = {
            userId: user._id,
            userName: user.username,
            userEmail: user.email
          };
        // create a jwt token
        const token = jwt.sign(userData,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );
      
          return res.status(200).send({
            message: "Login successful.",
            email: user.email,
            token,
            userData
          });
    }catch(error){
        return res.status(500).send({message: "An error occurred!", error});
    }
}

async function getUser(req, res){
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.status(401).send({message: "User not found!"});
        const {password, ...data} = user;
        return res.status(200).send(data);
    }catch(error){
        return res.status(401).send({message: "User not found!", error});
    }
}

async function updateUser(req, res){
    if(req.body.userId == req.params.id){
        if(req.body.password){
            const solt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, solt);
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});
            return res.status(200).send(updateUser);
        }catch(error){
            return res.status(401).send({message: error});
        }
    }else{
        return res.status(401).send({message: "You can only update your information!"});
    }
}

async function deleteUser(req, res){
    if(req.body.userId == req.params.id){
        try{
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).send({message: "User has been deleted successfull."});
        }catch(error){
            return res.status(401).send({message: error});
        }
    }else{
        return res.status(401).send({message: "You can only delete your information!"});
    }
}

module.exports = {register, login, getUser, updateUser, deleteUser}