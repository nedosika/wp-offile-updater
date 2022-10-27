import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./graphql/schema.js";
import cors from "cors";
import * as path from "path";
import config from "./config.js";

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

if (config.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(4000, () => console.log('Server started on 4000'));
