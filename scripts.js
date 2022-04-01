/* 
            --- N O T E S G E N E R A T O R ---
    ~'.'.'.'... Created by Kristine Carter ...'.'.'.'~
        -==--------------- 2021 ---------------==- 

*/

const form = [
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
        reset: false,
        id: "rep-name"
    },
    {
        label: 'issue',
        type: 'input',
        placeholder: 'the reason for the customer\'s call',
        copy: true,
        reset: true
    },
    {
        label: 'customer',
        type: 'input',
        placeholder: 'the customer\'s first and last name',
        copy: true,
        reset: true,
        id: "customer-name"
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
        reset: false,
        id: "product"
    },
    {
        label: 'resolution',
        type: 'input',
        placeholder: 'how you assisted the customer',
        copy: true,
        reset: true,
        id: "resolution"
    },
];

const cnItems = [
    {
        label: 'passcode',
        type: 'input',
        placeholder: 'customer\'s 4-to-8-digit passcode',
        copy: true,
        reset: true,
    },
];

const goItems = [
    {
        label: 'email',
        type: 'input',
        placeholder: 'customer\'s email address',
        copy: true,
        reset: true,
    },
    {
        label: 'inmate',
        type: 'input',
        placeholder: 'the inmate\'s first and last name',
        copy: true,
        reset: true,
    },
];

const vmItems = [
    {
        label: 'dob',
        type: 'input',
        placeholder: 'the customer\'s date of birth',
        copy: false,
        reset: true,
    },
    {
        label: 'inmate id',
        type: 'input',
        placeholder: 'the inmate\'s ID number',
        copy: true,
        reset: true,
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

function createForm(itemArray, buttons=true){
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
            newInput.setAttribute('data-reset', 'reset');
        }

        if (itemArray[i].copy){
            newInput.setAttribute('data-copy', 'copy');
        }

        if (itemArray[i].id){
            newInput.setAttribute('id', itemArray[i].id);
        }

        if (itemArray[i].options){
            for (let j = 0; j < itemArray[i].options.length; j += 1){
                const newOption = document.createElement('option');
                newOption.value = itemArray[i].options[j];
                newOption.innerText = itemArray[i].options[j];
                newInput.appendChild(newOption);
            }

            newInput.addEventListener('change', ()=>{
                let productItems = undefined;

                if (newInput.value === "ConnectNetwork"){
                    productItems = cnItems;
                } else if (newInput.value === "GettingOut"){
                    productItems = goItems;
                } else if (newInput.value === "VisManager"){
                    productItems = vmItems;
                }

                if (productItems === undefined) { return };

                const newItem = createForm(productItems, false);
                form.insertBefore(newItem, formItem.nextSibling);
            });
            
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
        const formValues = Array.from(document.querySelectorAll('[data-copy="copy"]'))
            .map((x) => {return x.value})
            .filter((a) => a);
        let noteString = formValues.join(' / ');

        if (noteString.length === 0){
            // nothing to copy
            return;
        };

        // customize the note
        const product = document.querySelector('#product');
        let opening = undefined;
        let closing = undefined;
        const rep = document.querySelector('#rep-name').value;
        if (product.value === 'GettingOut'){
            // customer's name for the start of the notes
            const customer = document.querySelector('#customer-name').value;
            const customerName = customer.split(' ');
            opening = `as per ${customerName[0]}, `;

            // main notes
            noteString = `${document.querySelector('#resolution').value}`;

            // rep initials for end of notes
            const repName = rep.split(' ');
            let repInitials = rep;
            if (repName.length > 1){
                repInitials = `${repName[0][0]}.${repName[1][0]}.`;
            }

            // current date for end of notes
            const date = new Date();
            const fDate = date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });

            closing = `${repInitials} ${fDate}`;
        } else if (product.value === "VisManager"){
            opening = `GTL/${rep}`;
        }

        if (opening){
            noteString = `${opening} ${noteString}`;
        }

        if (closing){
            noteString = `${noteString} - ${closing}`;
        }

        copyStr(noteString);
    });

    if (buttons === true){
        const resetBtn = document.createElement('button');
        resetBtn.setAttribute('type', 'button');
        resetBtn.innerText = 'reset';
        formButtons.appendChild(resetBtn);

        form.appendChild(formButtons);

        resetBtn.addEventListener('click', ()=>{
            // resets the items on the form based on data reset
            const a = confirm('Would you like to reset this form?');
            if (a) {
                const resetItems = document.querySelectorAll('[data-reset="reset"]');
                resetItems.forEach((item)=>{
                    item.value = '';
                });
            };
        });
    }

    return form;
}

const cnForm = createForm(form);
const container = document.getElementById('main-left');
container.appendChild(cnForm);

const version = document.getElementById('version-number');
version.innerText = '22.401';