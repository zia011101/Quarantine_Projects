const highscoreList=document.getElementById("finalscoreList");
const highscore=JSON.parse(localStorage.getItem("highscore")) || [];

highscoreList.innerHTML = highscore
.map(score =>{
    return ("<li class='high-score'>"+score.name+" : "+score.score+"</li>");
})
.join("");