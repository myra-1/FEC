// VARIABLES -- (const are generally in all caps (things unlikely to change))
const breedsListElement = document.querySelector('#dogBreedsList')
const thumnailContainerElement = document.querySelector('#thumbnailContainerElement')
const IMAGE_COUNT = 50;
const PAGINATE_BY = 10;

const breedsInputElement = document.querySelector('#dogBreedInput')

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

async function onDogBreedSelected(event) {
  const breed = event.target.value;
  const images = await getDogImages(breed, IMAGE_COUNT);

  function populateThumbnails(start) {
    thumnailContainerElement.innerHTML = '';
    for (const image of images.slice(start, start + PAGINATE_BY)) {
      const imageElement = document.createElement('div');
      imageElement.innerHTML = `<img src=${image}>`
      thumbnailContainerElement.appendChild(imageElement)
    }
  }
  populateThumbnails(0)
}

breedsInputElement.addEventListener('change', onDogBreedSelected);