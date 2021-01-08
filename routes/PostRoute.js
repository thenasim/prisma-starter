const router = require("express").Router();

router.post("/", async (req, res) => {
  const prisma = req.prisma;
  const { title, body, userUuid } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, body, user: { connect: { uuid: userUuid } } },
    });
    return res.json(post);
  } catch (err) {
    res.status(500).send({ error: `Something went wrong ${err.message}` });
  }
});

router.get("/", async (req, res) => {
  const prisma = req.prisma;
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).send({ error: `Something went wrong ${err.message}` });
  }
});

module.exports = router;
