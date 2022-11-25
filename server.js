import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import route from "./routes/routes.js";
// import flash from 'connect-flash';

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGODB_URI } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name : 'simple',
  secret : 'simple',
  resave :true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  cookie : { maxAge : 180 * 60 * 1000 } // on détermine la durée de vie de la session
}));

// ==========
// App routers
// ==========

app.use("/", route);


// ==========
// App start
// ==========
mongoose.connect(MONGODB_URI).then(() => {
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
});