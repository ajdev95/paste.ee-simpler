const { Pastee, PasteeStyle, PasteeExpiry } = require('pastee-simpler');

const paste = new Pastee('Your API Key'); // Get it by going to https://paste.ee/account/api

paste.submit({
  name: 'Example Paste',
  description: 'This is a sample paste',
  pastelanguage: PasteeStyle.JavaScript,
  pasteexpiry: PasteeExpiry.Never, // Doesn't work ATM.
  content: 'console.log("Hello, Pastee!");'
}).then(response => {
  console.log('Paste created:', response); // The whole json response
  
  const getURL = response.PasteeURL; // Retrive the Paste.ee URL only
  const getID = response.PasteeID; // Retrive the Paste.ee ID only
  const getStatus = response.Success; // Retrive the Paste.ee response status (Success)

  console.log('Get Status:', getStatus);
  console.log('Paste URL:', getURL);
  console.log('Paste ID:', getID);

  // Example response

  /*
  Paste created: {
    Success: true,
    PasteeID: '7pXsV',
    PasteeURL: 'https://paste.ee/p/7pXsV'
  }
  
  Get Status: true
  Paste URL: https://paste.ee/p/7pXsV
  Paste ID: 7pXsV
  */
}).catch(error => {
  console.error("Failed to create paste:", error);
});