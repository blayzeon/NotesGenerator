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
function copyContents(elem) {
    console.log('todo...');
}

// create the form
const exampleForm = [
        {
            label: "scratchpad",
            elm: "textarea",
            placeholder: "scratchpad for jotting notes",
            datalist: false,
            forNote: false,
        },
        {
            label: "issue",
            type: "text",
            elm: "input",
            placeholder: "the reason for the customer's call",
            datalist: false,
            forNote: true
        },
        {
            label: "name",
            type: "text",
            elm: "input",
            placeholder: "enter the customer's full name",
            datalist: false,
            forNote: true
        },
        {
            label: "facility",
            type: "text",
            elm: "input",
            placeholder: "the inmate's facility",
            datalist: false,
            forNote: true
        },
        {
            label: "resolution",
            type: "text",
            elm: "input",
            placeholder: "the resolution you provided",
            datalist: false,
            forNote: true
        }
        
];

function generateNoteForm(formTemplate=exampleForm, afterEach, beforeEach, beginning, ending) {
    const includeWithNote = [];

    const form = document.createElement('form');
    form.setAttribute('id', 'note-form');
    formTemplate.forEach((item) => {
        const container = document.createElement('div');
        if (item.elm !== 'button') {
            const label = document.createElement('label');
            label.innerText = item.label + ': ';
            container.appendChild(label);
        }

        const input = document.createElement(item.elm);
        if (item.elm === 'input') {
            input.setAttribute('type', item.type);
        }

        if (item.placeholder) {
            input.setAttribute('placeholder', item.placeholder);
        }

        if (item.datalist) {
            input.setAttribute('datalist', item.datalist);
        }

        if (item.forNote) {
            includeWithNote.push(input);
        }

        if (item.elm === "input") {
            container.appendChild(input);
            form.appendChild(container); 
        } else {
            form.appendChild(input);
        }
    });

    const output = document.createElement('textarea');
    output.addEventListener('click', ()=> {
        copyContents(output);
    });
    form.appendChild(output);

    form.addEventListener('change', ()=>{
        const noteData = [];
        includeWithNote.forEach((item) => {
            if (item.value) {
                noteData.push(item.value);
            }
        });
        const newNote = generateNotes(noteData, '/', beforeEach, beginning, ending);
        output.innerText = newNote;
    });
    
    return form;
}

module.exports = generateNoteForm;