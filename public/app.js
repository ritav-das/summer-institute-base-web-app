

window.onload = (event) => {
  updateCarousel();
};

function updateCarousel() {
    console.log('hello from my new function');
    
    const configElement = document.getElementById('project_config')
    if(configElement === null) {
        return;
    }
    
    const directory = configElement.dataset.directory;
    console.log(`looking for images in ${directory}`);
    
    const url = `/pun/sys/dashboard/files/fs/${directory}`;
    const options = {
        headers: {
            'Accept': 'application/json'
        }
    };
    
    fetch(url, options)
        .then((response) => {
            console.log(`Fetch resolved at ${new Date().toISOString()}.`);
            return response;
        }).then((response) => response.json())
          .then((json) => json['files'])
          .then ((files) => files.map((file) => file['name']))
          .then((files) => files.filter((file) => file.endsWith('png')))
          .then((files) => files.splice(0, 9))
          .then((files) => {
              
              for(const file of files) {
                  const image = document.getElementById(file);
                  
                  if(image !== null) {
                      console.log(`Skipping ${file} because it's already on the page`);
                      continue;
                  }
                  
                  console.log(`Adding ${file} to the DOM.`);
                  
                  const imageUrl = `/pun/sys/dashboard/files/fs/${directory}/${file}`;
                  const newImage = document.createElement('div');
                  newImage.classList.add('carousel-item');
                  newImage.innerHTML = `<img class="d-block w-100" src="${imageUrl}">`;
                  newImage.id = file;
                  
                  const carousel = document.getElementById('image_carousel_inner');
                  carousel.append(newImage);
                  
                  const indicators = document.getElementById('image_carousel_indicators');
                  const slideTo = indicators.children.length;
                  
                  const newIndicator = document.createElement('li');
                  newIndicator.setAttribute('data-target', '#image_carousel');
                  newIndicator.setAttribute('data-slide-to', slideTo);
                  
                  indicators.append(newIndicator);
              }
              
          });
    
    console.log(`Fetch called at ${new Date().toISOString()}.`);
    setTimeout(updateCarousel, 10000);
    
}