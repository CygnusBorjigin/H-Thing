// import frameworks
const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const path = require('path');
const cors = require('cors');

app.use(cors());

// Make sure the server is runing
app.get('/', (req, res) => {
	res.send('The server is working');
});

// Connect the server to the database
connectDB();

app.use(express.json());

// connect to the top level
app.use('/api/auth', require('./routes/api/auth/gateway.js'));
app.use('/api/project', require('./routes/api/project/gateway.js'));
app.use('/api/user', require('./routes/api/user/gateway.js'));

// initialize and start the server
const PORT = 8000;
app.listen(PORT, () => console.log('Server is started on port 8000'));
 
