const express = require('express');
const router = express.Router();
const ArtistController = require('../controllers/artistController');

const authenticateToken = require('../auth/validateJWTmiddlewear');
router.use(authenticateToken);

router.get('/', ArtistController.listArtist);
router.put('/:artistId', ArtistController.updateArtist);
router.get('/:artistId', ArtistController.getArtistById);
router.delete('/:artistId', ArtistController.deleteArtist);

// router.get('/users', authenticate, ArtistController.listUsers);

module.exports = router;
