/* 
    When provided with form elements and a template, it will produce notes
*/

// Current date, formatted
const date = new Date();
const currDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

// Split strings
function initializeString(nameToSplit) {
    const splitName = nameToSplit.split(' ');
    const formattedName = splitName.length > 1 ? `${splitName[0][0]}.${splitName[1][0]}` : `REP DID NOT PROVIDE NAME FOR NOTE`;

    return formattedName;
}

// Create the notes
function generateNotes(data, afterEach=' ', beforeEach=false, beginning=false, ending=false) {
    const result = [];

    if (beginning) {
        result.push(beginning);
    }

    data.forEach((note) => {
        if (beforeEach) {
            result.push(beforeEach);
        }

        result.push(note);

        if (afterEach) {
            result.push(afterEach);
        }
    });

    if (ending) {
        result.push(ending);
    }

    return result.join(' ');
}

// Copy an elm's contents
function copyContents(coords, elm, container) {
    if (!elm.value) {
        return;
    }


    // create a popup
    const popup = document.createElement('span');
    popup.innerText = 'copied!';
    popup.classList.add('popup');
    popup.style.position = 'absolute';
    popup.style.zIndex = 1;
    popup.style.top = `${coords.y}px`;
    popup.style.left = `${coords.x}px`;
    popup.style.backgroundColor = "white";

    container.appendChild(popup);
    /* 
        copy text - solution from 
        https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    */

    elm.select();
    elm.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(elm.value);

    setTimeout(function(){
        popup.remove();
    }, 2000);
}

// create the form
function generateNoteForm(formTemplate) {
    const form = document.createElement('form');
    form.setAttribute('id', 'form-container');

    function addItem(item) {
        const container = document.createElement('div');
        if (item.label) {
            const label = document.createElement('label');
            label.innerText = item.label + ': ';
            label.setAttribute('for', `form-${item.label}`)
            container.appendChild(label);
        }

        const input = document.createElement(item.elm);
        input.setAttribute('id', `form-${item.label}`)
        if (item.elm === 'input') {
            input.setAttribute('type', item.type);
        }

        if (item.text) {
            input.innerText = item.text;
        }
        
        if (item.placeholder) {
            input.setAttribute('placeholder', item.placeholder);
        }

        if (item.datalist) {
            input.setAttribute('datalist', item.datalist);
        }

        if (item.forNote) {
            input.setAttribute('data-note', 'true');
        }

        if (item.data) {
            input.setAttribute(item.data[0], item.data[1]);
        }

        container.appendChild(input);
        
        // we don't want containers if there is no label
        const toAppend = item.label ? container : input;

        if (document.querySelector('#form-container')) {
            const children = Array.from(form.querySelectorAll('div'));
            lastChild = children[children.length-1];
            form.insertBefore(toAppend, lastChild);
        } else {
            form.appendChild(toAppend);
        }
    }

    formTemplate.forEach((item) => {
        addItem(item);
    });

    function copyGeneratedNote(e){
        const coords = {
            x: e.clientX,
            y: e.clientY
        }
        copyContents(coords, output, form);
    }

    const output = document.createElement('textarea');
    output.setAttribute('placeholder', 'your notes will generate here')
    output.addEventListener('click', (e)=> {
        copyGeneratedNote(e);
    });
    form.appendChild(output);

    form.addEventListener('change', ()=>{
        const noteData = [];
        const includeWithNote = form.querySelectorAll('[data-note="true"]');
        includeWithNote.forEach((item) => {
            if (item.value) {
                noteData.push(item.value);
            }
        });
        const newNote = generateNotes(noteData, '/', beforeEach, beginning, ending);
        output.innerText = newNote;
    });

    const copy = document.createElement('button');
    copy.innerText = 'copy & reset';
    copy.setAttribute('type', 'reset');
    copy.addEventListener('click', (e)=>{
        copyGeneratedNote(e);
    });

    form.appendChild(copy);

    const reset = document.createElement('button');
    reset.innerText = 'reset';
    reset.setAttribute('type', 'reset');
    reset.addEventListener('click', (e)=> {
        const a = confirm('Are you sure you wish to reset the form?');
        if (!a) {
            e.preventDefault();
            return;
        }

        output.innerText = '';
    });

    form.appendChild(reset);
    
    return {
        form,
        addItem
    };
}

module.exports = generateNoteForm;