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
const session = require("express-session");
const cookie = require("express-session/session/cookie");
const User = require('./models/user');// model
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');


mongoose.connect(process.env.MONGODB_SECRET, {});

// middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your front-end URL
    credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());

const sessionConfig = {
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// verify tokens
const verifyJWT = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).send({message: 'Unauthorized'});
    }
    const token = authorization?.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if(err){
            return res.status(403).send({message: 'Forbidden access'});
        }
        req.user = user;
        next();
    })
}
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

app.use(flash());
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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

    app.post('/api/set-token', (req,res) => {
        const user = req.body;
        const token = jwt.sign(user,process.env.ACCESS_SECRET, {
            expiresIn: '1d'
        });
        res.send({token});
    })

    // middleware for admin and instructor
    const verifyAdmin = async (req,res,next) => {
        const email= req.user.email;
        const query = {email: email};
        const user = await usersCollection.findOne(query);
        if(user.role === 'admin'){
            next();
        }else{
            res.status(403).send({message: 'Forbidden access'});
        }
    }

    // classes routes here
    app.post('/users-register', async (req,res) => {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
    })

    app.get('/approved-users',verifyJWT, async (req,res) => {
        const query = {status: 'approved'};
        const users = await usersCollection.find(query).toArray();
        res.send(users);
    })

    // app.get('/users/:uname', async (req,res) => {
    //     const uname = req.params.uname;
    //     const query = {name: uname};
    //     const result = await usersCollection.find(query).toArray();
    //     res.send(result);
    // })

    app.get('/users/:id', async (req,res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await usersCollection.find(query).toArray();
        res.send(result);
    })

    app.get('/users', async (req,res) => {
        const users = await usersCollection.find().toArray();
        res.send(users);
    })

    // change user status
    app.patch('/change-status/:id', async (req,res) => {
        const id = req.params.id;
        const status = req.body.status;
        const address = req.body.address;
        const number = req.body.number;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert: true};
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
    app.patch('/update-user/:id', async (req,res) => {
        const id = req.params.id;
        const updateUser = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert: true};
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

    app.delete('/delete-user/:id', async (req,res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res.send(result);
    })

    app.get('/admin-stats', async (req,res) => {
        const query1 = {status: 'approved'};
        const users1 = await usersCollection.find(query1).toArray();
        const totalApprovedUsers = users1.length;

        const query2 = {status: 'rejected'};
        const users2 = await usersCollection.find(query2).toArray();
        const totalRejectedUsers = users2.length;

        const query3 = {organisation: 'NGO'};
        const users3 = await usersCollection.find(query3).toArray();
        const totalNGOUsers = users3.length;

        const query4 = {organisation: 'individual'};
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

app.post('/login', passport.authenticate('local', { failureFlash: true }), (req, res) => {
    req.flash('success', 'welcome back!');
    // const redirectUrl = '/';
    delete req.session.returnTo;
    // res.redirect("http://localhost:5173/");
    return res.status(200).send({message: 'User registered successfully', redirectUrl: '/posts'});
});

app.post('/register', async (req, res) => {
    // console.log(req.body+"\n");
    try {
        const { username, password, phone, url, gender, address } = req.body;
        // console.log(username + " " + email + " " + password + " ha");
        console.log(username, password, phone, url, gender, address);
        const user = new User({ username, phone, url, gender, address });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            // if (err) return next(err);
            // req.flash('success', 'Welcome to Yelp Camp!');
            // res.redirect('/login');
            return res.status(200).send({message: 'User registered successfully', redirectUrl: '/posts'});
        });
    } catch (e) {
        //     req.flash('error', e.message);
        console.log(e.message);
        //     res.redirect('register');
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
