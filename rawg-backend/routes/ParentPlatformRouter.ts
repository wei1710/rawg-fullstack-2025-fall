import { Router } from "express";
import { AppDataSource } from "../data-source";
import { ParentPlatform } from "../entities/ParentPlatform";

interface Response {
  count: number;
  results: ParentPlatform[];
}

const parentPlatformRouter = Router();

const parentPlatformRepository = AppDataSource.getRepository(ParentPlatform);

//GET all parent platform

parentPlatformRouter.get("/", async (req, res) => {
  try {
    const parentPlatform = await parentPlatformRepository.find();
    const response: Response = {
      count: parentPlatform.length,
      results: parentPlatform,
    };
    res.send(response);
  } catch (error) {
    console.error("Error fetching parent platform:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});