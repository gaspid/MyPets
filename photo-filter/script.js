const fullScreenButton = document.querySelector('.fullscreen');
const resetButton = document.querySelector('.btn-reset');
const nextButton = document.querySelector('.btn-next');
const loadButton = document.querySelector('#btnInput');
const saveButton = document.querySelector('.btn-save');
const imgElement = document.querySelector('.editor img');
const filters = document.querySelector('.filters');
const inputs = filters.querySelectorAll('input');

const timeTypes = ['night', 'morning', 'day', 'evening'];
const hoursDivider = 6;
const imagesNames = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
];
let imagesCounter = 0;
const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

const getBlurCoeff = () => {
  return imgElement.naturalHeight / imgElement.clientHeight;
};

const getFilterValue = (name) => {
  const filter = filters.querySelector(`input[name=${name}]`);
  return filter.value;
};

const setCustomValue = (name, value) => {
  document.documentElement.style
    .setProperty(`--${name}`, value);
};

const defaultFiltersValues = {
  blur: getFilterValue('blur'),
  invert: getFilterValue('invert'),
  sepia: getFilterValue('sepia'),
  saturate: getFilterValue('saturate'),
  hue: getFilterValue('hue'),
}

const changeFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

const changeFilter = (event) => {
  if (event.target.matches('[type="range"]')) {
    const filter = event.target;
    const output = filter.parentNode.querySelector('output');
    const suffix = filter.dataset.sizing || '';
    output.value = filter.value;
    setCustomValue(filter.name, filter.value + suffix);
  }
};

const resetFilters = () => {
  Object.entries(defaultFiltersValues)
    .forEach(([key, value]) => {
      const filter = filters.querySelector(`input[name=${key}]`);
      filter.value = value;
      const output = filter.parentNode.querySelector('output');
      const suffix = filter.dataset.sizing || '';
      output.value = filter.value;
      setCustomValue(key, filter.value + suffix);
    });
};

const getNextImg = () => {
  const hour = new Date().getHours();
  const timeType = Math.floor(hour / hoursDivider);
  const index = imagesCounter % imagesNames.length;
  const imageSrc = `${baseUrl}${timeTypes[timeType]}/${imagesNames[index]}.jpg`;
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    imgElement.src = imageSrc;
  };
  imagesCounter += 1;
};

const loadImg = () => {
  const file = loadButton.files[0];
  loadButton.value = null;
  const reader = new FileReader();
  reader.onload = () => {
    imgElement.src = reader.result;
  }
  reader.readAsDataURL(file);
};

const saveImg = () => {
  const canvas = document.createElement('canvas');
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imgElement.src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    const filterStr = Array.from(inputs)
      .map((input) => {
        const name = input.name === 'hue' ? 'hue-rotate' : input.name;
        const value = name === 'blur' ? Math.round(input.value * getBlurCoeff()) : input.value;
        return `${name}(${value}${input.dataset.sizing})`;
      })
      .join(' ');

    ctx.filter = filterStr;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  };
};

fullScreenButton.addEventListener('click', changeFullScreen);
filters.addEventListener('input', changeFilter);
resetButton.addEventListener('click', resetFilters);
nextButton.addEventListener('click', getNextImg);
loadButton.addEventListener('change', loadImg);
saveButton.addEventListener('click', saveImg);
