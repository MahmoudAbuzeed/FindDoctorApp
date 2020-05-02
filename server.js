require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const schema = require('./schema/schema');
const isAuth = require('./middleware/is-auth');

const app = express();



app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });


  app.use(isAuth);
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


/*if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
*/


const PORT = process.env.PORT || 5000 ; 

app.listen(PORT, () =>{

    console.log(`Server run on port ${PORT}`);
}); 



mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology:true
}); 

mongoose.connection.on('connected', ( ) => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connected to the database: ${err}`);
});

module.exports = app;