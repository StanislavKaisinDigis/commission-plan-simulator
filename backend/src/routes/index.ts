import express from "express";
import { getAllProducts } from "./products";
import { getOrdersDyIdAndDate } from "./orders";
import { getAllStaff } from "./staff";
import { getAllCategories } from "./categies";

export const router = express.Router();

router.get("/products", getAllProducts);
router.get("/orders", getOrdersDyIdAndDate);
router.get("/staff", getAllStaff);
router.get("/categories", getAllCategories);
