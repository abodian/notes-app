/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("jest-fetch-mock").enableMocks();
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const NotesClient = require("./notesClient");

jest.mock("./notesClient.js");

describe("Notes view", () => {
  let notesModel, notesView, notesClient;
  beforeEach(() => {
    NotesClient.mockClear();
    document.body.innerHTML = fs.readFileSync("./index.html");

    notesClient = new NotesClient();
    notesModel = new NotesModel();
    notesView = new NotesView(notesModel, notesClient);
  });

  it("displays no notes if none added", () => {
    notesView.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(0);
  });

  it("adds a note and displays them", () => {
    notesModel.addNote("This is a test note");
    notesView.displayNotes();

    expect(document.querySelectorAll(".note").length).toBe(1);
  });

  it("adds a note and displays them correctly when display called twice", () => {
    notesModel.addNote("This is a test note");
    notesView.displayNotes();

    expect(document.querySelectorAll("div.note").length).toBe(1);

    notesView.displayNotes();
    expect(document.querySelectorAll("div.note").length).toBe(1);
  });

  it("adds a note element to the page from user input", () => {
    const noteInput = document.querySelector("#note-input");
    const noteButton = document.querySelector("#add-note-button");

    noteInput.value = "Test note 1";
    noteButton.click();
    expect(noteInput.value).toBe("");

    noteInput.value = "Test note 2";
    noteButton.click();
    expect(noteInput.value).toBe("");

    const notes = document.querySelectorAll("div.note");
    expect(notes.length).toBe(2);
    expect(notes[0].innerText).toBe("Test note 1");
    expect(notes[1].innerText).toBe("Test note 2");
  });

  it("should call loadNotes on the notesClient", (done) => {
    notesView.displayNotesFromApi();
    expect(notesClient.loadNotes).toHaveBeenCalled();
    done();
  });

  it("displayNotesFromApi loads notes from server and displays the received notes", (done) => {
    notesClient.loadNotes.mockImplementation((callback) => {
      callback(["Feed lawn", "Mow dog"]);
    });

    notesView.displayNotesFromApi();
    const notes = document.querySelectorAll("div.note");
    expect(notes.length).toBe(2);
    expect(notes[0].innerText).toBe("Feed lawn");
    expect(notesClient.loadNotes).toHaveBeenCalled();
    expect(notesModel.getNotes()).toEqual(["Feed lawn", "Mow dog"]);
    done();
  });

  it("displayError displays an error on the page", () => {
    notesView.displayError("Oops, something went wrong!");
    const error = document.querySelectorAll("h3.error");

    expect(error[0].innerText).toBe("Oops, something went wrong!");
  });

  it("deletes all notes after button click", () => {
    const button = document.querySelector("#delete-notes-button");
    button.click();

    expect(notesClient.deleteNotes).toHaveBeenCalled();
  });
});
