let fileInput = document.getElementById('file'),
chooseImg = document.querySelector('.choose-img'),
saveImg = document.querySelector('.save-img'),
previewImg = document.querySelector('.preview-img img'),
resetFilter = document.querySelector('.reset-filter');
filterOptions = document.querySelectorAll('.filter button'),
filterSlider = document.querySelector('.slider input'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
rotateOptions = document.querySelectorAll('.rotate button'),
filter = document.querySelector('.filter'),
rotate = document.querySelector('.rotate');

let brightness = 100, contrast = 100, invert = 0, hue = 0, saturation = 100, blurred =0;

let rotateImg =0, flipHorizontal =1,flipVertical = 1;


chooseImg.addEventListener('click', ()=> fileInput.click());
// showImage function is load the image form ur device to this site.

function showImage() {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
  // Activating filter, rotate and reset filter option after selecting the image.

    resetFilter.classList.remove('disabled');
    filter.classList.remove('disabled');
    filterSlider.classList.remove('disabled');
    rotate.classList.remove('disabled');

}

fileInput.addEventListener('change', showImage);

// Applying filters to image.

function applyFilter(){
    previewImg.style.transform = `rotate(${rotateImg}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${invert}%) hue-rotate(${hue}deg) 
    saturate(${saturation}%) blur(${blurred}px)`;

}


// This function is going to responsivble of active or move to the 
// different filter options.

filterOptions.forEach(option => {
  option.addEventListener('click', () => {
       document.querySelector('.filter button.active').classList.remove('active');
       option.classList.add('active');
       filterName.innerText = option.innerText;

       // Changing filter value depending on their filter name.
       if(option.id == 'brightness') {
        filterSlider.min = 0;
        filterSlider.max = 200;
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
       }
       else if(option.id == 'contrast') {
        filterSlider.min = 0;
        filterSlider.max = 200;
        filterSlider.value = contrast;
        filterValue.innerText = `${contrast}%`;
       }

       else if(option.id == 'invert') {
        filterSlider.min = 0;
        filterSlider.max = 100;
        filterSlider.value = invert;
        filterValue.innerText = `${invert}%`;
       }
       else if(option.id == 'hue') {
        filterSlider.min = -180;
        filterSlider.max = 180;
        filterSlider.value = hue;
        filterValue.innerText = `${hue}deg`;
       }
       else if(option.id == 'saturation') {
        filterSlider.min = 0;
        filterSlider.max = 200;
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
       }

       else if(option.id == 'blur') {
        filterSlider.min = 0;
        filterSlider.max = 20;
        filterSlider.value = blurred;
        filterValue.innerText = `${blurred}px`;
       }
       

  });
});

//  updateSlider function is update the value of brightness.
function updateSlider() {
   filterValue.innerText= `${filterSlider.value}%`;

   let selectedFilter = document.querySelector('.filter .active');
   if(selectedFilter.id == 'brightness') {
    brightness = filterSlider.value;
    filterValue.innerText = `${filterSlider.value}%`;
   } 
   else if(selectedFilter.id == 'contrast') {
    contrast = filterSlider.value;
    filterValue.innerText = `${filterSlider.value}%`;
   } 

   else if(selectedFilter.id == 'invert') {
    invert = filterSlider.value;
    filterValue.innerText = `${filterSlider.value}%`;
   } 
   else if(selectedFilter.id == 'hue') {
    hue = filterSlider.value;
    filterValue.innerText = `${filterSlider.value}deg`;
   } 
   else if(selectedFilter.id == 'saturation') {
    saturation = filterSlider.value;
    filterValue.innerText = `${filterSlider.value}%`;
   } 

   else if(selectedFilter.id == 'blur') {
    blurred = filterSlider.value;
    filterValue.innerText = `${filterSlider.value}px`;
   } 
   applyFilter();
}

// checking whether rotate and flip buttons clicked

rotateOptions.forEach(rotateOption => {
  rotateOption.addEventListener('click', () => {
      // rotating and flipping the image.

      if(rotateOption.id == 'left') {
        rotateImg  -=90;
      }
     else if(rotateOption.id == 'right') {
        rotateImg  +=90;
      }
     else if(rotateOption.id == 'horizontal') {
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
      }
     else if(rotateOption.id == 'vertical') {
        flipVertical = flipVertical === 1 ? -1 : 1;
      }
      
      applyFilter();
  });
});

// Resetting filters of image.

function resetFilters() {
 brightness = 100, contrast = 100, invert = 0, hue = 0, saturation = 100, blurred =0;
 rotateImg =0, flipHorizontal =1,flipVertical = 1;
 filterOptions[0].click();
 applyFilter();
}

// This is work for save the images
function saveImage(){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${invert}%) hue-rotate(${hue}deg) 
    saturate(${saturation}%) blur(${blurred}px)`;

    if(rotateImg !==0) {
        ctx.rotate(rotateImg * Math.PI / 180);
    }
     ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
   let link = document.createElement('a');
   link.download = 'image.png';
   link.href = canvas.toDataURL();
   link.click();
}
saveImg.addEventListener('click', saveImage);
// working of reset filter
resetFilter.addEventListener('click', resetFilters);
filterSlider.addEventListener('input', updateSlider);
