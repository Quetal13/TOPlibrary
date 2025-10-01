// Variables for accessing to some DOM element
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const pagesInput = document.getElementById('book-pages');
const readInput = document.getElementById('book-read');
const submitButton = document.getElementById('add-book-button');

const booksContainer = document.getElementById('books-container');

//Array of book objects
let myLibrary = [];

//This function is a constructor for make book objects
function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    this.id = uuid.v4();

    
};

//This function add new books to myLibrary array using the Book constructor
function addBookToLibrary(title, author, pages, readState) {
    const book = new Book(title, author, pages, readState);
    
    myLibrary.push(book);

    renderBooks();

    return myLibrary;
};


//This function generate all the elements of the book card
function cardGenerator(book) {
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("span");
    const bookPages = document.createElement("span");
    const readStateCheckBox = document.createElement("input");
    const bookReadState = document.createElement("span");
    const readStateContainer = document.createElement("div");
    const deleteBook = document.createElement('button');

    bookCard.id = book.id;
    bookCard.className = 'card';

    bookTitle.textContent = book.title;
    
    bookAuthor.textContent = `Author: ${book.author}`;

    bookPages.textContent = `Pages: ${book.pages}`;

    readStateCheckBox.type = 'checkbox';

    readStateCheckBox.id = `read-status=${book.id}`

    if (book.readState === true) {
        bookReadState.textContent = ' read';
    } else {
        bookReadState.textContent = ' not read yet';
    };

    deleteBook.textContent = 'Delete Book';

    readStateContainer.appendChild(readStateCheckBox);
    readStateContainer.appendChild(bookReadState);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(readStateContainer);
    bookCard.appendChild(deleteBook);

    booksContainer.appendChild(bookCard);

    readStateCheckBox.addEventListener('change', function (){
        const targetBook = myLibrary.find(item => item.id === book.id)

        if (targetBook) {
            targetBook.toggleReadState();

            renderBooks();
        };
    });

    //Event listener for deleteBook button

    deleteBook.addEventListener('click', function (){
        const bookId = bookCard.id;
        
        deleteBookFromLibrary(bookId);
        });
};

//This function calls de cardGenerator function for display the new books in the page.
function renderBooks() {
    booksContainer.innerHTML = '';

    myLibrary.forEach(book => {
        cardGenerator(book);
    });
};

//This function clear all the data in the form fields
function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
};

//This event listener calls the addBookToLibrary function when the user clicks the form submit button
submitButton.addEventListener('click', function(event) {
    let newBookTitle = titleInput.value;
    let newBookAuthor = authorInput.value;
    let newBookPages = pagesInput.value;
    let newBookRead = readInput.checked;

    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    event.preventDefault();
    clearForm();
})

//This function delete the book that correspond with the book id passed as argument
function deleteBookFromLibrary(bookId) {
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    
    renderBooks();
};

Book.prototype.toggleReadState = function () {
    this.readState = !this.readState;
};

addBookToLibrary("Star Wars: Episode II", "George Lucas", "620 pages", false);

console.log(myLibrary);