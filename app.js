const express = require('express');
var { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require('./schema/schema')


app.use('/graphql',graphqlHTTP({
    schema,graphiql:true

}))
app.listen(4000,()=>{

    console.log('started 4000 port');
})