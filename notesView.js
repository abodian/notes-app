class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector("#main-container");
    this.addNoteButton = document.querySelector("#add-note-button");
    this.noteInput = document.querySelector("#note-input");

    this.addNoteButton.addEventListener("click", () => {
      const newNote = document.querySelector("#note-input").value;
      this.addNewNote(newNote);
      this.noteInput.value = "";
    });
  }

  displayNotes() {
    document.querySelectorAll(".note").forEach((element) => {
      element.remove();
    });
    const allNotes = this.model.getNotes();
    allNotes.forEach((note) => {
      const newElement = document.createElement("div");
      newElement.className = "note";
      newElement.innerText = note;

      this.mainContainerEl.append(newElement);
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.client.createNote(newNote);
    this.displayNotes();
  }

  displayNotesFromApi() {
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;
