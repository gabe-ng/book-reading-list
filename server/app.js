const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

// connect to mlab database
mongoose.connect(
  // your database here
  "",
  { useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}));

// set and run port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})