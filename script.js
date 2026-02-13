// Function to get placement points based on your table
function getPlacementPoints(rank) {
    if(rank === 1) return 10;
    if(rank === 2) return 6;
    if(rank === 3) return 4;
    if(rank === 4) return 3;
    if(rank === 5) return 3;
    if(rank === 6) return 2;
    if(rank === 7) return 1;
    if(rank === 8) return 1;
    return 0; // rank 9+ gets 0 points
}

// Lobby Points Calculator
function calculateLobbyPoints() {
    const data = document.getElementById("lobbyData").value.trim().split("\n");
    lobbyPlayers = [];

    data.forEach(line => {
        const [player, killsStr, rankStr] = line.split(",");
        const kills = parseInt(killsStr);
        const rank = parseInt(rankStr);

        // Kill points = 1 per kill
        let killPoints = kills;

        // Placement points from table
        let placementPoints = getPlacementPoints(rank);

        let totalPoints = killPoints + placementPoints;

        lobbyPlayers.push({player, kills, rank, totalPoints});
    });

    // Sort players descending by total points
    lobbyPlayers.sort((a,b) => b.totalPoints - a.totalPoints);

    let output = "";
    lobbyPlayers.forEach((p,i) => {
        output += ${i+1}. ${p.player} - ${p.totalPoints} pts (Kills:${p.kills}, Rank:${p.rank}, Placement Points:${getPlacementPoints(p.rank)})\n;
    });

    document.getElementById("lobbyResults").innerText = output;
}
