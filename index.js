const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

const model = new NotesModel();
const notesView = new NotesView(model);

model.addNote("This is a test");
model.addNote("This is another test");
notesView.displayNotes();
