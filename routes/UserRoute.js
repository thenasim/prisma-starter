const router = require("express").Router();

router.post("/", async (req, res) => {
  const prisma = req.prisma;
  const { name, email, role } = req.body;

  try {
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) throw new Error("Email already exists");
    const user = await prisma.user.create({
      data: { name, email, role },
    });
    return res.json(user);
  } catch (err) {
    res.status(500).send({ error: `Something went wrong ${err.message}` });
  }
});

router.get("/", async (req, res) => {
  const prisma = req.prisma;
  try {
    const users = await prisma.user.findMany({
      select: {
        uuid: true,
        name: true,
        role: true,
        posts: {
          select: {
            title: true,
            body: true,
          },
        },
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).send({ error: `Something went wrong ${err.message}` });
  }
});

router.put("/:uuid", async (req, res) => {
  const prisma = req.prisma;
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;

  try {
    let user = await prisma.user.findUnique({ where: { uuid } });
    if (!user) throw new Error("User didn't exists");
    user = await prisma.user.update({
      where: { uuid },
      data: { name, email, role },
    });
    return res.json(user);
  } catch (err) {
    res.status(500).send({ error: `Something went wrong ${err.message}` });
  }
});

router.delete("/:uuid", async (req, res) => {
  const prisma = req.prisma;
  const uuid = req.params.uuid;
  try {
    await prisma.user.delete({ where: { uuid } });
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json({ error: `user can't be deleted` });
  }
});

module.exports = router;
