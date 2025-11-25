const express = require('express');
const router = express.Router();
const { fetchUsers, getAllUsers, updateUser } = require('../controllers/userController');

router.post('/fetch', fetchUsers);
router.get('/', getAllUsers);
router.put('/:uuid', updateUser);

module.exports = router;
