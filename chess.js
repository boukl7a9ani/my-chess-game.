let board;
let game;
let playerColor = 'white';

function showStudentOptions() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('game-options').style.display = 'block';
}

function startChessLevel(level) {
    document.getElementById('game-options').style.display = 'none';
    document.getElementById('chessboard-container').style.display = 'block';
    startNewGame(level);
}

function startNewGame(level) {
    game = new Chess();
    board = Chessboard('chessboard', {
        draggable: true,
        dropOffBoard: 'snapback',
        onDrop: handleMove,
        orientation: playerColor
    });

    if (level !== 'beginner') {
        playAI();
    }
}

function playScenario() {
    // Load a specific scenario position.
    const scenarioPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    game = new Chess(scenarioPosition);
    board.position(game.fen());
}

function playAgainstAI() {
    document.getElementById('game-options').style.display = 'none';
    document.getElementById('chessboard-container').style.display = 'block';
    game = new Chess();
    board = Chessboard('chessboard', {
        draggable: true,
        dropOffBoard: 'snapback',
        onDrop: handleMove
    });

    playAI();
}

function handleMove(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to a queen for simplicity.
    });

    if (move === null) return 'snapback';

    // Play AI move if applicable.
    if (!game.game_over()) {
        window.setTimeout(playAI, 250);
    }
}

function playAI() {
    const moves = game.ugly_moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.ugly_move(move);
    board.position(game.fen());
}

function endGame() {
    document.getElementById('chessboard-container').style.display = 'none';
    document.getElementById('game-options').style.display = 'block';
}

function updateLeaderboard(username, points) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, points });
    leaderboard.sort((a, b) => b.points - a.points);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.forEach(player => {
        console.log(`${player.username}: ${player.points} points`);
    });
}
