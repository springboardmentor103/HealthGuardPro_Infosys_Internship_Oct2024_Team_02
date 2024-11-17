const express = require('express');
const app = express();

// Basic middleware for parsing JSON
app.use(express.json());

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
