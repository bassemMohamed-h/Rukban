import dotenv       from 'dotenv';
import http         from 'http'
import app          from './app.js';
import connectDB    from './config/db.js';
import createAdmin from './utils/createAdmin.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB()
.then(() => {
    const server = http.createServer(app);
    server.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
    createAdmin();
})
.catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
});