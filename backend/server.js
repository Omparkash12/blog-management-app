const express = require('express');
const path = require('path');
require('dotenv').config();
const syncDB = require('./models/sync');
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 8081;
const app = express();

// Add this line to serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

app.use('/api', blogRoutes);



// Sync the database and start the server
syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync the database:', err.message);
  process.exit(1);  // Exit the process if syncing fails
});
