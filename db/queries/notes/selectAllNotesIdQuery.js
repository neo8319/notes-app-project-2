const getDB = require('../../getDB');

const selectAllNotesIdQuery = async (notesId, userId = 0) => {
  let connection;
  try {
    connection = await getDB();

    const [notes] = await connection.query(
      `
        SELECT
            E.id,
            E.title,
            E.text,
            E.categoryId,
            U.username,
            E.userId = ? AS owner,
            E.createdAt

            FROM notes E INNER JOIN users U ON U.id= E.userId
            
            ORDER BY E.createdAt DESC

        `,
      [userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    return notes;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNotesQuery;
