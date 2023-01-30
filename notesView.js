const NotesModel = require("./notesModel");

class NotesView {
  constructor(notesModel) {
    this.notesModel = notesModel;
    this.mainContainerEl = document.querySelector("#main-container");
  }
  displayNotes() {
    const allNotes = this.notesModel.getNotes();
    allNotes.forEach((note) => {
      const newElement = document.createElement("div");
      newElement.className = "note";
      newElement.innerText = note;

      this.mainContainerEl.append(newElement);
    });
  }
}

module.exports = NotesView;
