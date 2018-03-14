/*
 * Create a list that holds all of your cards
 * 1. Diamond | 2. Bicycle | 3. Bomb | 4. Cube
 * 5. Paperplane | 6. Bolt | 7. Leaf | 8. Anchor
 */
 const cardList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976, I've explained it to myself with side comments.
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        // return number between 1 and number of cards on cardList
        randomIndex = Math.floor(Math.random() * currentIndex); // get number between 1 to 15
        currentIndex -= 1; // we start with 15 as currentIndex (16-1) which is the last item in the array
        temporaryValue = array[currentIndex]; //what's lying behind card #[currentIndex] is temporaryValue, we save it
        // because it's gonna get overwritten when we re-assign it.
        array[currentIndex] = array[randomIndex]; //put whatever card you got randomly in the current index
        array[randomIndex] = temporaryValue; //put whatever card was in the current index in the random index.
    }

    return array;

}

let shufdCardList = shuffle(cardList);

function placeCards() {
  let cardSpot = 1; //c+cardSpot is the id of the card on the DOM
  let cardOnDOM;
  const addSymbolData = card => {cardOnDOM.setAttribute("data-symbol", card)}
  for (const card of shufdCardList) {
    cardOnDOM = document.getElementById(`c${cardSpot}`);
    let cardClass;
    switch(card) {
      case 1: cardClass = "fa-diamond"; addSymbolData(card); break;
      case 2: cardClass = "fa-bicycle"; addSymbolData(card); break;
      case 3: cardClass = "fa-bomb"; addSymbolData(card); break;
      case 4: cardClass = "fa-cube"; addSymbolData(card); break;
      case 5: cardClass = "fa-paper-plane-o"; addSymbolData(card); break;
      case 6: cardClass = "fa-bolt"; addSymbolData(card); break;
      case 7: cardClass = "fa-leaf"; addSymbolData(card); break;
      case 8: cardClass = "fa-anchor"; addSymbolData(card); break;
    }
    cardOnDOM.firstElementChild.classList.add(cardClass)
    cardSpot++;
  }
}
placeCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let deck = document.querySelector(".deck");
let firstCard = 0;
let secondCard = 0;
let isEqual = 0;
let movesNum = 0;
let moves = document.querySelector('.moves');
class CardPair {
  constructor (firstCard, secondCard) {
    this.firstCard = firstCard;
    this.secondCard = secondCard;
  }
}
let cardPairs = [];

function showCard(cardSpot) {
  function increaseMoves() {
    movesNum++;
    moves.textContent = movesNum;
  }
  function createPair(firstCard, secondCard) {
    const cardPair = new CardPair (firstCard, secondCard);
    cardPairs.push(cardPair);
  }
  if (firstCard === 0) {
    firstCard = cardSpot;
    firstCard.classList.add('show');
    increaseMoves();
    return false;
  } //keep the card as firstCard if there is no card open yet
  if (firstCard !== 0 && secondCard === 0) {
    secondCard = cardSpot;
    if (secondCard === firstCard) {
      firstCard.classList.remove('show');
      createPair(firstCard, 0);
      firstCard = 0;
      secondCard = 0;
      return false;
    }
    increaseMoves();
    createPair(firstCard, secondCard);
    secondCard.classList.add('show');
    checkEquality(firstCard, secondCard);
    firstCard = 0; secondCard = 0;
    setTimeout(function() {
      if (!isEqual) { cardPairs[cardPairs.length-1].secondCard.classList.remove('show'); cardPairs[cardPairs.length-1].firstCard.classList.remove('show');
      }
      },  1600);
  }
  function checkEquality(first, second) {
    isEqual = ( first.dataset.symbol === second.dataset.symbol ) ? true : 0;
  }
};


deck.onclick = function(event) {
  let target = event.target;
  let ccSpot = target.closest('li'); //clicked card spot, navigate up the tree to the li parent element
  if (!ccSpot) return; //if clicked somewhere else inside deck do nothing
  showCard(ccSpot); //send clicked card spot to showCard
}
