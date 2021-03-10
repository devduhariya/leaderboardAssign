const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const session_secret = 'ssshhhy';
const cors = require('cors');
// for parsing application/json
const SALT = 5;
const app = express();
require('./schema/userScheama');
require('./schema/pageSchema');
require('./schema/contentSchema');
require('./schema/userContentSchema');
const UserContent = mongoose.model('userContent');
const User = mongoose.model('user');
const Content = mongoose.model('Content');
const Page = mongoose.model('Page');
mongoose.connect('mongodb+srv://sukhdev:12@db.ukr9s.mongodb.net/db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors({
    credentials: true,
    origin: " http://localhost:3000"
}));
app.use(
    session({
        secret: session_secret,
        cookie: { maxAge: 1 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false
    })
);
app.use(bodyParser.json());
const isNullOrUndefined = (val) => val === null || val === undefined || val === '';
const AuthMiddleware = async (req, res, next) => {
    const email = "me@gmail.com";
    console.log('req.session:', req.session);
    if (isNullOrUndefined(email)) {
        res.status(401).send({ err: "Not logged in" });
        console.log('Session', req.session);
    } else {
        next();
    }
};

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    if (isNullOrUndefined(username) || isNullOrUndefined(email) || isNullOrUndefined(password)) {
        res.status(400).send({
            err: `please input valid details`,
        });
    } else {
        const existingUser = await User.findOne({ email });
        if (isNullOrUndefined(existingUser)) {
            const hashedPwd = bcrypt.hashSync(password, SALT);
            const newUser = new User({ username, email, password: hashedPwd });
            await newUser.save();
            res.status(201).send({ success: "Signed up" });
        } else {
            res.status(400).send({
                err: `email ${email} already exists. Please choose another.`,
            });
        }
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (isNullOrUndefined(email) || isNullOrUndefined(password)) {
        res.status(400).send({
            message: 'Email or password should not be empty'
        });
    }
    const existingUser = await User.findOne({
        email,
    });

    if (isNullOrUndefined(existingUser)) {
        res.status(401).send({ err: "UserName does not exist." });
    } else {
        const hashedPwd = existingUser.password;
        if (bcrypt.compareSync(password, hashedPwd)) {
            res.status(200).send({ success: "Logged in" });
        } else {
            res.status(401).send({ err: "Password is incorrect." });
        }
    }
});
app.post('/pageNo', async (req, res) => {
    const newPage = req.body;
    const createnewContent = new Page(newPage);
    await createnewContent.save();
    res.status(201).send({ success: 'page added' });
    console.log(newPage);
});
app.post('/content', async (req, res) => {
    const newContent = req.body;
    const createnewContent = new Content(newContent);
    await createnewContent.save();
    res.status(201).send({ success: 'content added' });
    console.log(newContent);
});
app.get('/allContent', async (req, res) => {
    let contents = await Content.find();
    return res.status(200).send(contents);
})
app.post('/userContent', async (req, res) => {
    // const email = req.session.userEmail;
    // console.log('email from session: ', email);
    const newUserContent = req.body;

    if (isNullOrUndefined(newUserContent.contentId)) {
        res.status(400).send({ message: 'cannot be added' })
    } else {
        console.log('contentId', newUserContent.contentId)
        const contentExists = await UserContent.find({
            contentId: { $eq: newUserContent.contentId }
        });

        console.log("contentexists", contentExists);

        if (contentExists && contentExists.length === 0) {
            const createnewUserContent = new UserContent(newUserContent);
            createnewUserContent.userId = "me@gmail.com";
            createnewUserContent.isCompleted = true;
            await createnewUserContent.save();
            res.status(201).send({ success: 'UserContent added' });
            console.log(newUserContent);
        } else {
            res.status(200).send({ message: "content already exists" });
        }
    }
});

app.get('/usercontent', async (req, res) => {
    const userId ="me@gmail.com"
    let content = await UserContent.find({
        userId: { $eq: userId }
    });
    let finalResult = {
        userId: userId,
        items: []
    };
    if (content && content.length > 0) {
        for (const item of content) {
            console.log('item: ', item);
            const contentId = item.contentId;
            const data = await Content.findById({ _id: contentId });
            // if (!data) {
            //     // res.status(400).send()
            //     continue;
            // }
            console.log('data: ', data);
            finalResult.items.push(
                data,
            );
        }
        console.log('finalresult')
        return res.status(200).send(finalResult);
    } else {
        res.status(400).send();
    }


    // let usersContent = await UserContent.find();
    // return res.status(200).send(usersContent);
});
app.get('/user-list', async (req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
});
app.get('/session', (req, res) => {
    res.status(200).send({ session: req.session });
})
app.listen(9999);