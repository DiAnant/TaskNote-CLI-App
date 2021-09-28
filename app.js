const validator = require('validator');
const chalk = require('chalk');
const notes = require('./notes');
const yargs = require('yargs');
const { addNote } = require('./notes');
const { string, argv } = require('yargs');

/*
We want following features in our to-do list for the user to do
    -> add
    -> remove
    -> read
    -> list
*/

// Creating Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})

// Creating Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type: string,
        }
    },
    handler(argv){
        notes.removeNote(argv.title);    
    }
})

// Creating List Command
yargs.command({
    command: 'list',
    describe: 'Listing a new note',
    handler(){
        notes.listNotes();
    }
})

// Creating Read Command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: string,
        },
    },
    handler(argv){
        notes.readNotes(argv.title);
    }
})

yargs.parse();