// Card data
const cardsArray = [ //array with all logo's / cards
  {
    name: 'CFL',
    img: 'img/CFL.png',
  },
  {
    name: 'DB',
    img: 'img/DB.png',
  },
  {
    name: 'DSB',
    img: 'img/DSB.png',
  },
  {
    name: 'IR',
    img: 'img/IR.png',
  },
  {
    name: 'nmbs',
    img: 'img/nmbs.png',
  },
  {
    name: 'NS',
    img: 'img/NS.png',
  },
  {
    name: 'OBB',
    img: 'img/OBB.png',
  },
  {
    name: 'RBL',
    img: 'img/RBL.png',
  },
  {
    name: 'SBB',
    img: 'img/SBB.png',
  },
  {
    name: 'SJ',
    img: 'img/SJ.png',
  },
  {
    name: 'SNCF',
    img: 'img/SNCF.png',
  },
  {
    name: 'VR',
    img: 'img/VR.png',
  },
];

let gameGrid = cardsArray.concat(cardsArray); // duplicate array to loop through it below
gameGrid.sort(() => 0.5 - Math.random()); // randomizes game cards each time you load the application

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200; // delay for the user to see the card long enough
var clickCounter = 0; // this is the click counter for pairs that are equal
var clickCounterAll = 0; // this is the click counter for every time the user clicks on a pair
var t = setInterval(function() { // makes it possible to print value to HTML page
document.getElementById("clickCounterAll").innerHTML = clickCounterAll;
},500);
var t = setInterval(function() {
  document.getElementById("clickCounter").innerHTML = clickCounter;
  },500);
var timer = new Timer(); // timer defined globally

const game = document.getElementById('game');
// create section
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
// append grid
game.appendChild(grid);

gameGrid.forEach(item => { // foreach item in grid array
  // creates a div
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const front = document.createElement('div');
  front.classList.add('front'); // add class front to div

  const back = document.createElement('div');
  back.classList.add('back'); // add class back to div
  back.style.backgroundImage = `url(${item.img})`; // background image to the array's image
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

// if the cards are the same, css will be applied
const match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

const resetTry = () => { // makes it possibly to make multiple guesses, empties all values
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected'); // empty css as well
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) { // this way the grid cannot be selected; only the cards / divs
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) { // first guess
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      // add selected class (css)
      clicked.parentNode.classList.add('selected');
    } else { // second guess
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      // add selected class (css)
      clicked.parentNode.classList.add('selected');
    }
    // none of the guesses are empty
    if (firstGuess !== '' && secondGuess !== '') {
      // if the cards match
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetTry, delay);
        clickCounter++;
        clickCounterAll++;
      } else {
        setTimeout(resetTry, delay);
        clickCounterAll++;

      }
    }
    previousTarget = clicked;

  }


  if (clickCounterAll < 1) { // timer starts when user clicks for the first time
    console.log("The game has started!");
    timer.start();
    timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
}); 

  }

  if (clickCounter == 12) { // 12 is the amount of pairs; if all the pairs are found, the game is finished
    alert("Congratulations! You have finished the game" + " with " + clickCounterAll + " clicks and \n" + timer.getTimeValues().toString() + " seconds")
     timer.stop();
  }

// custom alert
var ALERT_TITLE = "Game finished!";
var ALERT_BUTTON_TEXT = "Play again";

if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() {window.location.reload();}

    alertObj.style.display = "block";
}
});
