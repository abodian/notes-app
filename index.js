const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const NotesClient = require("./notesClient");

const model = new NotesModel();
const notesClient = new NotesClient();
const notesView = new NotesView(model, notesClient);

notesView.displayNotesFromApi();
