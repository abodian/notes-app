const NotesModel = require("./notesModel");

describe("notesModel class", () => {
  beforeEach(() => {
    model = new NotesModel();
  });

  it("gets all notes", () => {
    expect(model.getNotes()).toEqual([]);
  });

  it("adds two notes", () => {
    model.addNote("Buy milk");
    model.addNote("Go to the gym");

    expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
  });

  it("resets note list and gives empty array", () => {
    model.addNote("Buy milk");
    model.reset();

    expect(model.getNotes()).toEqual([]);
  });
});
