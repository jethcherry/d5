const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box"); // Initially select existing notes

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let deleteImg = document.createElement("img");
  inputBox.className = "input-box"; // Use correct class name assignment
  inputBox.setAttribute("contenteditable", true); // Set contenteditable
  deleteImg.src = "images/delete.png"; // Set image source correctly
  deleteImg.alt = "Delete Note"; // Add alt text for accessibility
  deleteImg.classList.add("delete-note"); // Add class for efficient deletion

  // Efficiently update notes array (if adding new notes)
  notes = notesContainer.querySelectorAll(".input-box");

  // Append both elements with consistent order
  notesContainer.appendChild(inputBox);
  notesContainer.appendChild(deleteImg);

  // Update storage after creation as well
  updateStorage();
});

// Improved event delegation for deleting notes (handles both existing and newly created)
notesContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "IMG" && e.target.classList.contains("delete-note")) {
    e.target.parentElement.remove(); // Remove the entire note container
    updateStorage();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

// Load notes from storage on page load
window.onload = showNotes;
