const client = require("./client");
const util = require("util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
// An asynchronous function that interacts with the database
async function getAllVideoGames() {
  try {
    // Execute a query to retrieve all video games from the database then extract the rows (video games) from the result
    const { rows: videoGames } = await client.query(`SELECT * FROM videoGames`);
    // Return the retrieved video games
    return videoGames;
  } catch (error) {
    // Throw an error indicating the placeholder (REPLACE_ME) needs to be replaced
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `

            INSERT INTO videogames(name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [name, description, price, inStock, isPopular, imgUrl]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            UPDATE videogames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      Object.values(fields)
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            DELETE FROM videogames
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
