const db = require('../config/database'); 
const ArtistModel = {   
    listArtist: async () => {
        try {
          
          const [rows] = await db.promise().query('SELECT * FROM artist');
    
          // Flattening the array and handling the buffer conversion
          const formattedRows = rows.map(row => {
            const formattedRow = { ...row };
            Object.keys(formattedRow).forEach(key => {
              if (Buffer.isBuffer(formattedRow[key])) {
                formattedRow[key] = formattedRow[key].toString();
              }
            });
            return formattedRow;
          });
    
          return formattedRows;
        } catch (error) {
          throw error;
        }
      },

      updateArtist: async (artistId, updatedArtistData) => {
        try {
          await db.promise().query('UPDATE artist SET ? WHERE id = ?', [updatedArtistData, artistId]);

          const [updatedArtistRows] = await db.promise().query('SELECT * FROM artist WHERE id = ?', artistId);
          const updatedArtist = updatedArtistRows[0];
    
          return updatedArtist;
        } catch (error) {
          throw error;
        }
      },

  deleteArtist: async (artistId) => {
    try {
      
      const [result] = await db.promise().query('DELETE FROM artist WHERE id = ?', artistId);
      console.log(result);
      const affectedRows = result.affectedRows;
      if (affectedRows > 0) {
        console.log(`Successfully deleted ${affectedRows} record(s) with id ${artistId}`);
        return { success: true }; 
      } else {
        console.log(`No record found with id ${artistId}`);
        return { success: false }; 
      }

    } catch (error) {
      throw error;
    }
  },

  getArtistById: async (artistId) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM artist WHERE id = ?', artistId);
      const artist = rows[0];
      return artist;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ArtistModel;
