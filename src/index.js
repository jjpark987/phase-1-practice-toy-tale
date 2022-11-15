let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch, parse and add toy objects to DOM
  const toyContainer = document.getElementById('toy-collection')
  
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => addToysToDOM(toyData))
  .catch(() => alert('There is an error with the fetch request.'))

  function addToysToDOM(toyData) {
    for(const toy of toyData) {
      // Create a <div class="card"> for each toy
      const toyDiv = document.createElement('div')
      toyDiv.className = 'card'

      // Add the name, image, number of likes and like button for each toy
      const h2 = document.createElement('h2')
      h2.textContent = toy.name
      toyDiv.appendChild(h2)

      const image = document.createElement('img')
      image.src = toy.image
      image.className = 'toy-avatar'
      toyDiv.appendChild(image)

      const p = document.createElement('p')
      p.textContent = `This toy has ${toy.likes} likes!`
      toyDiv.appendChild(p)

      const button = document.createElement('button')
      button.className = 'like-btn'
      button.id = toy.id
      button.textContent = ' Like ❤️ '
      toyDiv.appendChild(button)

      toyContainer.appendChild(toyDiv)
    }
  }

  // Add the user-submitted toy to the collection via POST
  const userInputName = document.getElementsByName('name')
  const userInputImage = document.getElementsByName('image')
  const createButton = document.getElementsByName('submit')

  userInputName[0].addEventListener('submit', event => {
    event.preventDefault()
    console.log(event.target)
  })
  userInputImage[0].addEventListener('submit', event => {
    event.preventDefault()
    console.log(event.target)
  })
  createButton[0].addEventListener('submit', event => {
    event.preventDefault()
  })

  // fetch('http://localhost:3000/toys', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  //   body: JSON.stringify()
  // })
});
