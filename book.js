const myLibrary = [];
const libraryContainer = document.querySelector('.library-container');
const showDialogButton = document.querySelector('#show-dialog-button');
const dialog = document.querySelector('.new-book-dialog');
const closeModalButton = document.querySelector('#close-modal');
const addBookButton = document.querySelector('#add-new-book');

// Form elements
const textTitle = document.querySelector('#title');
const textAuthor = document.querySelector('#author');
const numberPages = document.querySelector('#pages');
const radioButtons = document.getElementsByName('read');
const radioRead = document.querySelector('input[name=read]:checked');

// Form error p elements
const titleError = document.querySelector('#title-error');
const authorError = document.querySelector('#author-error');
const pagesError = document.querySelector('#pages-error');
const radioError = document.querySelector('#radio-error');

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayMyLibrary() {
  clearLibraryDisplay();

  myLibrary.forEach((book, i) => {
    // Create elements
    const newDiv = document.createElement('div');
    const newTitle = document.createElement('div');
    const newAuthor = document.createElement('div');
    const newPages = document.createElement('div');
    const newIsRead = document.createElement('button');
    const newDelete = document.createElement('button');

    // Assign book content to new elements
    newTitle.textContent = book.title;
    newAuthor.textContent = book.author;
    newPages.textContent = book.pages + ' pages';
    newIsRead.textContent = book.isRead;
    newDelete.textContent = 'Delete';

    // Assign classes
    newDiv.classList.add('book-row');
    newDiv.setAttribute('data-index', i);
    newTitle.classList.add('book-row-cell');
    newAuthor.classList.add('book-row-cell');
    newPages.classList.add('pages', 'book-row-cell');
    newIsRead.classList.add('is-read', 'is-read-button', 'book-row-cell');
    if (book.isRead === 'Yes') {
      newIsRead.classList.add('has-read');
    }
    newDelete.classList.add('delete-button', 'book-row-cell');

    // Append
    newDiv.append(newTitle, newAuthor, newPages, newIsRead, newDelete);
    libraryContainer.appendChild(newDiv);

    // arrayIndex += 1;
  });
}

function clearLibraryDisplay() {
  while (libraryContainer.children[1]) {
    libraryContainer.removeChild(libraryContainer.children[1]);
  }
}

function getNewBookData() {
  const newTitle = document.querySelector('#title').value;
  const newAuthor = document.querySelector('#author').value;
  const newPages = document.querySelector('#pages').value;
  const newRead = document.querySelector('input[name=read]:checked').value;

  console.log(newTitle, newAuthor, newPages, newRead);

  const newBook = new Book(newTitle, newAuthor, newPages, newRead);
  console.log({ newBook });
  return newBook;
}

function showError() {
  clearErrorText();

  if (textTitle.validity.valueMissing) {
    titleError.textContent = 'Please enter a title';
  }

  if (textAuthor.validity.valueMissing) {
    authorError.textContent = 'Please enter an author';
  }

  if (numberPages.validity.valueMissing) {
    pagesError.textContent = 'Please enter pages';
  } else if (numberPages.validity.typeMismatch) {
    pagesError.textContent = 'Only numbers are acceptable';
  }

  if (!checkRadioValidity()) {
    radioError.textContent = 'Please choose read or unread';
  }
}

function checkRadioValidity() {
  let isRadioValid = false;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      isRadioValid = true;
    }
  });
  return isRadioValid;
}

function clearErrorText() {
  titleError.textContent = '';
  authorError.textContent = '';
  pagesError.textContent = '';
  radioError.textContent = '';
}

textTitle.addEventListener('input', () => {
  if (textTitle.validity.valid) {
    titleError.textContent = ''; // Reset the content of the message
  } else {
    showError();
  }
});

textAuthor.addEventListener('input', () => {
  if (textAuthor.validity.valid) {
    authorError.textContent = ''; // Reset the content of the message
  } else {
    showError();
  }
});

numberPages.addEventListener('input', () => {
  if (numberPages.validity.valid) {
    pagesError.textContent = ''; // Reset the content of the message
  } else {
    showError();
  }
});

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', () => {
    if (checkRadioValidity()) {
      radioError.textContent = '';
    }
  });
});

// Read book button listener
libraryContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('is-read-button')) {
    const readButton = e.target;
    const bookIndex = readButton.parentElement.getAttribute('data-index');
    if (readButton.textContent === 'Yes') {
      myLibrary[bookIndex].isRead = 'No';
      readButton.textContent = 'No';
    } else {
      myLibrary[bookIndex].isRead = 'Yes';
      readButton.textContent = 'Yes';
    }
    readButton.classList.toggle('has-read');
  }
});

// Delete button listener
libraryContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-button')) {
    const deleteButton = e.target;
    const bookRow = deleteButton.parentElement;
    const bookIndex = bookRow.getAttribute('data-index');
    // splice
    myLibrary.splice(bookIndex, 1);
    displayMyLibrary();
  }
});

// Dialog listener
showDialogButton.addEventListener('click', function () {
  dialog.showModal();
});

// Dialog close listener
closeModalButton.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#book-form').reset();
  clearErrorText();
  dialog.close();
});

// Dialog submit form listener
addBookButton.addEventListener('click', function (e) {
  let isFormValid = true;

  if (!textTitle.validity.valid) {
    isFormValid = false;
  }
  if (!textAuthor.validity.valid) {
    isFormValid = false;
  }
  if (!numberPages.validity.valid) {
    isFormValid = false;
  }

  if (!checkRadioValidity()) {
    isFormValid = false;
  }

  if (!isFormValid) {
    showError();
    e.preventDefault();
    return;
  }

  const newBook = getNewBookData();
  addBookToLibrary(newBook);

  document.querySelector('#book-form').reset();
  clearErrorText();

  dialog.close();
  displayMyLibrary();
});

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'No');
const oneFishTwoFish = new Book('One Fish Two Fish', 'Dr Seuss', 62, 'Yes');
const nineteen = new Book('1984', 'George Orwell', 328, 'Yes');

addBookToLibrary(theHobbit);
addBookToLibrary(oneFishTwoFish);
addBookToLibrary(nineteen);

displayMyLibrary();
// console.log(theHobbit.info());
// console.log(myLibrary[1]);
