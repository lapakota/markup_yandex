'use strict';

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const swipeZone = document.getElementById('cards-container');
swipeZone.addEventListener('touchstart', function(event) {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}, false);

swipeZone.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;
  handleSwipeGesture(touchStartX, touchStartY, touchEndX, touchEndY);
}, false);

document.getElementById('reject-button').addEventListener('click', () => makeSwipe('left'));
document.getElementById('super-like-button').addEventListener('click', () => makeSwipe('up'));
document.getElementById('like-button').addEventListener('click', () => makeSwipe('right'));

function handleSwipeGesture(touchStartX, touchStartY, touchEndX, touchEndY) {
  const delX = touchEndX - touchStartX;
  const delY = touchEndY - touchStartY;
  if(Math.abs(delX) > Math.abs(delY)){
    if(delX > 0)
      makeSwipe('right');
    else
      makeSwipe("left");
  }
  else if(Math.abs(delX) < Math.abs(delY)){
    if(delY <= 0)
      makeSwipe("up");
  }
}

function makeSwipe(action) {
  let cards = document.getElementsByClassName('card');

  if (cards.length === 1)
    return;

  let current_card = cards.item(cards.length - 1);

  current_card.style.opacity = String(Number(current_card.style.opacity) * 0.9);
  switch (action) {
    case 'left': {
      current_card.style.transform = `translateX(-100%) translateY(0%)`;
      break;
    }
    case 'up': {
      current_card.style.transform = `translateX(0%) translateY(-100%)`;
      break;
    }
    case 'right': {
      current_card.style.transform = `translateX(100%) translateY(0%)`;
      break;
    }
  }

  setTimeout(function () {
    current_card.remove();
  }, 400);
}


