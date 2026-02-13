function calculatePoints() {
    let player = document.getElementById("player").value;
    let kills = parseInt(document.getElementById("kills").value);
    let rank = parseInt(document.getElementById("rank").value);

    if(!player || isNaN(kills) || isNaN(rank)){
        alert("Please enter valid data!");
        return;
    }

    let killPoints = kills * 1; // 1 point per kill
    let rankPoints = 0;

    if(rank == 1) rankPoints = 15;
    else if(rank == 2) rankPoints = 12;
    else if(rank == 3) rankPoints = 10;
    else if(rank <= 10) rankPoints = 5;
    else rankPoints = 0;

    let totalPoints = killPoints + rankPoints;

    document.getElementById("result").innerText = 
        player + " Total Points: " + totalPoints;
}
