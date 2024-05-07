// Backend (Node.js)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

let currentBoard = Array(9).fill('');

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (squares.every(square => square !== '')) {
        return 'draw';
    }
    return null;
};

app.get('/api/board', (req, res) => {
    res.json({ board: currentBoard, winner: calculateWinner(currentBoard) });
});

app.post('/api/move', (req, res) => {
    try {
        const { squares } = req.body;
        currentBoard = squares;
        const winner = calculateWinner(currentBoard);
        const response = { board: currentBoard, winner: winner };
        res.json(response);
    } catch (error) {
        console.error('Error processing move:', error);
        res.status(400).json({ error: 'Invalid request body' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
