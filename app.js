const { PrismaClient } = require("@prisma/client");
const express = require("express");
const UserRouter = require("./routes/UserRoute");
const PostRouter = require("./routes/PostRoute");
const prisma = new PrismaClient({
  log: ["query"],
});

const app = express();
app.use(express.json());
app.use((req, _, next) => {
  req.prisma = prisma;
  next();
});

app.use("/users", UserRouter);
app.use("/posts", PostRouter);

app.listen(3030, () => console.log(`http://localhost:${3030}`));
