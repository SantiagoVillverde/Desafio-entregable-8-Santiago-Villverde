import { Router } from "express";
import messageManager from "../dao/dbmanagers/message.manager.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await messageManager.getMessages());
  } catch (err) {
    res.status(400).send(err);
  }
});

messageRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await messageManager.addMessage(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

messageRouter.delete("/:mid", async (req, res) => {
  try {
    res.status(200).send(await messageManager.deleteMessage(req.params.mid));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default messageRouter;
