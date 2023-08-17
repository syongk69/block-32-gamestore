const express = require("express");
const router = express.Router();

const REPLACE_ME = "HELP REPLACE ME!!!!";

const {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} = require("../db/videoGames");

// GET - /api/video-games - get all video games
// Set up a route to handle GET request at "/"
router.get("/", async (req, res, next) => {
  try {
    // Call function to retrieve all video games
    const videoGames = await getAllVideoGames();
    // Send the retrieved video games as a response
    res.send(videoGames);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
// Set up a route to handle GET requests at "/:id" (by ID)
router.get("/:id", async (req, res, next) => {
  try {
    // Call function to retrieve a video game by it ID
    const videoGame = await getVideoGameById(req.params.id);
    // Send the retrieved video game as a response
    res.send(videoGame);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// POST - /api/video-games - create a new video game
// Set up a route to handle POST (create) requests at "/"
router.post("/", async (req, res, next) => {
  try {
    // Call function to create a new video game
    const videoGame = await createVideoGame(req.body);
    // Send the created video game as a response
    res.send(videoGame);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id
// Set up a route to handle PUT (update) requests at "/:id" (by ID)
router.put("/:id", async (req, res, next) => {
  try {
    // Call function to update a video game by its ID
    const videoGame = await updateVideoGame(req.params.id, req.body);
    // Send the updated video game as a response
    res.send(videoGame);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// DELETE - /api/video-games/:id - delete a single video game by id
// Set up a route to handle DELETE requests at "/:id" (by ID)
router.delete("/:id", async (req, res, next) => {
  try {
    // Call function to delete a video game by its ID
    const videoGame = await deleteVideoGame(req.params.id);
    // Send the deleted video game as a response
    res.send(videoGame);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

module.exports = router;
