let cats = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];
let i;

for(i = 0; i <cats.length; i++) {

  let myCat = {
    name: cats[i],
    clickCount: 0,
    image: "images/" + cats[i] + ".jpeg"
  };

  let elem = document.createElement('ul');
  elem.textContent = myCat.name;
  elem.className = "inline";
  let catList = document.getElementById('catList');
  catList.appendChild(elem);


  let catNameElem = document.getElementById('catName');
  let clickCountElem = document.getElementById('clickCount');
  let catImageElem = document.getElementById('catImage');

  elem.addEventListener('click', (function(selectedCat) {
    return function() {

      myCat.clickCount += 1;

      catNameElem.textContent = myCat.name;

      catImageElem.src = myCat.image;

      clickCountElem.textContent = myCat.clickCount;
    }
  })(myCat));

};
