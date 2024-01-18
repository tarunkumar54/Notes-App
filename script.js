const cards = document.querySelector(".cards");
const textAreas = document.querySelectorAll(".textInput");
const addNote = document.querySelector(".addNote");
const msgBox = document.querySelector(".msgBox");

//Creating Message Box
let msgPromptBox = document.createElement("p");
document.body.append(msgPromptBox);
msgPromptBox.classList.add("msgBox");
msgPromptBox.innerHTML = "Empty Note, Discarded!";
msgPromptBox.style.visibility = "hidden";

addNote.addEventListener("click", () => {
  // Creating New Cards
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  cards.appendChild(newCard);

  // Creating New Text Areas
  let newTextArea = document.createElement("textarea");
  newCard.appendChild(newTextArea);
  newTextArea.classList.add("textInput");
  newTextArea.readOnly = true;
  newTextArea.style.cursor = "default";

  //Creating New div for Buttons
  let btnsDiv = document.createElement("div");
  newCard.append(btnsDiv);
  btnsDiv.classList.add("btns");

  //Creating Check Button
  let checkBtn = document.createElement("button");
  btnsDiv.append(checkBtn);
  checkBtn.classList.add("check");
  checkBtn.innerHTML = "&#10004";

  //Creating Edit Button
  let editBtn = document.createElement("button");
  btnsDiv.appendChild(editBtn);
  editBtn.classList.add("edit");
  editBtn.innerText = "Edit";

  //Creating Delete Button
  let delBtn = document.createElement("button");
  btnsDiv.appendChild(delBtn);
  delBtn.classList.add("delete");
  delBtn.innerHTML = "&#10006";

  //Check Button Event
  let isChecked = false;
  checkBtn.addEventListener("focus", function checkOut() {
    if (isChecked === false) {
      this.parentElement.previousSibling.style.backgroundColor =
        "rgba(94, 255, 94, 0.2)";
      isChecked = true;
      this.style.backgroundColor = "transparent";
      this.style.border = "0.5px solid grey";
    } else if (isChecked === true) {
      this.parentElement.previousSibling.style.backgroundColor =
        "rgba(37, 37, 37, 0.068)";
      isChecked = false;
      this.style.backgroundColor = "rgba(94, 255, 94, 0.2)";
      this.style.border = "none";
    }
  });

  newTextArea.addEventListener("mouseenter", function showBtns() {
    btnsDiv.style.visibility = "visible";
  });

  //Event Handling For Edit and Save
  editBtn.addEventListener("focus" && "click", function buttonSystem() {
    if (editBtn.innerText === "Edit") {
      newTextArea.readOnly = false;
      newTextArea.focus();
      newTextArea.style.cursor = "text";
      newTextArea.style.backgroundColor = "rgba(255, 255, 255, 0.288)";
      editBtn.innerText = "Save";
    } else if (editBtn.innerText === "Save") {
      newTextArea.style.cursor = "default";
      newTextArea.readOnly = true;
      editBtn.innerText = "Edit";
      newTextArea.style.backgroundColor = "rgba(37, 37, 37, 0.068)";
      btnsDiv.style.visibility = "hidden";
    }

    //Handling auto save
    function handleClickOutside(event) {
      if (event.target !== newCard && !newCard.contains(event.target)) {
        newTextArea.style.cursor = "default";
        newTextArea.readOnly = true;
        editBtn.innerText = "Edit";
        if (
          newTextArea.style.backgroundColor === "rgba(94, 255, 94, 0.2)" ||
          checkBtn.style.backgroundColor === "transparent"
        ) {
          newTextArea.style.backgroundColor = "rgba(94, 255, 94, 0.2)";
        } else {
          newTextArea.style.backgroundColor = "rgba(37, 37, 37, 0.068)";
        }
        btnsDiv.style.visibility = "hidden";
        if (newTextArea.textLength === 0) {
          delEmpty();
          return;
        }
      }
    }
    document.addEventListener("click", handleClickOutside);

    //Auto Increase textarea size
    function autoResize(textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 2 + "px";
    }
    newTextArea.addEventListener("input", function () {
      autoResize(newTextArea);
    });
  });

  //Action Delete
  delBtn.addEventListener("click", () => {
    newCard.remove();
  });

  //Hide buttons
  newCard.addEventListener("mouseleave", function hideBtns() {
    if (editBtn.innerText === "Edit") {
      btnsDiv.style.visibility = "hidden";
    }
  });

  //Delete Empty Notes
  function delEmpty() {
    if (newTextArea.textLength === 0) {
      newCard.remove();
    }
  }
  if (editBtn.innerText === "Save") {
    editBtn.addEventListener("click", delEmpty);
  }
});
