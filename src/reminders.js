const reminders = (function () {
    // creates reminders for the agent that they can delete by clicking on the label for them
    function createReminder (inputLabel, inputType) {
        const container = document.createElement('div');
        container.classList.add('reminder-group');
    
        const label = document.createElement('label');
        label.innerText = `${inputLabel}: `;
        container.appendChild(label);
    
        if (inputType === 'textarea'){
            const textarea = document.createElement('textarea');
            container.appendChild(textarea);
        } else {
            const input = document.createElement('input');
            input.setAttribute('type', inputType);
            container.appendChild(input);
        }

        function deleteReminder(){
            a = confirm('Are you sure you wish to delete this reminder?');
            if (!a) { return }

            container.remove();
        }

        label.addEventListener('click', deleteReminder);
    
        return container;
    }

    const container = document.createElement('div');
    container.classList.add('reminder-container');

    const topItems = document.createElement('div');
    container.appendChild(topItems);
    topItems.appendChild(createReminder('general', 'textarea'));

    const labelInput = document.createElement('input');
    labelInput.setAttribute('placeholder', 'reminder label');
    container.appendChild(labelInput);

    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.value = 'Create Reminder';
    container.appendChild(button);

    const children = document.createElement('span');
    children.setAttribute('id', 'reminder-content');

    console.log(localStorage.getItem(children.id));
    const reminderItems = JSON.parse(localStorage.getItem(children.id)) || []; 
    console.log(reminderItems);

    if (reminderItems.length > 0){
        for (let i = 0; i < reminderItems.length; i += 1){
            children.appendChild(createReminder(reminderItems[i], 'checkbox'));
        }
    }

    container.appendChild(children);

    function getReminderInfo(){
        const label = labelInput.value;
        if (label){
            const newReminder = createReminder(label, 'checkbox');

            children.appendChild(newReminder);
            reminderItems.push(label);
            localStorage.setItem(children.id, JSON.stringify(reminderItems));
        }
    }

    button.addEventListener('click', getReminderInfo);

    return container;
})();

module.exports = reminders;
