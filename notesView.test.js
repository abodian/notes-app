/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

describe("Notes view", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("gets the list of notes from the model", () => {
    const model = new NotesModel();
    const notesView = new NotesView(model);

    model.addNote("This is a test note");
    model.addNote("This is another test note");
    notesView.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });
});

// have a constructor
// the model should be dependency-injected into it.
// have a method displayNotes which will:
// get the list of notes from the model.
// for each note, create a new div element on the page
// (with an HTML class "note").
