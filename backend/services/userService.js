const axios = require('axios');
const db = require('../db');

async function fetchAndInsertUsers(limit = 1000) {
  let totalInserted = 0;

  for (let page = 1; totalInserted < limit; page++) {
    const response = await axios.get(`https://randomuser.me/api/?results=20&page=${page}`);
    const users = response.data.results;

    const insertPromises = users.map(user => {
      const uuid = user.login.uuid;
      const name = `${user.name.first} ${user.name.last}`;
      const email = user.email;
      const city = user.location.city;

      return new Promise((resolve, reject) => {
        const sql = 'INSERT IGNORE INTO users (uuid, name, email, city) VALUES (?, ?, ?, ?)';
        db.query(sql, [uuid, name, email, city], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    });

    const results = await Promise.all(insertPromises);
    totalInserted += results.length;
  }

  return totalInserted;
}

module.exports = { fetchAndInsertUsers };
