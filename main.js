async function getDogBreeds() {
  let response = await fetch('https://dog.ceo/api/breeds/list/all');
  let breeds = await response.json();
  return Object.keys(breeds.message);
}

async function dogBreedOptions() {
  const breeds = await getDogBreeds()
  const breedsListElement = document.querySelector('#dogBreedsList')
  for (const breed of breeds) {
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', breed);
    breedsListElement.appendChild(optionElement)
  }
}

dogBreedOptions();