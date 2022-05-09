// use "import" to import libraries
import express from 'express';
import * as timeSheetsControllers from'./resources/time-sheets';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const timeSheets = require('./data/time-sheets.json');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.get('/admins', (req, res) => {
    res.status(200).json({
        data: admins,
    });
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${port}`);
});

/* TimeSheet */

// use "require" to import JSON files

app.get('/timeSheet/:id', timeSheetsControllers.gettimeSheetById);

