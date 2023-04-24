let express       = require("express");
let partials      = require("express-partials");
let errorHandler  = require("express-error-handler");
let path          = require("path");
let http          = require("http");
let morgan        = require(`${__dirname}/resources/model/morgan`);
let parser        = require(`${__dirname}/resources/model/parser`);
let session       = require(`${__dirname}/resources/model/session`);
let cors          = require(`${__dirname}/resources/model/cors`);
let minify        = require(`${__dirname}/resources/model/minify`);
let strExtension  = require(`${__dirname}/resources/model/extension/string`);
let numExtension  = require(`${__dirname}/resources/model/extension/number`);

let app = express();

app.set("view engine", "ejs");
app.set("views", path.join("/", `${__dirname}/resources/view`));
app.use(partials());
app.use(parser.json);
app.use(parser.body);
app.use(parser.cookie);
app.use(session);
app.use(cors);
app.use(morgan);
app.use(minify);
app.use("/", express.static(`${__dirname}/public`));
app.use("/", require(`${__dirname}/routes/map.ts`));

http.createServer(app).listen(process.env.PORT, () => console.log("成功: 已建立HTTP"));