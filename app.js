// ES5 OOP
// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    // Dynamically create content
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


// Clear feilds prototype
UI.prototype.clearFeilds = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('ISBN').value = '';
}

// Listeners
// Adds the book
 document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('ISBN').value;
    
        // Instantiate a new book
        const book = new Book(title, author, isbn);

        const ui = new UI();

        if (title === '' || author === '' || isbn === '') {
            ui.showAlert('Please fill in all feilds', 'error');
        } else {

            ui.addBookToList(book);
            ui.showAlert('Success! Book added!', 'success');
            ui.clearFeilds();
        }

        e.preventDefault();
 });
// Delete a book
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    
    ui.deleteBook(e.target);
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
});