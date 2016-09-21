'use strict';

var actualIndex = 0;

var images = [
  'pictures/img_1.jpg',
  'pictures/img_2.jpg',
  'pictures/img_3.jpg',
  'pictures/img_4.jpg',
  'pictures/img_5.jpg',
  'pictures/img_6.jpg',
  'pictures/img_7.jpg',
  'pictures/img_8.jpg',
];

var thumbnails = document.querySelector('.thumbnails');
var prevButton = document.querySelector('.left_button');
var nextButton = document.querySelector('.right_button');
var thumbnailsPrevButton = document.querySelector('.thumbnail_left_button');
var thumbnailsNextButton = document.querySelector('.thumbnail_right_button');
var mainpic = document.querySelector('.mainpic');
var imgTitle = document.querySelector('h3');

updateState();

thumbnails.addEventListener('click', changeImgByClicking);
prevButton.addEventListener('click', pressPrevButton);
nextButton.addEventListener('click', pressNextButton);
thumbnailsPrevButton.addEventListener('click', pressPrevButton);
thumbnailsNextButton.addEventListener('click', pressNextButton);
thumbnails.addEventListener('mouseover', hoverOnImage);
thumbnails.addEventListener('mouseout', hoverOutImage);

function updateState() {
  generateThumbnails();
  setMainImgSrc();
  setImgTitle();
}

function setMainImgSrc() {
  mainpic.setAttribute('src', images[actualIndex]);
}

function setImgTitle() {
  imgTitle.textContent = images[actualIndex];
}

function generateThumbnails() {
  thumbnails.innerHTML = '';
  var visibleThumbnails = getVisibleThumbnails();
  visibleThumbnails.forEach(function(src) {
    var thumbnail = document.createElement('img');
    var index = images.indexOf(src);
    thumbnail.setAttribute('src', src);
    thumbnail.setAttribute('data-index', index);
    thumbnail.classList.add('pic');
    thumbnails.appendChild(thumbnail);
  });
}

function getVisibleThumbnails() {
  var oneBeforPrev = images[getIndexByStep(-2)];
  var prev = images[getIndexByStep(-1)];
  var current = images[actualIndex];
  var next = images[getIndexByStep(1)];
  var oneAfterNext = images[getIndexByStep(2)];
  return [oneBeforPrev, prev, current, next, oneAfterNext];
}

function pressNextButton() {
  changeImgByStep(1);
}

function pressPrevButton() {
  changeImgByStep(-1);
}

function changeImgByStep(step) {
  actualIndex = getIndexByStep(step);
  updateState();
}

function getIndexByStep(step) {
  return (actualIndex + step + images.length) % images.length;
}

function changeImgByClicking(event) {
  var element = event.target;
  if (element.src) {
    actualIndex = parseInt(element.getAttribute('data-index'));
    updateState();
  }
}

function hoverOnImage(event) {
  var element = event.target;
  if (element.src) {
    element.classList.add('thick_border');
  }
}

function hoverOutImage(event) {
  var element = event.target;
  if (element.src) {
    element.classList.remove('thick_border');
  }
}
