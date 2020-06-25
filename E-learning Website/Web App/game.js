const Question =document.getElementById("queID");
const choice = Array.from(document.getElementsByClassName("choice-text"));
const ProgText=document.getElementById("ProgressText");
const ScoreText=document.getElementById("Score");
const ProgBar=document.getElementById("progressBarFull");

let currentQue={};
let acceptAns=true;

let score=0;
let QueCounter=0;
let availabelQue=[];
let questions=[]
getRandomInt=(min,max)=>
{
  return Math.floor(Math.random()*(max-min+1))+min;
};
QueGen=(questions)=>{
	var a = getRandomInt(100,9999),atemp=a; 
	var t=atemp.toString().length;
	var arr=[];
	var temp,tmp,dig_place,res;
	if  (t==3){
        arr[0]="#";
		for (var i =t;i>0;i--){
		 	arr[i]=atemp%10;
		 	atemp=Math.trunc(atemp/10);
		}
	}else{
		for (var i =t;i>0;i--){
		 	arr[i-1]=atemp%10;
		 	atemp=Math.trunc(atemp/10);
		}
	}
	if (t==4){
		tmp=getRandomInt(0,t-1);
	}else{
		tmp=getRandomInt(1,t-1);
	}

	var Q=arr[tmp];
	dig_place=["Thousand","Hundred","Ten","Unit"];
    var Que="What is the digit place of "+"<span style='color:blue'>"+Q+"</span>"+" in ";                     
    var n;                                                                                                                                                                                                                              
    if(t==3){ n=1;}
    else{ n=0;}
    for(var j=n;j<=3;j++){ 
        if(j==tmp){
        Que+="<span style='color:blue'>"+arr[j]+"</span>";
        }
        else{
        Que+=arr[j];
        }
    }
    Que+=" ?";
    res=dig_place[tmp];
    var obj={
        question:Que,
        choice1:dig_place[0],
        choice2:dig_place[1],
        choice3:dig_place[2],
        choice4:dig_place[3],
        answer:''+(tmp+1),
    };
    questions.push(obj);
};
for (let index = 0; index < 5 ;index++) {
    QueGen(questions);
};
const CORRECT_BONUS=10;
const MAX_QUESTIONS=questions.length;

startgame=()=>{
    queCount=0;
    score=0;
    availabelQue=[...questions];
    getNewQue();
};

getNewQue= () =>{
    if (availabelQue.length==0 || QueCounter>=MAX_QUESTIONS){
        //Store score in local storage
        localStorage.setItem("MostRecentScore",score)
        //Go to Score Page
        return window.location.assign("end.html");
    }
    QueCounter++;

    ProgText.innerHTML="Question "+QueCounter+"/"+MAX_QUESTIONS;
    //Update Progress Bar
    ProgBar.style.width=(QueCounter/MAX_QUESTIONS)*100+"%";

    const Queindx = Math.floor(Math.random()*availabelQue.length);
    currentQue=availabelQue[Queindx];
    Question.innerHTML=currentQue.question;
    choice.forEach( choice =>{
        const num=choice.dataset['no'];
        choice.innerText=currentQue['choice'+num];
    })
    availabelQue.splice(Queindx,1);
    acceptAns=true;
};

choice.forEach( choice => {
    choice.addEventListener("click", e =>{
        if (!acceptAns) return;
        acceptAns=false;
        const selectedChoice=e.target;
        const selectedAns=selectedChoice.dataset["no"];
        const classToApply=(selectedAns==currentQue.answer)?"correct":"incorrect";
        
        if (classToApply=="correct"){
            increScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{        
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQue();
        },1000);
    });
});
increScore=(num)=>{
    score+=num;
    ScoreText.innerText=score;
};
startgame();