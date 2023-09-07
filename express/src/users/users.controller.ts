import { Router } from "express";
import passport from "passport";
import { getUser, getUsers, updateUser } from "./users.service";

const router = Router();

router.get("/", passport.authenticate("jwt", { session : false }), async (req, res) => {
  const users = await getUsers();

  res.json(users);
});

router.get("/:slug", passport.authenticate("jwt", { session : false }), async (req, res) => {
  const { slug } = req.params;
console.log(slug)
  const user = await getUser(slug);
console.log(user)
  res.json(user);
});

router.put("/update/:slug", passport.authenticate("jwt", { session : false }), async (req, res) => {
  const { slug } = req.params;

  const user = await updateUser(slug, req.body);

  res.json(user);
});

export default router;
