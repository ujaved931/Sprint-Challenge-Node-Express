const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}





module.exports = router;
