// phimupdate.js
const Phim = require('../../models/movie/phim');  // Ensure you have the correct path for the Phim model


async function updateMovieStatus() {
  const currentDate = new Date();
  try {
    // Find all movies (or filter by specific criteria)
    const movies = await Phim.find({});

    movies.forEach(async (phim) => {
      if (!phim) {
        console.log(`Movie not found.`);
        return;
      }

      // Update the movie status based on the current date
      if (currentDate < phim.ngayhieuluc || currentDate > phim.ngayhieuluc) {
        phim.trangthai = '1'; 
      } else if (currentDate >= phim.ngayhieuluc && currentDate <= phim.ngayhieulucden) {
        phim.trangthai = '0'; 
      } else if (currentDate > phim.ngayhieulucden) {
        phim.trangthai = '2'; 
      }


      await phim.save();
      console.log(`Movie status updated for: ${phim.title}`);
    });
  } catch (err) {
    console.error('Error updating movie statuses:', err);
  }
}

// Export the function to be used in app.js
module.exports = {
  updateMovieStatus,
};
