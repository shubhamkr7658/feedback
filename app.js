const connection = require('./config/db');
connection();
require('dotenv').config(); 
const express = require('express');
const app = express();


const usermodel = require('./model/user');

app.set('view engine', 'ejs');
app.set('views', 'view'); // or rename folder to 'views'

app.use(express.urlencoded({ extended: true }));
app.get('/message', (req, res) => {
    res.send(`
        <h2>Server running...</h2>
        <meta http-equiv="refresh" content="2;url=/" />
    `);
});

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/feedback', async (req, res) => {
    try {
        const { name, email, rating, comments } = req.body;

        await usermodel.create({
            name,
            gmail: email,      // map correctly
            rating: Number(rating),
            feedback: comments
        });

        res.send('FEEDBACK RECEIVED');
    } catch (err) {
        console.log(err);
        res.send('data not sent');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
