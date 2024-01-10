const ArtistModel = require('../models/artistModel');

const ArtistController = {
  listArtist: async (req, res) => {
    try {
      const artist = await ArtistModel.listArtist();
      return res.json(artist);
    } catch (error) {
      console.error('Error fetching Artists:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
updateArtist: async (req, res) => {
    const artistId = req.params.artistId;
    console.log(artistId);
    console.log(req.body);
    const updatedArtistData = req.body;

    try {
      const updatedArtist = await ArtistModel.updateArtist(artistId, updatedArtistData);
      return res.json(updatedArtist);
    } catch (error) {
      console.error('Error updating Artist:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getArtistById: async (req, res) => {
    const artistId = req.params.artistId;

    try {
      const artist = await ArtistModel.getArtistById(artistId);
      return res.json(artist);
    } catch (error) {
      console.error('Error fetching Artist by id:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteArtist: async (req, res) => {
    const artistId = req.params.artistId;

    try {
        const deletionResult = await ArtistModel.deleteArtist(artistId);
  
        if (deletionResult.success) {
          return res.status(200).json({ success: true, message: `Successfully deleted Artist with id ${artistId}` });
        } else {
          return res.status(404).json({ success: false, message: `No Artist found with id ${artistId}` });
        }
      } catch (error) {
        console.error('Error deleting Artist:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  },
};

module.exports = ArtistController;
