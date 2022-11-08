import express from "express";
import cors from "cors";
//import routes
import userRouter from "./routes/user.routes.js";
import gameRouter from "./routes/game.routes.js";
import teamRouter from "./routes/team.route.js";
import stadiumRouter from "./routes/stadium.routes.js"

const app = express();

//Settings
app.set("port", 4200);

//middlewares
app.use(express.json());//Pases incoming JSON requests and puts it in req
app.use(cors());

app.options("/user/findUser", cors());


//routes
app.use("/user", userRouter);
app.use("/game", gameRouter);
app.use("/team", teamRouter);
app.use("/stadium", stadiumRouter);

export default app;