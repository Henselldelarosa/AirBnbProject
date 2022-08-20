const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');
const router = express.Router();


module.exports = router;
