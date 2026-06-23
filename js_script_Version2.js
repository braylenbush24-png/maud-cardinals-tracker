// Player data
const players = [
    { name: 'Ty Aldridge', position: 'Guard', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Cordell Degroat', position: 'Guard', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Ryker Bailey', position: 'Guard', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Connor Puteet', position: 'Post', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Parker Sidwell', position: 'Guard', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Noah Howerton', position: 'Guard', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Andrew Roberts', position: 'Guard', ppg: 0.0, rpg: 0.0, apg: 0.0 },
    { name: 'Rylan Thomas', position: 'Post', ppg: 0.0, rpg: 0.0, apg: 0.0 }
];

// Team stats
let teamStats = {
    wins: 0,
    losses: 0,
    ppg: 0.0,
    pag: 0.0
};

// Games array
let games = [];

// Load data from localStorage when page loads
window.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    displayPlayers();
    displayTeamStats();
    displayGames();
});

// Display players
function displayPlayers() {
    const rosterContainer = document.getElementById('roster-container');
    rosterContainer.innerHTML = '';

    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <h3>${player.name}</h3>
            <p class="player-position">${player.position}</p>
            <div class="player-stats">
                <div class="stat">
                    <div class="stat-label">PPG</div>
                    <div class="stat-value">${player.ppg.toFixed(1)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">RPG</div>
                    <div class="stat-value">${player.rpg.toFixed(1)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">APG</div>
                    <div class="stat-value">${player.apg.toFixed(1)}</div>
                </div>
            </div>
        `;
        rosterContainer.appendChild(playerCard);
    });
}

// Display team stats
function displayTeamStats() {
    document.getElementById('wins').textContent = teamStats.wins;
    document.getElementById('losses').textContent = teamStats.losses;
    document.getElementById('team-ppg').textContent = teamStats.ppg.toFixed(1);
    document.getElementById('team-pag').textContent = teamStats.pag.toFixed(1);
}

// Display games
function displayGames() {
    const opponentTbody = document.getElementById('opponent-tbody');
    opponentTbody.innerHTML = '';

    if (games.length === 0) {
        opponentTbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No games played yet</td></tr>';
        return;
    }

    games.forEach(game => {
        const row = document.createElement('tr');
        const result = game.cardinalScore > game.opponentScore ? 'W' : 'L';
        const resultColor = result === 'W' ? '#00a000' : '#c41e3a';
        
        row.innerHTML = `
            <td>${game.opponent}</td>
            <td style="color: ${resultColor}; font-weight: bold;">${result}</td>
            <td>${game.cardinalScore} - ${game.opponentScore}</td>
        `;
        opponentTbody.appendChild(row);
    });
}

// Add game form handler
document.getElementById('add-game-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const opponentName = document.getElementById('opponent-name').value;
    const cardinalScore = parseInt(document.getElementById('cardinals-score').value);
    const opponentScore = parseInt(document.getElementById('opponent-score').value);

    // Add game
    const game = {
        opponent: opponentName,
        cardinalScore: cardinalScore,
        opponentScore: opponentScore
    };

    games.push(game);

    // Update wins/losses
    if (cardinalScore > opponentScore) {
        teamStats.wins++;
    } else {
        teamStats.losses++;
    }

    // Update team stats (simplified - you can enhance this)
    updateTeamStats();

    // Save to localStorage
    saveDataToStorage();

    // Reset form
    document.getElementById('add-game-form').reset();

    // Refresh display
    displayTeamStats();
    displayGames();
});

// Update team stats based on games
function updateTeamStats() {
    if (games.length === 0) {
        teamStats.ppg = 0.0;
        teamStats.pag = 0.0;
        return;
    }

    const totalCardinalPoints = games.reduce((sum, game) => sum + game.cardinalScore, 0);
    const totalOpponentPoints = games.reduce((sum, game) => sum + game.opponentScore, 0);

    teamStats.ppg = (totalCardinalPoints / games.length).toFixed(1);
    teamStats.pag = (totalOpponentPoints / games.length).toFixed(1);
}

// Save data to localStorage
function saveDataToStorage() {
    localStorage.setItem('teamStats', JSON.stringify(teamStats));
    localStorage.setItem('games', JSON.stringify(games));
}

// Load data from localStorage
function loadDataFromStorage() {
    const savedTeamStats = localStorage.getItem('teamStats');
    const savedGames = localStorage.getItem('games');

    if (savedTeamStats) {
        teamStats = JSON.parse(savedTeamStats);
    }

    if (savedGames) {
        games = JSON.parse(savedGames);
    }
}