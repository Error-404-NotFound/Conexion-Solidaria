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
const mongoose = require('mongoose');
const path = require('path');


mongoose.connect(process.env.MONGODB_SECRET, {});

// middleware
app.use(cors({
    origin: 'http://localhost:5173' || 'http://localhost:5174', // Replace with your front-end URL
    credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());



const JWT_SECRET = process.env.JWT_SECRET;


// Function to generate JWT
const generateJWT = (user) => {
    return jwt.sign({ id: user }, JWT_SECRET, { expiresIn: '1d' });
};


// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;  // Read token from the cookie
    console.log("in verifyJWT");
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    console.log("JWT Token Exists");
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.user = decoded;  // Attach user info to the request
        console.log("Going to next");
        next();
    });
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
        const token = generateJWT(user.username);

        res.cookie('jwt', token, {
            httpOnly: true,   // Cannot be accessed from JavaScript (XSS protection)
            secure: process.env.NODE_ENV === 'production',  // Only over HTTPS in production
            sameSite: 'Strict',  // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000  // Cookie expires in 1 day
        });
        res.status(200).send({ message: 'Login successful', redirectUrl: '/posts' });
    })(req, res, next);
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, phone, url, gender, address } = req.body;

        const newUser = new User({ username, email, phone, url, gender, address });

        const registeredUser = await User.register(newUser, password);

        const token = generateJWT(registeredUser.username);

        res.cookie('jwt', token, {
            httpOnly: true,   // To prevent XSS attacks
            secure: process.env.NODE_ENV === 'production',  // Only use HTTPS in production
            sameSite: 'Strict',  // Prevent CSRF
            maxAge: 24 * 60 * 60 * 1000  // 1 day expiration
        });

        res.status(200).send({ message: 'User registered successfully', token, redirectUrl: '/posts' });

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
        sameSite: 'Strict'  // CSRF protection
    });

    res.status(200).send({ message: 'Logged out successfully', redirectUrl: '/login' });
});


app.get('/is-LoggedIn', verifyJWT, (req, res) => {
    res.send({ user: req.user, message: "You are authenticated!" });
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
