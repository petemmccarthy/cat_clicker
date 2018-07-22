const model = {
  currentCat: null,
  cats: [
    {
      name: 'cat1',
      clickCount: 0,
      image: "images/cat1.jpeg"
    },
    {
      name: 'cat2',
      clickCount: 0,
      image: "images/cat2.jpeg"
    },
    {
      name: 'cat3',
      clickCount: 0,
      image: "images/cat3.jpeg"
    },
    {
      name: 'cat4',
      clickCount: 0,
      image: "images/cat4.jpeg"
    },
    {
      name: 'cat5',
      clickCount: 0,
      image: "images/cat5.jpeg"
    }
  ]
}

const controller = {

  init() {
    model.currentCat = model.cats[0]
    catListView.init()
    catDetailView.init()
  },

  getAllCats() {
    return model.cats
  },

  getCurrentCat() {
    return model.currentCat
  },

  setCurrentCat(selectedCat) {
    model.currentCat = selectedCat
  },

  incrementCounter() {
    model.currentCat.clickCount++
    catDetailView.render()
  }

}

const catListView = {

  init() {
    this.catListElem = document.getElementById('catList')
    this.render()
  },

  render() {
    let i, cats, catElem

    cats = controller.getAllCats()

    for (i = 0; i < cats.length; i++) {
      cat = cats[i]

      catElem = document.createElement('li')
      catElem.textContent = cat.name

      catElem.addEventListener('click', (function(selectedCat) {
        return function() {
          controller.setCurrentCat(selectedCat)
          catDetailView.render()
        }
      })(cat))

      this.catListElem.appendChild(catElem)
    }
  }

}

const catDetailView = {

  init() {
    this.catNameElem = document.getElementById('catName')
    this.catCountElem = document.getElementById('clickCount')
    this.catImageElem = document.getElementById('catImage')

    this.catImageElem.addEventListener('click', function() {
      controller.incrementCounter()
    })

    this.render()
  },

  render() {
    let currentCat = controller.getCurrentCat()
    this.catNameElem.textContent = currentCat.name
    this.catCountElem.textContent = currentCat.clickCount
    this.catImageElem.src = currentCat.image
  }

}

controller.init()
