# Pastee Simpler -- A simpler SIMPLER Paste.ee API module

Requirements:
* Node.js
* npm (Node.js package manager)

```bash
npm install pastee-simpler
```

## Example code:

pastee-simpler is made to be easier than the main module which is [npmjs.com/package/pastee](https://www.npmjs.com/package/pastee)

```javascript
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
```

# How do i get my paste.ee API Key?

- Firstly login to your account
- Verify your email first if you haven't
- Go to https://paste.ee/account/api/developer
- Type your application name in the "Application Name" inbox
- Click "Create"
- Underneath the "Developer Key" click to copy the developer API key and paste it in the code above ^

## Soon:

* Supporting more pastee style languages
* Fixing pastee expiry (currently doesn't work, default is 4 week.)