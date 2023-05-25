const express = require('express');
const {connectDB,User} = require('./dbconfig');
const intializingPassport = require('./authenticate');
const passport = require('passport');
const expressSession = require('express-session');

connectDB();
intializingPassport(passport);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'secret$key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/register', async (req, res) => {
    const {name, email,password} = req.body;
    const user = await User.findOne({email: email });
    if(user) return res.status(400).json({ error : "email already registered"});
    const newUser = await User.create({ 
        name : name,
        email: email,
        password : password
    });
    res.status(201).json(newUser);
})

app.get('/register', async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email: email });
    if(!user) return res.status(400).json({ message:"No User found" });
    res.status(201).json(user);
})

app.post('/login',passport.authenticate("local"))

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.status(201).json(users);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

