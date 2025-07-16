const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const query = {
      text: `
        SELECT n.* FROM notes n
        LEFT JOIN collaborations c ON c.note_id = n.id
        WHERE n.owner = $1 or c.user_id = $1
        GROUP BY n.id
      `,
      values: [userId],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = NotesService;
