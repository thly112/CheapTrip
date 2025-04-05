const express = require('express');
const app = express();
const PORT = 5000;

// Middleware để xử lý JSON
app.use(express.json());

// Route đơn giản
app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

// Chạy server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
