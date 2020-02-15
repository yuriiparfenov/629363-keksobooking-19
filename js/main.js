'use strict';

var OBJ_COUNT = 8;
var START_COORD = 0;
var X_COORD = 1100;
var Y_COORD_MIN = 130;
var Y_COORD_MAX = 630;
var X_PINS = 25;
var Y_PINS = 70;
var ARRAY_GUESTS = ['palace', 'flat', 'house', 'bungalo'];
var ARRAY_CHECK = ['12:00', '13:00', '14:00'];
var ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ARRAY_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
/* var templateCard = document.querySelector('#card').content
    .querySelector('.map__card');*/
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var getArrayOfAuthorObj = function () {
  var array = [];
  var count = 1;
  for (var i = 0; i < OBJ_COUNT; i++) {
    array[i] = {};
    array[i].avatar = 'img/avatars/user0' + count + '.png';
    count++;
  }

  return array;
};

var getArrayOfLocationObj = function () {
  var array = [];

  for (var i = 0; i < OBJ_COUNT; i++) {
    array[i] = {};
    array[i].x = Math.round(Math.random() * (X_COORD - START_COORD) + START_COORD);
    array[i].y = Math.round(Math.random() * (Y_COORD_MAX - Y_COORD_MIN) + Y_COORD_MIN);
  }

  return array;
};


var getArrayOfOffer = function () {
  var array = [];

  for (var i = 0; i < OBJ_COUNT; i++) {
    array[i] = {
      title: 'Уютное гнездышко для молодоженов',
      address: getArrayOfLocationObj()[i],
      price: Math.round(Math.random() * (10000 - 3000) + 3000),
      type: ARRAY_GUESTS[Math.floor(Math.random() * ((ARRAY_GUESTS.length) - 0) + 0)],
      rooms: Math.round(Math.random() * (5 - 1) + 1),
      guests: Math.round(Math.random() * (20 - 1) + 1),
      checkin: ARRAY_CHECK[Math.floor(Math.random() * (ARRAY_CHECK.length - 0) + 0)],
      checkout: ARRAY_CHECK[Math.floor(Math.random() * (ARRAY_CHECK.length - 0) + 0)],
      features: ARRAY_FEATURES.slice(0, (Math.floor(Math.random() * ((ARRAY_FEATURES.length + 1) - 1) + 1))),
      description: 'строка с описанием',
      photos: ARRAY_PHOTOS.slice(0, (Math.floor(Math.random() * ((ARRAY_PHOTOS.length + 1) - 1) + 1)))
    };
  }

  return array;
};

var getArrayOfObjects = function () {
  var array = [];

  for (var i = 0; i < OBJ_COUNT; i++) {
    array[i] = {
      author: getArrayOfAuthorObj()[i],
      offer: getArrayOfOffer()[i],
      location: getArrayOfLocationObj()[i]
    };
  }

  return array;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
/*
  var getCard = function (card) {
  var cardElement = templateCard.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address.x + ',' + card.offer.address.y;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  var arrayUl = cardElement.querySelectorAll('.popup__feature');

  for (var i = 0; i < arrayUl.length; i++) {

    for (var j = 0; j < card.offer.features.length; j++) {
      if (!arrayUl[i].matches('.popup__feature--' + card.offer.features[i])) {
        arrayUl[i].remove();
      }
    }
  }

  var divPhoto = cardElement.querySelector('.popup__photos');
  var imgPhoto = cardElement.querySelector('.popup__photo');

  imgPhoto.src = card.offer.photos[0];
  for (var k = 1; k < card.offer.photos.length; k++) {
    var img = imgPhoto.cloneNode(true);
    img.src = card.offer.photos[k];
    divPhoto.appendChild(img);
  }

  return cardElement;
};*/

var generatePins = function (pin) {
  var pinElement = templatePin.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x + X_PINS) + 'px; top: ' + (pin.location.y + Y_PINS) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (element, arrayPins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayPins.length; i++) {
    fragment.appendChild(generatePins(getArrayOfObjects()[i]));

  }

  element.appendChild(fragment);
};

renderPins(document.querySelector('.map__pins'), getArrayOfObjects());
