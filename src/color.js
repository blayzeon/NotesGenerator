const colorCtrl = (function(){
    // functions
    function hexToHSL(hex) {
        // credit: https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          r = parseInt(result[1], 16);
          g = parseInt(result[2], 16);
          b = parseInt(result[3], 16);
          r /= 255, g /= 255, b /= 255;
          var max = Math.max(r, g, b), min = Math.min(r, g, b);
          var h, s, l = (max + min) / 2;
          if(max == min){
            h = s = 0; // achromatic
          }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
          }
        var HSL = new Object();
        HSL['h']=h;
        HSL['s']=s;
        HSL['l']=l;
        return HSL;
    }

    function setCssVar(variable, value){
        // set a css variable to a value
        const root = document.querySelector(':root');
        root.style.setProperty(variable, value);
        localStorage.setItem(variable, value);

        // update the fonts
        const hsl = hexToHSL(value);
        const font = `${variable}Font`;
        if (hsl.l >= 0.6){
            root.style.setProperty(font, '#000000');
        } else {
            root.style.setProperty(font, '#FFFFFF');
        }
    }

    function setColorListener(item){
        item.value = getComputedStyle(document.querySelector(':root')).getPropertyValue(item.id);
        item.addEventListener('change', ()=>{
            setCssVar(item.id, item.value);
        });
    }
    
    function memory(cssVar, elm){
        const storage = localStorage.getItem(cssVar);
        let defaultVal = storage;
        if (storage){
            setCssVar(cssVar, storage);
        } else {
            defaultVal = getComputedStyle(document.querySelector(':root')).getPropertyValue(cssVar);
        }

        elm.value = defaultVal;
    }

    const container = document.createElement('span');

    const header = document.createElement('div');
    header.innerText = 'Header: ';
    const hInput = document.createElement('input');
    hInput.setAttribute('id', '--primary');
    hInput.setAttribute('type', 'color');
    hInput.setAttribute('data-color', '');
    header.appendChild(hInput);

    const background = document.createElement('div');
    background.innerText = 'Body: '
    const bInput = document.createElement('input');
    bInput.setAttribute('id', '--background');
    bInput.setAttribute('type', 'color');
    bInput.setAttribute('data-color', '');
    background.appendChild(bInput);

    const inputs = document.createElement('div');
    inputs.innerText = 'Form: '
    const iInput = document.createElement('input');
    iInput.setAttribute('id', '--inputs');
    iInput.setAttribute('type', 'color');
    iInput.setAttribute('data-color', '');
    inputs.appendChild(iInput);

    const resetC = document.createElement('div');
    const reset = document.createElement('input');
    reset.setAttribute('type', 'button');
    reset.setAttribute('id', 'adj-reset');
    reset.setAttribute('value', "ViaPath Colors");
    resetC.appendChild(reset);

    container.appendChild(header);
    container.appendChild(background);
    container.appendChild(inputs);
    container.appendChild(reset);

    // listeners
    reset.addEventListener('click',()=>{
        const defaultColors = {
            background: '#eeeeee',
            primary: '#29CC53', 
            primaryFont: '#ffffff',
            inputs: '#ffffff',
            inputsFont: '#000000',
        }
    
        const root = document.querySelector(':root');
    
        for (let key in defaultColors){
            root.style.setProperty(`--${key}`, defaultColors[key]);
        }
    
        const items = document.querySelectorAll('[data-color]');
    
        items.forEach((item)=>{
            item.value = getComputedStyle(document.querySelector(':root')).getPropertyValue(item.id);
            setCssVar(item.id, item.value);
        });
    });

    hInput.addEventListener('click', ()=> {
        setColorListener(hInput);
    });

    bInput.addEventListener('click', ()=> {
        setColorListener(bInput);
    });

    iInput.addEventListener('click', ()=> {
        setColorListener(iInput);
    });

    // local storage
    memory('--primary', hInput);
    memory('--inputs', iInput);
    memory('--background', bInput);


    return container;
})();


/* color




/// color


setColorListeners('[data-color]');


// main colors
document.querySelectorAll('[data-color]').forEach((item) => {
    // load the color from local storage and add it to the root
    const value = localStorage.getItem(item.id);

    if (value !== null){
        setCssVar(item.id, value)
    }
});



*/

module.exports = colorCtrl;