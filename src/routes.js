import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./apps/controllers/UserController";
import SessionControler from "./apps/controllers/SessionControler";
import ProductController from "./apps/controllers/ProductController";
import CategoryController from "./apps/controllers/CategoryController";
import OrderController from "./apps/controllers/OrderController";

import authMiddleware from "./apps/middlewares/auth";

const upload = multer(multerConfig);

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/sessions", SessionControler.store);

routes.use(authMiddleware);

routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.get("/orders", OrderController.index);

export default routes;
