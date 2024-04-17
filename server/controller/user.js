const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const fs = require('fs')


const signUp = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, name, username, password, contact } = req.body;

        if (username === '' || email === '' || password === '') {
            res.status(301).json({ message: "Please fill all the fields" });
        }


        User.findOne({ email })
            .then((user) => {
                if (user) {
                    res.status(302).json({ message: "Email Already Registered" });
                } else {


                    User.findOne({ username })
                        .then((user) => {
                            if (user) {
                                res.status(302).json({ message: "User Name Already Exists" })
                            } else {
                                bcrypt.hash(password, 10, async (error, hash) => {

                                    if (error) res.status(500).json({ error });
                                    let userData = new User({ email, username, password: hash, contact, name: name || username });
                                    const response = await userData.save();
                                    res.status(200).json({ message: "Sign Up Successful", response });
                                })
                            }
                        })
                }
            })
    }
    catch (error) {
        res.status(500).json({ message: "register Failed" });

    }

}

const signIn = async (req, res) => {
    try {

        // return passport.authenticate(
        //     "local",
        //     { session: false },
        // async (err, passportUser) => {
        //     if (err) {
        //         return next(err);
        //     }
        // console.log(passportUser);
        const user = req.user;
        // console.log(user);
        if (user) {
            //create token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            //create token
            const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

            res.cookie('token', token, {
                httpOnly: true, // Recommended for security
                secure: true, // Recommended for security if using HTTPS
                maxAge: 1000 * 60 * 60 * 24, // Expires in 24 hours (optional)
            });

            return res.status(200).json({ message: "Login Successfully", user, token })
        }

        return res.json({ status: 400 });
        // }
        // )(req, res, next);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }

}

const logout = (req, res) => {
    // console.log(req.headers['authorization']);
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "You're now logged out." });
}

const fileUpload = async (req, res) => {
    // console.log(req.useId);
    // console.log(req.body.base64);
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    //check user have profileImage if have remove in /images/upload/tht string of profileImage
    // if (user.profileImage != null) {
    //     fs.unlinkSync(`${__dirname}/../images/uploads/${user.profileImage}`);
    // }

    // user.profileImage = req.file.filename;
    user.profileImage = req.body.base64;

    await user.save();

    res.status(200).json({ message: "File Uploaded", user })
}

const getUserData = async (req, res) => {

    if (req.user) {
        try {
            const userId = req.userId;

            // const user = await User.findById(userId).select({password: 0});
            const user = await User.findById(userId).select({ password: 0 }).populate("posts");
            if (!user) {
                throw new Error();
            };
            // console.log(user);
            return res.status(200).json({ user })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        // User is not authenticated
        console.log("Not Authenticated");
        return res.status(403).json({ message: "unauthorized access" })
    }
}

const getSavedPost = async (req, res) => {

    if (req.user) {
        try {
            const userId = req.userId;

            // const user = await User.findById(userId).select({password: 0});
            //select only boards not full user collection
            const user = await User.findById(userId).select({ all: 0 }).populate("boards");//in that only boards get

            if (!user) {
                throw new Error();
            };
            // console.log(user);
            return res.status(200).json({ boards: user.boards })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        // User is not authenticated
        console.log("Not Authenticated");
        return res.status(403).json({ message: "unauthorized access" })
    }
}

const savePost = async (req, res) => {
    // console.log(req.user);
    let { id } = req.body;
    //check username empty if empty so donot change username 
    // console.log(username, name, contact);
    try {
        const user = req.user;

        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'No such user found' });
        }

        await User.findByIdAndUpdate(user._id, {
            $push: { boards:  id },
        }, { new: true });

        res.status(200).json({ message: 'Saved Post Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const discardSavePost = async (req, res) => {
    // console.log(req.user);
    let { id } = req.body;
    //check username empty if empty so donot change username 
    // console.log(username, name, contact);
    try {
        const user = req.user;

        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'No such user found' });
        }

        //remove from boards array this post id
        await User.findByIdAndUpdate(req.userId, {
            $pull: { boards: id }
        }, { new: true })

        res.status(200).json({ message: 'Saved Post Discard Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const editProfile = async (req, res) => {
    // console.log(req.user);
    let { username, name, contact } = req.body;
    //check username empty if empty so donot change username 
    // console.log(username, name, contact);
    try {
        const user = req.user;

        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'No such user found' });
        }

        if (!username) {
            username = user.username;
        }

        const alreadyUser = await User.findOne({ username })
        // console.log(alreadyUser);

        if (alreadyUser && alreadyUser._id != user._id) {
            return res.status(309).json({ message: "Username Already Taken!" });
        }

        let updatedUser = await User.findByIdAndUpdate(user._id, {
            username: username || user.username,
            name: name || user.name,
            contact: contact || user.contact
        }, { new: true });

        if (!updatedUser) {
            res.status(404).send({ message: "The user with the given Id was not found." });
        }

        res.status(200).json({ message: 'Profile Update Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const createPost = async (req, res) => {
    const user = req.user;

    // const 

    const { title, description, image } = req.body;

    // console.log(title, description, image);

    const post = await Post.create({
        title,
        description: description ? description : 'Description not provided',
        image,
        user: user._id
    })

    user.posts.push(post._id);
    await user.save();

    res.status(200).json({ message: "Post Created", post });

}

const getAllPosts = async (req, res) => {
    try {
        const user = req.user;
        const posts = await Post.find()
        // console.log(posts);

        res.status(200).json({ posts, user });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error in retrieving posts" })
    }
}

const getUserPosts = async (req, res) => {
    // console.log(req.user);

    try {
        const user = await User.findOne({ _id: req.user._id }).populate("posts")
        // console.log(user.posts);

        res.status(200).json(user.posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error in retrieving posts" })
    }
}

const getPostData = async (req, res) => {
    try {
        // console.log(req.params.cardid);
        const postId = req.params.cardid;

        const post = await Post.findOne({ _id: postId }).populate("user", "username");
        // console.log(post);

        res.status(200).json(post);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error in retrieving posts" })
    }
}

const deletePost = async (req, res) => {
    const postId = req.params.cardid;

    if (!req.user) {
        return res.status(401).json({ message: 'You are not logged in' });
    }

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: "No post found with that id!" });
    }


    //checking if the user is the owner of the post 
    if (String(post.user) !== String(req.userId)) {
        return res.status(403).json({ message: 'You do not have permission to perform this action on this post!' });
    }

    //post image remove from directory
    // if (post.image !== null) {
    //     // fs.unlinkSync(`${__dirname}/../images/uploads/${user.profileImage}`);

    //     fs.unlinkSync(`${__dirname}/../images/uploads/${post.image}`);
    // }

    //delete post of user in user.posts and delete post schema in post

    await User.findByIdAndUpdate(req.userId, { $pull: { posts: postId } }, { new: true })
        .then(() => {
            Post.deleteOne({ _id: postId })
                .then(() => {
                    res.status(200).json({ message: 'Deleted the post!' })
                }).catch((err) => {

                    //   await Post.deleteOne({_id : postId}).then(()=>{
                    //       await User.deleteOne
                    //       res.status(200).json({message:'Deleted the post!'})
                    //   }).catch((err)=> {
                    res.status(500).json({ message: err })
                })
        })
};

//middleware for user logged in checking
const isAuthenticated = async (req, res, next) => {
    const token = req.headers['authorization'];

    // console.log(token);
    if (!token) {
        console.log("token not found");
        // return  res.status(401).json({message:"You are not authorized to do this action."})
        return res.status(401).json({ message: "token Not Found" });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);

        // console.log(data);

        req.userId = data.id;
        // req.email = data.email;
        const user = await User.findById(data.id).select({ password: 0 });
        // console.log(user);
        req.user = user;
        return next();
    } catch (err) {
        // console.log(err, "error in token");
        // return err;

        // Handle errors appropriately (e.g., logging, detailed error messages for development)
        console.error(err);

        if (err.name === 'TokenExpiredError') {
            res.status(322).json({ message: "Token Expired" });
            return;
        } else {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    }
    next()
};

const checkUserAuthenticate = async (req, res, next) => {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email })
    // console.log(user);
    if (!user) {
        // res.send("User not found.");
        return res.status(302).json({ message: "Incorrect Email or Password." });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // console.log(isMatch);
    if (!isMatch) {
        return res.status(302).json({ message: "Incorrect Email or Password." });
    }

    req.user = user;

    return next()
}

module.exports = { signUp, signIn, logout, fileUpload, getUserData, editProfile, isAuthenticated, createPost, getAllPosts, getUserPosts, getPostData, savePost, discardSavePost, getSavedPost, deletePost, checkUserAuthenticate };