const client = require("./client");
const util = require("util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
// An asynchronous function that interacts with the video games database
async function getAllVideoGames() {
  try {
    // Execute a query to retrieve all video games from the database then extract the rows (video games) from the result
    const { rows: videoGames } = await client.query(`SELECT * FROM videoGames`);
    // Return the retrieved result
    return videoGames;
  } catch (error) {
    // Throw an error message indicating the placeholder (REPLACE_ME) needs to be replaced
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
// An asynchronous function that interacts with the video games database by ID
async function getVideoGameById(id) {
  try {
    // Execute a query to retrieve video games from the database then extract the rows (video games) from the result by ID
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
    throw error;
  }
}

// POST - /api/video-games - create a new video game
// An asynchronous function that interacts with the video games database by BODY
async function createVideoGame(body) {
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  try {
    // Execute a query to create a new video game to the database by rows (video games) by name, description, price, inStock, isPopular, and imgUrl
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
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
// An asynchronous function that interacts with the video games database by ID
async function updateVideoGame(id, fields = {}) {
  // fucntion that loop through each key in the 'fields' object then append the constructed string to the 'setString'
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // Check if the 'setString' is empty
  if (setString.length === 0) {
    // IF 'setString' is empty, return from the function
    return;
  }
  try {
    // Execute a query to update a video game to the database by rows (video games) by ID with 'setString'
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
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
// An asynchronous function that interacts with the video games database by ID
async function deleteVideoGame(id) {
  try {
    // Execute a query to delete a video game to the database by rows (video games) by ID
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
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
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
