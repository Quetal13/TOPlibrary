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
    const bookReadState = document.createElement("span");
    const deleteBook = document.createElement('button');

    bookCard.id = book.id;
    bookCard.className = 'card';

    bookTitle.textContent = book.title;
    
    bookAuthor.textContent = book.author;

    bookPages.textContent = book.pages;

    bookReadState.textContent = book.readState;

    deleteBook.textContent = 'Delete Book';

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookReadState);
    bookCard.appendChild(deleteBook);

    booksContainer.appendChild(bookCard);

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
    let newBookRead = '';

    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    event.preventDefault();
    clearForm();
})

//This function delete the book that correspond with the book id passed as argument
function deleteBookFromLibrary(bookId) {
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    
    renderBooks();
};


addBookToLibrary("Star Wars: Episode II", "George Lucas", "620 pages", "not read yet");

console.log(myLibrary);