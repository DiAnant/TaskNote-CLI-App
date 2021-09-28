const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    let duplicateFound = false;

    for(note of notes){
        if(note.title === title){
            duplicateFound = true;
            break;
        }
    }

    if(duplicateFound){
        console.log(chalk.red.inverse("EXCEPTION: A Note With Same Title Already Exists!!"));
        return;
    }

    notes.push({
        title: title,
        body: body,
    });
    console.log(chalk.green.inverse("New Note Added"));
    saveNotes(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();
    let titleFound = false;

    for(note of notes){
        if(note.title === title)
            titleFound = true;
    }

    if(!titleFound){
        console.log(chalk.red.inverse("EXCEPTION: Requested Note Not Present in the List!"));
        return;
    }

    const newNotesList = notes.filter((note) => {
        return note.title !== title;
    });
    saveNotes(newNotesList);
    console.log(chalk.green.inverse("Note Removed"));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataString = dataBuffer.toString();
        const dataJSON = JSON.parse(dataString);
        return dataJSON;
    }
    catch(e){
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length == 0){
        console.log(chalk.red.inverse('No Notes in the List!'));
        return;
    }

    console.log(chalk.white.inverse("Your Notes :- "));
    for(note of notes){
        console.log(chalk.yellow.bold(note.title));
    }
};

const readNotes = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title === title);

    if(noteFound){
        console.log(chalk.white.inverse(noteFound.title));
        console.log(chalk.bold(noteFound.body));
    }
    else{
        console.log(chalk.red.inverse('EXCEPTION: No Such Note Found !'));
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
}