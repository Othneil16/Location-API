// controllers/locationController.js
const LocationModel = require('../models/locationModel');
const NodeGeocoder = require('node-geocoder');
// console.log(NodeGeocoder);
// Configure node-geocoder with your preferred provider (e.g., OpenCage, Google Maps)
const options = {
    provider: {
      name: 'openCage',
      apiKey: 'e9aa532297c044b98885b3a8bc14bfc0', // Replace with your actual OpenCage API key
      formatter: null,
    },
  };
  

const geocoder = NodeGeocoder(options);

// Controller function to handle saving location
exports.saveLocation = async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
    // Validate the data if needed
    const newlat = Number(latitude)
    const newlon = Number(longitude)
      if(!newlat || !newlon){
        return res.status(400).json({
            message:`Number data type require`
        })
      }

    // Create a new LocationModel instance
    const location = new LocationModel({ latitude:newlat, 
    longitude:newlon
});
    
    if(!location){
      return res.status(400).json({
        message:"couldn't create"
      })
    }
    console.log(`created`);
    console.log(geocoder);
    // Use geocoder to get the address from coordinates
    const geocodeResult = await geocoder.reverse({ lat: latitude, 
    lon: longitude
 });
 console.log('Geocoding result:', geocodeResult);

    // Save the obtained address along with the location to the database
    location.address = geocodeResult[0].formattedAddress;
    console.log(location.address);
     
    // Save the location to the database
    await location.save();

    // Respond with a success message
    res.status(200).json({
         message: 'Location saved successfully', address: location.address
         });
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(500).json({ message: err.message });
    console.error('Geocoding error:', err.message);
  }
};
