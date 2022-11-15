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
  .then(toyData => {
    for(const toy of toyData) {
      addToyToDOM(toy)
    }
  })
  .catch(() => alert('There was an error with the GET request.'))

  function addToyToDOM(toy) {
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
    // When the like button is clicked, edit the number of likes via PATCH
    button.addEventListener('click', event => {
      toy.likes ++
      p.textContent = `This toy has ${toy.likes} likes!`

      fetch(`http://localhost:3000/toys/${event.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': toy.likes
        })
      })
      .then(response => response.json())
      .catch(error => alert('There was an error with the PATCH request.'))
    })
    toyDiv.appendChild(button)

    toyContainer.appendChild(toyDiv)
  }

  // Add the user-submitted toy to the collection via POST
  const form = document.querySelector('.add-toy-form')

  form.addEventListener('submit', event => {
    event.preventDefault()
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'name': event.target[0].value,
        'image': event.target[1].value,
        'likes': 0
      })
    })
    .then(response => response.json())
    .then(newToy => addToyToDOM(newToy))
    .catch(error => alert('There was an error with the POST request.'))

    form.reset()
  })
});
