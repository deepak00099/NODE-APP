const express = require('express');  // Import Express
const app = express();  // Create an Express app
const port = 3000;  // Define the port to listen on

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
