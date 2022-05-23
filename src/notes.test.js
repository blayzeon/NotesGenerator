const notes = require('./notes.js');

test('notes can generate a note with slashes in between', ()=> {
    const notesToFormat = [
        'value1',
        'value2',
        'value3'
    ]

    const result = "value1 / value2 / value3 /";

    expect(notes(notesToFormat, '/')).toBe(result);
});

test('notes can generate a note with an opening and closing', ()=> {
    const opening = 'as per the customer,';

    const notesToFormat = [
        'value1'
    ];

    const closing = 'k.c. 5/23/22';

    const result = `${opening} value1 ${closing}`;

    expect(notes(notesToFormat, false, false, opening, closing)).toBe(result);
});