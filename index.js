const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;

// const bodyParser = require('body-parser');

app.get('/', (request, respo) => {
  respo.send('Hello World from Express!');
})
  
  app.use(express.json()); // Middleware to parse JSON body

const MONGODB_URI = 'mongodb+srv://kutata:honeys@cluster0.zwost0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})

.catch((err) => {
  console.error('MongoDB connection error:', err);
});

