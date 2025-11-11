const express = require('express');
const cors = require('cors');
const supplierRoutes = require('./routes/supplierRoutes');
const storeRoutes = require('./routes/storeRoutes');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const alertRoutes = require('./routes/alertRoutes');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/suppliers', supplierRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/alerts', alertRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('POS Backend Running');
});

module.exports = app;
