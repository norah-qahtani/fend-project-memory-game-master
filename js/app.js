//////defining an array of cards
var cards =[
    'fa-diamond','fa-diamond',
    'fa-paper-plane-o','fa-paper-plane-o',
    'fa-anchor','fa-anchor',
    'fa-bolt','fa-bolt',
    'fa-cube','fa-cube',
    'fa-leaf','fa-leaf',
    'fa-bicycle','fa-bicycle',
    'fa-bomb','fa-bomb'
];
///////creating cards on the page
function generateCard(card){
    return`<li class="card"  data-card="${card}"><i style="center" class="fa ${card}"></i></li>`;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//////// initail function to built deck and cards to the page and call the shuffle method
 function initGame(){
     var deck = document.querySelector('.deck');
     var cardHTML =shuffle(cards).map(function(card){
        return generateCard(card);


    });
    
    deck.innerHTML = cardHTML.join('');
    
 }

 initGame();

var allCards =document.querySelectorAll('.card');
var openCards=[];
var matches=0;
var clicks=0;
////// adding click event to all cards 
allCards.forEach(function(card){
    card.addEventListener('click',function(e) {
        ////// if the card is not open then open it start the timmer 
        if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
             openCards.push(card);
             card.classList.add('open','show');
             if(clicks==0){startTimer()}
                clicks++;
             //// when the is two open cards check if Similar if yes keep them open and count matches and check the wongame method
              if(openCards.length == 2){
                  if(openCards[0].dataset.card ==openCards[1].dataset.card){
                      openCards[0].classList.add('match');
                      openCards[0].classList.add('open');
                      openCards[0].classList.add('show');
                     
                      openCards[1].classList.add('match');
                      openCards[1].classList.add('open');
                      openCards[1].classList.add('show');
                      openCards = [];
                      matches += 1;
                     setTimeout(function(){
                        wonGame();
                        },500);
                   }
                   /////// close the unmached cards
                    else {
                    setTimeout(function(){
                        openCards.forEach(function(card) {
                           card.classList.remove('open','show');  
                        });
                        openCards = [];
                     },500);
                    }
                    /////// call the moves mothod
                  addMove();
             } 
        }   
        
    });
    
});
//////// if all cards are matching then diplay a pop up message that shows the time the rating and the number of moves and replay button
var winContainer=document.querySelector('#myModal');
function wonGame(){
    if (matches == 8)
    {   
     var timing=timer.innerHTML;
     clearInterval(interval);
     $(document).ready(function(){
            $('#exampleModal').modal('show');
            var modalbody=document.querySelector('.modal-body');
            modalbody.innerHTML=`<p> with  ${ratings} stars ,  ${moves}  moves ,  ${timing} Time </p>`;
         });      
    }
}
///////replay for the popup message

function replay(){
    document.location.reload(); 
}

///// restart the page
const restartBtn=document.querySelector('.restart');
restartBtn.addEventListener('click', function()
{
    document.location.reload(); 
});


///// moves counter

var movesContainer=document.querySelector('.moves');
var moves=0;
movesContainer.innerHTML=0;
function addMove(){
    moves++;
    movesContainer.innerHTML=moves;
    rating();
}


////// rating 

var starContainer=document.querySelector('.stars');
var ratings=0;
function rating(){
    if (moves>=25){
        starContainer.innerHTML=`
        <li><i class="fa fa-star-o"></i></li>
        <li><i class="fa fa-star-o"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        ratings = 1;
        
    }
    else if(15 < moves && moves <25)  {
        starContainer.innerHTML=`
        <li><i class="fa fa-star-o"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        ratings = 2;
        
    }
    else {
        starContainer.innerHTML=`
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        ratings = 3;
        
    }
}

/////// timer

var timer =document.querySelector('.timer');
timer.innerHTML ='0 mins: 0 secs';
var interval;
var second=0 , minute=0,hour=0;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML=minute+ 'mins' + ' : '+second+'secs';
        second++;
        if (second == 60){
            minute++;
            second=0;
        }
        if (minute == 60){
            hour++;
            minute=0;
        }
    },1000);
}
