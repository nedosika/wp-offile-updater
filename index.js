import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./graphql/schema.js";
import cors from "cors";
import path from "path";
import config from "./config.js";
import { fileURLToPath } from 'url';

const PORT = config.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
