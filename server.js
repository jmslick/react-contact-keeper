const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

app.get('/', (req, res) => res.json({ msg: 'Contact keeper api' }));

// ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
