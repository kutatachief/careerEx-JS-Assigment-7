const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');
const itemRoutes = require('./routes/item'); // Import the item routes
const PORT = process.env.PORT || 8000;

// Middleware
// app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); // Middleware to parse JSON body

// Routes
app.use('/api/items', itemRoutes);


app.get('/', (request, respo) => {
  respo.send('Hello World from Express!');
})

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

