const model = {
  currentCat: null,
  displayAdminField: false,
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
    adminFormView.init()
  },

  getAllCats() {
    return model.cats
  },

  getCurrentCat() {
    return model.currentCat
  },

  setCurrentCat(selectedCat) {
    model.currentCat = selectedCat
    adminFormView.render()
  },

  incrementCounter() {
    model.currentCat.clickCount++
    catDetailView.render()
  },

  openAdmin() {
    model.displayAdminField = true
    adminFormView.render()
  },

  closeAdmin() {
    model.displayAdminField = false
    adminFormView.render()
  },

  updateCatDetails(newName) {
    model.currentCat.name = newName
    catListView.render()
    catDetailView.render()
    controller.closeAdmin()
  }

}

const catListView = {

  init() {
    this.catListElem = document.getElementById('catList')
    this.render()
  },

  render() {
    this.catListElem.innerHTML=""

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

const adminFormView = {

  init() {
    this.adminButton = document.getElementById('admin')
    this.saveButton = document.getElementById('save')
    this.cancelButton = document.getElementById('cancel')

    this.nameInputElem = document.getElementById('catNameField')
    this.imgInputElem = document.getElementById('imgUrlField')
    this.clicksInputElem = document.getElementById('clicks')

    this.adminButton.addEventListener('click', function() {
      model.displayAdminField? controller.closeAdmin() : controller.openAdmin()
    })

    this.saveButton.addEventListener('click', function() {
      let newName = document.getElementById('catNameField').value
      controller.updateCatDetails(newName)
    })

    this.cancelButton.addEventListener('click', function() {
      controller.closeAdmin()
    })

    this.render()
  },

  render() {
    let currentCat = controller.getCurrentCat()

    this.nameInputElem.value = currentCat.name
    this.imgInputElem.value = currentCat.image
    this.clicksInputElem.value = currentCat.clickCount

    this.adminForm = document.getElementById('adminForm')
    model.displayAdminField? this.adminForm.style.display = "block" : this.adminForm.style.display = "none"
  }
}

controller.init()
