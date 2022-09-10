function showAddNewBookForm()
{
    addCardButton.forEach((button) => 
    {
        button.addEventListener('click', () => 
        {
        addBookBg.style.display = 'flex';
        })
    });
}

function hideAddNewBookForm(button)
{
    button.addEventListener('click', () => 
    {
        addBookBg.style.display = 'none';
    });
}

function Book(title, author, pages, status)
{
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function newBook()
{
    confirmButton.addEventListener('click', () => {
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookPages = document.getElementById('bookPages').value; //maybe change html to number 
        let bookStatus = document.getElementById('bookStatus').value;
        
        let book = new Book (bookTitle, bookAuthor, bookPages, bookStatus);

        myLibrary.push(book);
        console.log(myLibrary);

        //post adding
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookPages').value = '';
        document.getElementById('bookStatus').value = '';
    });
    
}



// *******variables*******
const closeFormButton = document.querySelector('#closeFormButton');
const addBookBg = document.querySelector('#addBookBg');
const confirmButton = document.querySelector('#confirmButton');
const addCardButton = document.querySelectorAll('.addCard');
const shelf = document.querySelector('#shelf');



let myLibrary = [];
// *******execution*******

hideAddNewBookForm(closeFormButton);
hideAddNewBookForm(confirmButton);
showAddNewBookForm();
newBook();
