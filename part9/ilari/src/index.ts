import express from 'express';
import diaryRouter from './routes/diariesRouter';

const app = express();
app.use(express.json());
app.set('json spaces', 40);

const PORT = 3000;

app.use('/api/diaries', diaryRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});