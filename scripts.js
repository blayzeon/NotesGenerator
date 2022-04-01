/* 
            --- N O T E S G E N E R A T O R ---
    ~'.'.'.'... Created by Kristine Carter ...'.'.'.'~
        -==--------------- 2021 ---------------==- 

*/

const form = [
    {
        opening: false,
        closing: false
    },
    {
        type: 'textarea',
        placeholder: 'scratchpad for jotting down information (not included in notes)',
        copy: false,
        reset: true
    },
    {
        label: 'rep',
        type: 'input',
        placeholder: 'your full name',
        copy: false,
        reset: false
    },
    {
        label: 'issue',
        type: 'input',
        placeholder: 'the reasson for the customer\'s call',
        copy: true,
        reset: true
    },
    {
        label: 'facility',
        type: 'input',
        placeholder: 'the inmate\'s facility',
        copy: true,
        reset: true
    },
    {
        label: 'product',
        type: 'select',
        options: [
            '',
            'ConnectNetwork',
            'GettingOut',
            'VisManager'
        ],
        placeholder: "the Viapath product that the customer needs assistance with",
        copy: false,
        reset: false
    },
    {
        label: 'resolution',
        type: 'input',
        placeholder: 'how you assisted the customer',
        copy: true,
        reset: true
    },
];

function copyStr(str){
    const copyArea = document.createElement('textarea');
    copyArea.value = str;
    copyArea.setAttribute('readonly', '');
    document.body.appendChild(copyArea);
    copyArea.select();
    document.execCommand('copy');
    copyArea.remove();
}

function createForm(itemArray){
    const form = document.createElement('form');

    for (let i = 0; i < itemArray.length; i += 1){
        if (!itemArray[i].type) { continue };

        const formItem = document.createElement('div');
        formItem.classList.add('form-group');

        if (itemArray[i].label){
            const newLabel = document.createElement('label');
            newLabel.innerText = `${itemArray[i].label}: `;
            formItem.appendChild(newLabel);
        }

        const newInput = document.createElement(itemArray[i].type);
        if (itemArray[i].reset){
            newInput.setAttribute('data', 'reset');
        }

        if (itemArray[i].copy){
            newInput.setAttribute('data', 'copy');
        }

        if (itemArray[i].options){
            for (let j = 0; j < itemArray[i].options.length; j += 1){
                const newOption = document.createElement('option');
                newOption.value = itemArray[i].options[j];
                newOption.innerText = itemArray[i].options[j];
                newInput.appendChild(newOption);
            }
        } else if (itemArray[i].placeholder){
            newInput.setAttribute('placeholder', itemArray[i].placeholder);
        }

        formItem.appendChild(newInput);
        form.appendChild(formItem);
    }

    const formButtons = document.createElement('div');
    formButtons.classList.add('form-group');

    const copyBtn = document.createElement('button');
    copyBtn.setAttribute('type', 'button');
    copyBtn.innerText = 'copy';
    formButtons.appendChild(copyBtn);

    copyBtn.addEventListener('click', ()=>{
        const formValues = Array.from(document.querySelectorAll('[data="copy"]'))
            .map((x) => {return x.value})
            .filter((a) => a);
        let noteString = formValues.join(' / ');

        if (itemArray[0].opening){
            noteString = `${itemArray[0].opening} ${noteString}`;
        }

        if (itemArray[0].closing){
            noteString = `${noteString} ${itemArray[0].closing}`;
        }

        copyStr(noteString);
    });

    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('type', 'button');
    resetBtn.innerText = 'reset';
    formButtons.appendChild(resetBtn);

    form.appendChild(formButtons);

    resetBtn.addEventListener('click', ()=>{
        // resets the items on the form based on data reset
        const a = confirm('Would you like to reset this form?');
        if (a) {
            const resetItems = document.querySelectorAll('[data="reset"]');
            resetItems.forEach((item)=>{
                item.value = '';
            });
        };
    });

    return form;
}

const cnForm = createForm(form);
const container = document.getElementById('main-left');
container.appendChild(cnForm);
