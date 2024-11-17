const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
// console.log("DB User name ", process.env.DB_USER);
// const cors = require('cors');
// const express = require("express");
// const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('./models/user');// model
const Post = require('./models/post');
const Comment = require('./models/comment');
const Reply = require('./models/reply');

const mongoose = require('mongoose');
const path = require('path');
const post = require('./models/post');
const multer = require('multer');
const { storage } = require('./cloudinary/index');
const upload = multer({ storage });
const { cloudinary } = require('./cloudinary/index');
const Donation = require('./models/donation');


mongoose.connect(process.env.MONGODB_SECRET, {});

// middleware
app.use(cors({
    origin: process.env.WEBSITE_URL, // Replace with your front-end URL
    credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());



const JWT_SECRET = process.env.JWT_SECRET;


// Function to generate JWT
const generateJWT = (user) => {
    // console.log(user._id);
    // console.log(user.username);
    return jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded; // Make sure this contains the user ID
        // console.log('Decoded JWT:', req.user); // Log to check the extracted user data
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};




// mongodb connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(flash());
// app.use(session(sessionConfig));

app.use(passport.initialize());
// app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser({ session: false }));
passport.deserializeUser(User.deserializeUser({ session: false }));
// passport.use(new LocalStrategy(
//     { usernameField: "username" },  // Assumes you're using `username` field to log in
//     async (username, password, done) => {
//         try {
//             const user = await User.findOne({ username });  // Find user by username
//             if (!user) {
//                 return done(null, false, { message: "Incorrect username." });
//             }

//             // Compare the hashed password with the stored one
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch) {
//                 return done(null, false, { message: "Incorrect password." });
//             }

//             return done(null, user);  // Authentication succeeded
//         } catch (err) {
//             return done(err);
//         }
//     }
// ));

// // JWT - based session handling(no actual session is stored)
// passport.serializeUser((user, done) => {
//     done(null, user._id);  // Only store user ID in the session (for now we're not using session)
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);  // Fetch the user by ID
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });


// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@conexion-solidaria.fztg5.mongodb.net/?retryWrites=true&w=majority&appName=conexion-solidaria`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //create a new database and collections
        const database = client.db("conexion-solidaria");
        const usersCollection = database.collection("users");
        const postsCollection = database.collection("posts");
        const commentsCollection = database.collection("comments");
        const notificationsCollection = database.collection("notifications");
        const paymentsCollection = database.collection("payments");
        const reviewsCollection = database.collection("reviews");
        const enrolledCollection = database.collection("enrolled");
        const appliedCollection = database.collection("applied");

        app.post('/api/set-token', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_SECRET, {
                expiresIn: '1d'
            });
            res.send({ token });
        })

        // middleware for admin and instructor
        const verifyAdmin = async (req, res, next) => {
            const email = req.user.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user.role === 'admin') {
                next();
            } else {
                res.status(403).send({ message: 'Forbidden access' });
            }
        }

        // classes routes here
        app.post('/users-register', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })

        app.get('/approved-users', verifyJWT, async (req, res) => {
            const query = { status: 'approved' };
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })

        // app.get('/users/:uname', async (req,res) => {
        //     const uname = req.params.uname;
        //     const query = {name: uname};
        //     const result = await usersCollection.find(query).toArray();
        //     res.send(result);
        // })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const users = await usersCollection.find().toArray();
            res.send(users);
        })

        // change user status
        app.patch('/change-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body.status;
            const address = req.body.address;
            const number = req.body.number;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: status,
                    address: address,
                    number: number,
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // update user details (all)
        app.patch('/update-user/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email,
                    address: updateUser.address,
                    number: updateUser.number,
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.delete('/delete-user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/admin-stats', async (req, res) => {
            const query1 = { status: 'approved' };
            const users1 = await usersCollection.find(query1).toArray();
            const totalApprovedUsers = users1.length;

            const query2 = { status: 'rejected' };
            const users2 = await usersCollection.find(query2).toArray();
            const totalRejectedUsers = users2.length;

            const query3 = { organisation: 'NGO' };
            const users3 = await usersCollection.find(query3).toArray();
            const totalNGOUsers = users3.length;

            const query4 = { organisation: 'individual' };
            const users4 = await usersCollection.find(query4).toArray();
            const totalIndividualUsers = users4.length;

            const stats = {
                approved: totalApprovedUsers,
                rejected: totalRejectedUsers,
                NGO: totalNGOUsers,
                individual: totalIndividualUsers,
            }
            res.send(stats);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
// run().catch(console.dir);

app.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            // console.log(info.message);
            return res.status(400).send({ message: info ? info.message : 'There was an error while logging in. Please try again' });
        }

        // Generate JWT token after successful authentication
        const token = generateJWT(user);

        res.cookie('jwt', token, {
            // _id: user._id,
            httpOnly: true,   // Cannot be accessed from JavaScript (XSS protection)
            secure: process.env.NODE_ENV === 'production',  // Only over HTTPS in production
            sameSite: 'None',  // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000  // Cookie expires in 1 day
        });
        res.status(200).send({ username: user.username, phone: user.phone, email: user.email, message: 'Login successful', redirectUrl: '/posts' });
    })(req, res, next);
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, phone, url, gender, address } = req.body;

        const newUser = new User({ username, email, phone, url, gender, address });

        const registeredUser = await User.register(newUser, password);

        const token = generateJWT(registeredUser);

        res.cookie('jwt', token, {
            // _id: registeredUser._id,
            httpOnly: true,   // To prevent XSS attacks
            secure: process.env.NODE_ENV === 'production',  // Only use HTTPS in production
            sameSite: 'None',  // Prevent CSRF
            maxAge: 24 * 60 * 60 * 1000  // 1 day expiration
        });

        res.status(200).send({ username: newUser.username, phone: newUser.phone, email: newUser.email, message: 'User registered successfully', token, redirectUrl: '/posts' });

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
});

app.post('/logout', (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,  // Cannot be accessed from JavaScript (XSS protection)
        secure: process.env.NODE_ENV === 'production',  // Secure only in production
        expires: new Date(0),  // Set cookie expiration to the past
        sameSite: 'None'  // CSRF protection
    });

    res.status(200).send({ message: 'Logged out successfully', redirectUrl: '/login' });
});


app.get('/is-LoggedIn', verifyJWT, async (req, res) => {
    console.log("user");
    console.log(req.user);
    const user = await User.findById(req.user._id);
    // console.log(req.user);
    res.send({ username: user.username, phone: user.phone, email: user.email, message: "You are authenticated!" });
});


app.post('/add-post', verifyJWT, upload.single('image'), async (req, res) => {
    // console.log("In add-post");
    try {
        const { description, tag, location, additionalInfo } = req.body;
        const user = req.user._id;
        // console.log(req);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newPost = new Post({
            Description: description,
            Tag: tag,
            Location: location,
            author: user,
            username: req.user.username,
            Image: {
                url: req.file.path,      // Image binary data
                filename: req.file.filename  // Image MIME type
            },
            additionalInfo: additionalInfo  // Additional field if you want to store this
        });

        // Save the post to the database
        await newPost.save();

        const savedPost = await Post.findById(newPost._id)
            .populate({
                path: 'author', // Populate the 'author' field for the post itself
                select: 'username', // Fetch only the username of the post author
            });

        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/display-posts', verifyJWT, async (req, res) => {
    try {
        const posts = await Post.find() // Fetch all posts from the database
            .populate({
                path: 'author', // Populate the 'author' field for the post itself
                select: 'username', // Fetch only the username of the post author
            })
            .populate({
                path: 'donation',
                select: 'donorName remark percentageHelped',
            })
            .populate({
                path: 'comments', // Populate the 'comments' field in Post
                select: 'comment createdAt likes', // Select specific fields in comments, including createdAt
                populate: [
                    {
                        path: 'author', // Populate the author of each comment
                        select: 'username', // Fetch only the username of the author
                    },
                    {
                        path: 'replies', // For each comment, populate the 'replies' field
                        select: 'reply createdAt', // Select specific fields for replies, including createdAt
                        populate: {
                            path: 'author', // Populate the author of each reply
                            select: 'username', // Fetch only the username of the author
                        },
                    },
                ],
            })
            .sort({ createdAt: -1 }); // Sort by creation date, most recent first

        res.status(200).json(posts); // Send the posts as JSON
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});



app.post('/posts/:postId/comments', verifyJWT, async (req, res) => {
    const { postId } = req.params; // Get postId from the URL parameters
    const { author, createdAt, comment } = req.body; // Destructure the comment data from the request body
    console.log(postId);
    console.log("here");
    // console.log();
    try {
        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create a new comment object
        const newComment = new Comment({
            author: {
                _id: req.user._id, // Assuming author._id is available
            },
            username: author.username,
            createdAt: createdAt || new Date().toISOString(),
            comment: comment,
            likes: [],
            replies: [],
        });
        await newComment.save();
        // Push the new comment to the comments array in the post
        // console.log(newComment._id);
        post.comments.push(newComment._id);

        // Save the updated post document
        await post.save();

        const savedComment = await Comment.findById(newComment._id) // Fetch all posts from the database
            .populate({
                path: 'author', // Populate the author of each comment
                select: 'username', // Fetch only the username of the author
            })
            .populate({
                path: 'replies', // For each comment, populate the 'replies' field
                select: 'reply createdAt', // Select specific fields for replies, including createdAt
                populate: {
                    path: 'author', // Populate the author of each reply
                    select: 'username', // Fetch only the username of the author
                },
            })
            .sort({ createdAt: -1 }); // Sort by creation date, most recent first

        // Send back the new comment as a response
        res.status(201).json({ message: 'Comment added successfully', comment: savedComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.post('/comments/:commentId/replies', verifyJWT, async (req, res) => {
    const { commentId } = req.params; // Get the comment ID from the URL parameters
    const { author, createdAt, reply } = req.body; // Destructure the reply data from the request body
    console.log(author.username);
    // console.log(author._id);
    try {
        // Find the comment by ID
        const commentToUpdate = await Comment.findById(commentId);
        if (!commentToUpdate) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        // console.log("haha");
        // Create a new reply object
        const newReply = Reply({
            username: author.username,
            author: {
                _id: req.user._id, // Assuming author._id is a valid ObjectId
            },
            // createdAt: createdAt || new Date().toISOString(),
            reply: reply, // The reply text
        });


        console.log("here");
        await newReply.save();
        console.log(newReply._id);
        commentToUpdate.replies.push(newReply._id);
        await commentToUpdate.save();

        // console.log(newReply._id);
        const savedReply = await Reply.findById(newReply._id) // Fetch all posts from the database
            .populate({
                path: 'author', // Populate the author of each comment
                select: 'username', // Fetch only the username of the author
            })
            .sort({ createdAt: -1 }); // Sort by creation date, most recent first


        res.status(201).json({ message: 'Reply added successfully', reply: savedReply });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.post('/posts/:postId/donation-claims', verifyJWT, async (req, res) => {
    const { postId } = req.params;
    const { donorName, remark } = req.body;

    if (!donorName || !remark) {
        return res.status(400).json({ message: 'Donor name and remark are required.' });
    }
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }


    try {
        const donationClaim = new Donation({
            postId,
            donorName,
            remark,
            percentageHelped: 0
        });

        await donationClaim.save();
        const user = await User.findOne({ username: donorName });
        user.donation.push(donationClaim._id);
        await user.save();
        post.donation.push(donationClaim._id);
        await post.save();

        res.status(200).json({ message: 'Donation claim submitted successfully.', donationClaim });
    } catch (error) {
        console.error("Error saving donation claim:", error);
        res.status(500).json({ message: 'An error occurred while saving the donation claim.' });
    }
});


app.post('/donations/:donationId/verify', verifyJWT, async (req, res) => {
    try {
        const { donationId } = req.params;
        const { percentage } = req.body; // The percentage verified by the post author
        console.log(percentage);
        if (!percentage || isNaN(percentage) || percentage < 0 || percentage > 100) {
            return res.status(400).json({ error: 'Invalid percentage value' });
        }


        // Locate the specific donation
        const donation = await Donation.findById(donationId);
        if (!donation) return res.status(404).json({ error: 'Donation not found' });

        // Update the donation's verification percentage
        donation.percentageHelped = percentage;

        await donation.save();


        res.status(200).json({
            message: 'Donation verification updated successfully',
            donation,
        });
    } catch (error) {
        console.error('Error verifying donation:', error);
        res.status(500).json({ error: 'An error occurred while verifying the donation' });
    }
});



app.post('/posts/:postId/likes', verifyJWT, async (req, res) => {
    const { userId } = req.body; // Assuming the user ID is sent in the request body
    const { postId } = req.params; // Get the post ID from the request params
    // console.log(userId + " " + postId);
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // console.log("here1");
        // Check if the user already liked the post
        if (post.Likes.includes(userId)) {
            return res.status(400).json({ message: 'Post already liked' });
        }
        // console.log("here2");
        // Add the user's ID to the likes array
        post.Likes.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post liked successfully', likes: post.Likes });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Unlike a post
app.delete('/posts/:postId/likes', verifyJWT, async (req, res) => {
    const { userId } = req.body; // Assuming the user ID is sent in the request body
    const { postId } = req.params; // Get the post ID from the request params

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has liked the post
        if (!post.Likes.includes(userId)) {
            return res.status(400).json({ message: 'Post not liked yet' });
        }

        // Remove the user's ID from the likes array
        post.Likes = post.Likes.filter(id => id.toString() !== userId);
        await post.save();

        res.status(200).json({ message: 'Post unliked successfully', likes: post.Likes });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.delete('/posts/:postId', verifyJWT, async (req, res) => {
    const { postId } = req.params;
    console.log(postId);
    try {
        // Find the post and populate its comments
        const post = await Post.findById(postId).populate('comments');

        cloudinary.uploader.destroy(post.Image.filename);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Iterate over each comment to delete its replies
        for (const comment of post.comments) {
            const tempComment = await Comment.findById(comment._id);
            for (const reply of tempComment.replies) {
                await Reply.findByIdAndDelete(reply._id);
            }
        }

        // Now delete all comments associated with this post
        const commentIds = post.comments.map(comment => comment._id);
        await Comment.deleteMany({ _id: { $in: commentIds } }); // Deletes all comments associated with the post

        // Finally, delete the post
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post and associated comments and replies deleted successfully' });
    } catch (error) {
        console.error('Error deleting post and its comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.delete('/posts/:postId/comments/:commentId', verifyJWT, async (req, res) => {
    const { postId, commentId } = req.params;
    // console.log(postId + " " + commentId);
    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Find the comment to delete
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
        console.log("haha" + " " + commentIndex);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        // console.log("haha");
        // Delete all replies associated with this comment from the Reply model
        const findComment = await Comment.findById(commentId);
        repliesToDelete = findComment.replies.map(reply => reply._id);

        await Reply.deleteMany({ _id: { $in: repliesToDelete } });

        // Remove the comment from the post's comments array
        post.comments.splice(commentIndex, 1); // Remove the comment

        // Optionally, if you have a separate Comment model, delete it as well
        await Comment.findByIdAndDelete(commentId);

        // Save the modified post
        await post.save();

        res.status(200).json({ message: 'Comment and its replies deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment and replies:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.delete('/comments/:commentId/replies/:replyId', verifyJWT, async (req, res) => {
    const { commentId, replyId } = req.params;

    try {
        // First, delete the reply from the Replies model
        const deletedReply = await Reply.findByIdAndDelete(replyId);
        if (!deletedReply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        // Next, find the comment and remove the reply from its replies array
        await Comment.findByIdAndUpdate(
            commentId,
            { $pull: { replies: { _id: replyId } } }, // Remove the reply ID from the replies array
            { new: true } // Optionally return the updated comment
        );

        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error('Error deleting reply:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// need to remove later
// app.delete('/delete-all-posts', async (req, res) => {
//     try {
//         const result = await Post.deleteMany({});
//         res.status(200).json({ message: 'All posts deleted successfully', result });
//     } catch (error) {
//         console.error('Error deleting posts:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
