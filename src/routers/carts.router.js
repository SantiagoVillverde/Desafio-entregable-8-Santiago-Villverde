import { Router } from "express";
import cartManager from "../dao/dbmanagers/cart.manager.js";

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await cartManager.getCarts());
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    res.status(200).send(await cartManager.getCartById(req.params.cid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await cartManager.addCart(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    res
      .status(201)
      .send(await cartManager.updateCart(req.params.cid, req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    res.status(200).send(await cartManager.deleteAllProds(req.params.cid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(await cartManager.addProdtoCart(req.params.cid, req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(await cartManager.deleteProdfromCart(req.params.cid, req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(await cartManager.updateProdfromCart(req.params.cid, req.params.pid, req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default cartRouter;
