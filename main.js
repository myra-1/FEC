// VARIABLES -- (const are generally in all caps (things unlikely to change))
const IMAGE_COUNT = 50;
const PAGINATE_BY = 10;

const breedsListElement = document.querySelector('#dogBreedsList')
const thumnailContainerElement = document.querySelector('#thumbnailContainerElement')
const breedsInputElement = document.querySelector('#dogBreedInput')
const paginationElement = document.querySelector('#paginationElement')
const imageModal = document.querySelector('#imageModal')
const imageModalDisplay = document.querySelector('#imageModalDisplay')


// FUNCTIONS

async function getDogBreeds() {
  let response = await fetch('https://dog.ceo/api/breeds/list/all');
  let breeds = await response.json();
  return Object.keys(breeds.message);
}

async function dogBreedOptions() {
  const breeds = await getDogBreeds()
  for (const breed of breeds) {
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', breed);
    breedsListElement.appendChild(optionElement)
  }
}

dogBreedOptions();

async function getDogImages(breed, count) {
  let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
  let images = await response.json();
  return images.message
}

async function updateBreed(breed) {
  const images = await getDogImages(breed, IMAGE_COUNT);

  function populateThumbnails(start) {
    thumnailContainerElement.innerHTML = '';
    for (const image of images.slice(start, start + PAGINATE_BY)) {
      const imageElement = document.createElement('div');
      imageElement.innerHTML = `<img src=${image}>`
      thumbnailContainerElement.appendChild(imageElement)
      imageElement.addEventListener("click", function () {
        displayModal(image);
      });
    }
  }

  paginationElement.innerHTML = '';
  for (let pageNumber = 0; pageNumber < images.length / 10; pageNumber += 1) {
    const pageNumberElement = document.createElement('button');
    pageNumberElement.innerHTML = `${pageNumber + 1}`
    pageNumberElement.addEventListener('click', function () {
      populateThumbnails(pageNumber * 10)
    })
    paginationElement.appendChild(pageNumberElement);
  }
  populateThumbnails(0)
}

function onDogBreedSelected(event) {
  const breed = event.target.value;
  updateBreed(breed)
}

function displayModal(image) {
  imageModalDisplay.setAttribute('src', image);
  imageModal.style.visibility = 'visible';
}

function hideModal() {
  imageModal.style.visibility = 'hidden';
}


breedsInputElement.addEventListener('change', onDogBreedSelected);
imageModal.addEventListener("click", hideModal);


updateBreed("beagle"); // just for testing
