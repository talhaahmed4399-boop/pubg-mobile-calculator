let lobbyPlayers = [];
let topRecords = [];

function showSection(id) {
  document.querySelectorAll("section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";
}

function getPlacementPoints(rank) {
  if(rank===1) return 10;
  if(rank===2) return 6;
  if(rank===3) return 4;
  if(rank===4) return 3;
  if(rank===5) return 3;
  if(rank===6) return 2;
  if(rank===7) return 1;
  if(rank===8) return 1;
  return 0;
}

function calculateLobbyPoints() {
  const data = document.getElementById("lobbyData").value.trim().split("\n");
  lobbyPlayers = [];

  data.forEach(line=>{
    const [player,killsStr,rankStr] = line.split(",");
    const kills=parseInt(killsStr);
    const rank=parseInt(rankStr);
    const placementPoints = getPlacementPoints(rank);
    const totalPoints = kills + placementPoints;
    lobbyPlayers.push({player,kills,rank,totalPoints});
  });

  lobbyPlayers.sort((a,b)=>b.totalPoints - a.totalPoints);

  let output="";
  lobbyPlayers.forEach((p,i)=>{
    output+=${i+1}. ${p.player} - ${p.totalPoints} pts (Kills:${p.kills}, Rank:${p.rank}, Placement:${getPlacementPoints(p.rank)})\n;
  });

  // Save to localStorage for history
  topRecords.push(...lobbyPlayers);
  localStorage.setItem("PUBGRecords", JSON.stringify(topRecords));

  document.getElementById("lobbyResults").innerText = output;
}

function generateShortlist(){
  const list=document.getElementById("shortlistResults");
  list.innerHTML="";
  lobbyPlayers.slice(0,5).forEach(p=>{
    const li=document.createElement("li");
    li.textContent=${p.player} - ${p.totalPoints} pts;
    list.appendChild(li);
  });
}

function generateTeamPoster(){
  const canvas=document.getElementById("posterCanvas");
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#111"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#ff4500"; ctx.font="30px Arial";
  const team=document.getElementById("teamName").value || "Team";
  ctx.fillText(Team: ${team},20,50);
  ctx.font="20px Arial";
  lobbyPlayers.slice(0,5).forEach((p,i)=>ctx.fillText(${i+1}. ${p.player} - ${p.totalPoints} pts,20,100+i*30));
}

function generateWarheads(){
  const list=document.getElementById("warheadsResults");
  list.innerHTML="";
  [...lobbyPlayers].sort((a,b)=>b.kills - a.kills).slice(0,5).forEach(p=>{
    const li=document.createElement("li");
    li.textContent=${p.player} - ${p.kills} Kills;
    list.appendChild(li);
  });
}

function showTopRecords(){
  const list=document.getElementById("recordsResults");
  list.innerHTML="";
  const stored=JSON.parse(localStorage.getItem("PUBGRecords")) || [];
  stored.sort((a,b)=>b.totalPoints - a.totalPoints);
  stored.slice(0,10).forEach(p=>{
    const li=document.createElement("li");
    li.textContent=${p.player} - ${p.totalPoints} pts;
    list.appendChild(li);
  });
}
