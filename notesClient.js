class NotesClient {
  loadNotes(callback, errorCallback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }

  createNote(note) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: note }),
    })
      .then((response) => response.json())
      .then((note) => {
        console.log("Success", note);
      });
  }
}

module.exports = NotesClient;
