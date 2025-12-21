 let filters = {
    brightness: {
        min: 0,
        value: 100,
        max: 200,
        unit: "%"
    },
    contrast: {
        min: 0,
        value: 100,
        max: 200,
        unit: "%"
    },
    saturation: {
        min: 0,
        value: 100,
        max: 500,
        unit: "%"
    },
    hueRotate: {
        min: 0,
        value: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        min: 0,
        value: 0,
        max: 20,
        unit: "px"
    },
    grayScale: {
        min: 0,
        value: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        min: 0,
        value: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        min: 0,
        value: 100,
        max: 100,
        unit: "%"
    },
    invert: {
        min: 0,
        value: 0,
        max: 100,
        unit: "%"
    },
};

const filterContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector(".imageCanvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
let file = null;
let image = null;

const resetBtn = document.querySelector("#reset-btn")
const downloadBtn = document.querySelector("#download-btn")
const presetContainer = document.querySelector(".presets")

function createFilterElement(name,unit,min,max,value){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type='range'
    input.min=min
    input.max=max
    input.value=value
    input.id=name

    const label =  document.createElement("label")
    label.innerText=name
    label.for=name

    div.appendChild(label)
    div.appendChild(input)

    input.addEventListener("input", (e)=> {
        filters[name].value = input.value
        applyFilters()
    })

    return div
}
function createFilters(){
    Object.keys(filters).forEach(filter => {
        // console.log(filters[filter])
        const filterElement = createFilterElement(filter, filters[filter].unit, filters[filter].min, filters[filter].max, filters[filter].value)

        filterContainer.appendChild(filterElement)
    })
}
createFilters()

imageInput.addEventListener("change", (e)=> {
    const file = e.target.files[0]
    const imagePlaceHolder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceHolder.style.display = "none"

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img;
        imageCanvas.width = image.width
        imageCanvas.height = image.height
        canvasCtx.drawImage(image,0,0)
    }
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayScale.value}${filters.grayScale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasCtx.drawImage(image, 0, 0);
}


resetBtn.addEventListener("click",()=>{
     filters = {
    brightness: {
        min: 0,
        value: 100,
        max: 200,
        unit: "%"
    },
    contrast: {
        min: 0,
        value: 100,
        max: 200,
        unit: "%"
    },
    saturation: {
        min: 0,
        value: 100,
        max: 500,
        unit: "%"
    },
    hueRotate: {
        min: 0,
        value: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        min: 0,
        value: 0,
        max: 20,
        unit: "px"
    },
    grayScale: {
        min: 0,
        value: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        min: 0,
        value: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        min: 0,
        value: 100,
        max: 100,
        unit: "%"
    },
    invert: {
        min: 0,
        value: 0,
        max: 100,
        unit: "%"
    },
};
applyFilters()
filterContainer.innerHTML = ""
createFilters()
})

downloadBtn.addEventListener("click",()=> {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    // Warm faded vintage colors
    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 120,
        hueRotate: 0,
        blur: 0,
        grayScale: 20,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    // High contrast + grainy punk feel
    punk: {
        brightness: 120,
        contrast: 160,
        saturation: 300,
        hueRotate: 330,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 20
    },

    // 80s retro neon
    retro: {
        brightness: 110,
        contrast: 140,
        saturation: 200,
        hueRotate: 250,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    // old-school newspaper look
    oldSchool: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotate: 0,
        blur: 0,
        grayScale: 90,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    // dramatic cinematic teal/orange
    cinematic: {
        brightness: 105,
        contrast: 150,
        saturation: 180,
        hueRotate: 330,
        blur: 0,
        grayScale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    // dark noir shadow theme
    noir: {
        brightness: 80,
        contrast: 190,
        saturation: 0,
        hueRotate: 0,
        blur: 0,
        grayScale: 100,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    // washed faded instagram look
    softPastel: {
        brightness: 120,
        contrast: 90,
        saturation: 80,
        hueRotate: 0,
        blur: 0,
        grayScale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    // strong HDR-like sharp tone
    hdrBoost: {
        brightness: 120,
        contrast: 200,
        saturation: 500,
        hueRotate: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    // glitch modern cyberpunk
    cyberpunk: {
        brightness: 120,
        contrast: 170,
        saturation: 350,
        hueRotate: 280,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 10
    },

    // smooth lipstick portrait
    beauty: {
        brightness: 115,
        contrast: 110,
        saturation: 140,
        hueRotate: 0,
        blur: 2,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    warmSunset: {
    brightness: 115,
    contrast: 120,
    saturation: 160,
    hueRotate: 20,
    blur: 0,
    grayScale: 0,
    sepia: 30,
    opacity: 100,
    invert: 0
},
coolTone: {
    brightness: 105,
    contrast: 130,
    saturation: 90,
    hueRotate: 220,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
},
};
Object.keys(presets).forEach(preset => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = preset

    presetContainer.appendChild(presetButton)

    presetButton.addEventListener("click", ()=> {
        const presetName = presets[preset]
        Object.keys(presetName).forEach(filterName => {
            filters[filterName].value = presetName[filterName]
        })
        applyFilters()
        filterContainer.innerHTML = ""
        createFilters()
    })
})