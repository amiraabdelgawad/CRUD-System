let bookmarkName = document.getElementById("bookmark-name");
let bookmarkUrl = document.getElementById("bookmark-url");
let mainBtn = document.getElementById("mainBtn");
let bookmarkNameAlert = document.getElementById("bookmarkNameAlert");
let bookmarkURLAlert = document.getElementById("bookmarkURLAlert");
let bookmarkEmptyAlert = document.getElementById("empty-input-alert");
let searchInput = document.getElementById("search-input");
let bookmarks;
let currentIndex = 0;
//check if local storage is empty or not
if (localStorage.getItem("bookmarksList") == null) {
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmark();
}

mainBtn.onclick = function () {
  if (bookmarkName.value == "" || bookmarkUrl.value == "") {
    bookmarkEmptyAlert.innerHTML = "Please fill in required data !";
  } else if (mainBtn.innerHTML == "Add Bookmark") {
    addBookmark();
  } else {
    submitEdit();
  }

  clearForm();
  displayBookmark();
};

// add bookmark function
function addBookmark() {
  if (validateBookMarkName() == true && validateBookMarkUrl() == true) {
    let bookmark = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  }
}

// display all bookmarks
function displayBookmark() {
  let cartoona = "";
  for (let i = 0; i < bookmarks.length; i++) {
    cartoona += `<div class="bookmark-data d-flex justify-content-between w-75 m-auto mb-3">
            <div class="styling">${bookmarks[i].name}</div>
            <div>
                <button class="btn myBtn">
                    <a href="https://${bookmarks[i].url}" target="_blank" class=" text-decoration-none text-white">Visit</a> 
                </button>
                <button id="edit" class="btn" onclick="editBookmark(${i})">
                    <a class="text-decoration-none text-white" href="#bookmark">Edit</a> 
                </button>
                <button id="delete" class="btn bg-pink" onclick="deleteBookmark(${i})">Delete</button>
            </div>
        </div>`;
  }

  document.getElementById("view").innerHTML = cartoona;
}

/********************** edit bookmark functions ********************/
function editBookmark(index) {
  bookmarkName.value = bookmarks[index].name;
  bookmarkUrl.value = bookmarks[index].url;
  mainBtn.innerHTML = "Edit Bookmark";
  currentIndex = index;
}

function submitEdit() {
  bookmarks[currentIndex].name = bookmarkName.value;
  bookmarks[currentIndex].url = bookmarkUrl.value;

  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  mainBtn.innerHTML = "Add Bookmark";
}

//delete bookmark function
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  displayBookmark();
}

/********************** validations functions ********************/

function validateBookMarkName() {
  let regex = /^[A-Z][a-z A-Z 0-9]{3,10}$/;
  if (regex.test(bookmarkName.value) == true) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");

    bookmarkNameAlert.classList.add("d-none");
    bookmarkNameAlert.classList.remove("d-block");

    mainBtn.disabled = false;

    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");

    bookmarkNameAlert.classList.add("d-block");
    bookmarkNameAlert.classList.remove("d-none");

    mainBtn.disabled = true;

    return false;
  }
}
function checkDuplicatedNames() {
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarkName.value == bookmarks[i].name) {
      bookmarkName.classList.add("is-invalid");
      bookmarkName.classList.remove("is-valid");

      bookmarkNameAlert.classList.add("d-block");
      bookmarkNameAlert.classList.remove("d-none");

      bookmarkNameAlert.innerHTML = "Bookmark Name Already Exists";
      mainBtn.disabled = true;
    }
  }
}

function validateBookMarkUrl() {
  let regex = /^(www)\.[a-z 0-9\-\.]+\.(com|net|org)$/i;

  if (regex.test(bookmarkUrl.value) == true) {
    bookmarkUrl.classList.add("is-valid");
    bookmarkUrl.classList.remove("is-invalid");

    bookmarkURLAlert.classList.add("d-none");
    bookmarkURLAlert.classList.remove("d-block");

    mainBtn.disabled = false;

    return true;
  } else {
    bookmarkUrl.classList.add("is-invalid");
    bookmarkUrl.classList.remove("is-valid");

    bookmarkURLAlert.classList.add("d-block");
    bookmarkURLAlert.classList.remove("d-none");

    mainBtn.disabled = true;
    return false;
  }
}

function clearForm() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}

/********************** search function ********************/

function search(term) {
  var cartona = "";
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<div class="bookmark-data d-flex justify-content-between w-75 m-auto mb-3">
            <div class="styling">${bookmarks[i].name}</div>
            <div>
                <button class="btn myBtn">
                    <a href="https://${bookmarks[i].url}" target="_blank" class=" text-decoration-none text-white">Visit</a> 
                </button>
                <button id="edit" class="btn" onclick="editBookmark(${i})">
                    <a class="text-decoration-none text-white" href="#bookmark">Edit</a> 
                </button>
                <button id="delete" class="btn bg-pink" onclick="deleteBookmark(${i})">Delete</button>
            </div>
        </div>`;
    }
    document.getElementById("view").innerHTML = cartona;
  }
}

bookmarkName.addEventListener("keyup", validateBookMarkName);
bookmarkName.addEventListener("blur", checkDuplicatedNames);
bookmarkUrl.addEventListener("keyup", validateBookMarkUrl);
searchInput.addEventListener("keyup", function (e) {
  search(e.target.value);
});
