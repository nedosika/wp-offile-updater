import express from "express";
import {graphqlHTTP} from "express-graphql";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import schema from "./graphql/schema.js";
import CONFIG from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: CONFIG.CLIENT_URL
}));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

if (CONFIG.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(CONFIG.PORT, () => {
    console.log(`Server is starting on port ${CONFIG.PORT}`);
});
