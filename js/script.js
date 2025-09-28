const myLibrary = [];

function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    this.id = uuid.v4();
};

function addBookToLibrary(title, author, pages, readState) {
    let book = new Book(title, author, pages, readState);
    
    myLibrary.push(book);

    return myLibrary;
};

console.log(addBookToLibrary("Star Wars: Episode I", "George Lucas", "440 pages", "read"))
console.log(addBookToLibrary("Star Wars: Episode II", "George Lucas", "620 pages", "not read yet"))