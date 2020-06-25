const username=document.getElementById("username");
const saveScoreBtn=document.getElementById("SaveBtn");
const mostrecentscore=localStorage.getItem("MostRecentScore");
const finalscore=document.getElementById("finalscore");
finalscore.innerText=mostrecentscore

const highscore=JSON.parse(localStorage.getItem("highscore")) || [];

const MAX_HIGH_SCORES=5;

finalscore.innerText=mostrecentscore;

username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled=!username.value;
});

saveHighScore= e =>{
    e.preventDefault();
    const score={
        score:mostrecentscore,
        name:username.value
    };
    highscore.push(score);

    //sorting highscore array in descending order with new method
    highscore.sort((a,b)=> b.score - a.score);

    //splice out the scores after top 5 score
    highscore.splice(5);
    localStorage.setItem("highscore",JSON.stringify(highscore));
    window.location.assign("index.html");
    
    
};