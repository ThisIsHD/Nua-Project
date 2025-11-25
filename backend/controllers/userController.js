const db = require('../db');
const { fetchAndInsertUsers } = require('../services/userService');

async function fetchUsers(req, res) {
  try {
    const inserted = await fetchAndInsertUsers();
    res.json({ message: `Inserted ${inserted} users successfully!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch or insert users' });
  }
}

function getAllUsers(req, res) {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
}

function updateUser(req, res) {
  const { uuid } = req.params;
  const { name, email, city } = req.body;

  const sql = 'UPDATE users SET name=?, email=?, city=? WHERE uuid=?';
  db.query(sql, [name, email, city, uuid], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated successfully!' });
  });
}

module.exports = { fetchUsers, getAllUsers, updateUser };
