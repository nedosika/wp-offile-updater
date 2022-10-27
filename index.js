import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./graphql/schema.js";

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => console.log('Server started on 4000'))