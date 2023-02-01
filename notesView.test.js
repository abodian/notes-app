/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("jest-fetch-mock").enableMocks();
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const { default: JSDOMEnvironment } = require("jest-environment-jsdom");

let notesClient;
let notesModel;

describe("Notes view", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    notesClient = {
      loadNotes: jest.fn(),
      createNote: jest.fn(),
    };
    notesModel = {
      setNotes: jest.fn(),
    };
  });

  it("gets the list of notes from the model", () => {
    const model = new NotesModel();
    const notesView = new NotesView(model);

    model.addNote("This is a test note");
    model.addNote("This is another test note");
    notesView.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("adds a note element to the page from user input", () => {
    const model = new NotesModel();
    const notesView = new NotesView(model);

    input = document.querySelector("#note-input");
    input.value = "My new amazing test note";

    button = document.querySelector("#add-note-button");
    button.click();
    const notes = document.querySelectorAll("div.note");
    expect(notes.length).toBe(1);
    expect(notes[0].innerText).toBe("My new amazing test note");
  });

  it("should call loadNotes on the notesClient", (done) => {
    const view = new NotesView(notesModel, notesClient);
    view.displayNotesFromApi();
    expect(notesClient.loadNotes).toHaveBeenCalled();
    done();
  });

  it("displayNotesFromApi loads notes from server and displays the received notes", (done) => {
    const notesModel = new NotesModel();
    const notesView = new NotesView(notesModel, notesClient);

    notesClient.loadNotes.mockImplementation((callback) => {
      callback(["Feed lawn", "Mow dog"]);
    });

    notesView.displayNotesFromApi();
    const notes = document.querySelectorAll("div.note");
    expect(notes.length).toBe(2);
    expect(notes[0].innerText).toBe("Feed lawn");
    done();
  });
});
