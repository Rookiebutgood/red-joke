/*
Если я когда то решу допиливать эту шутку
TODO
1. Вытащить стили в отдельный файл
2. Сделать мультизагрузку
3. Сделать превью
4. Сделать историю
5. Сделать разные цвета 
*/


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = 200;

const reader = new FileReader();

function fileHandler(file) {
  reader.readAsDataURL(file)
  reader.onload = e => {
    let img = new Image()
    img.src = e.target.result
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 200, 200);
      let data = ctx.getImageData(0, 0, 200, 200).data;
      let normalArr = [];
      let startPixels;
      let endPixels;
      for(let i=0; i<data.length; i+=4) {
        normalArr.push([data[i], data[i+1], data[i+2], data[i+3]])
      }
      startPixels = normalArr.length
      endPixels = normalArr.filter(e=>{return e[0] - e[1] - e[2] > 0}).length
      showResult(Math.floor(100 * endPixels /startPixels))
    }
  }
}

function showResult(value) {
  window.result.innerHTML=(`<span>Картинка красная на ${value}%</span>`)
}

window.dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  e.currentTarget.classList.add('active')
}, false)
window.dropzone.addEventListener('dragleave', e => {
  e.preventDefault();
  e.currentTarget.classList.remove('active')
}, false)
window.dropzone.addEventListener('drop', e => {
  e.preventDefault();
  e.target.classList.remove('active')
  fileHandler(e.dataTransfer.files[0]);
})

window.file.addEventListener('change', e => fileHandler(e.target.files[0]))
