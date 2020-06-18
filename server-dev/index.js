import mongoose from 'mongoose';
import app from './app';
import { MONGO_URI, PORT, API_NAME } from './config';

const runServer = () => app.listen(PORT, () => console.log(`${API_NAME}: API running on port ${PORT}`));

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(runServer)
    .catch(console.log);