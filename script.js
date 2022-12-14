function showAddNewBookForm()
{
    addCardButton.forEach((button) => 
    {
        button.addEventListener('click', () => 
        {
            addBookBg.style.display = 'flex';
        });
    });
}

function hideAddNewBookForm(button)
{
    button.addEventListener('click', () => 
    {
        addBookBg.style.display = 'none';
    });
}

function showHelpCard()
{
    helpButton.addEventListener('click', () => 
    {
        helpPopupBg.style.display = 'flex';
    });
}

function hideHelpCard()
{
    closeHelpCardButton.addEventListener('click', () => 
    {
        helpPopupBg.style.display = 'none';
    });
}

function Book(title, author, pages, status)
{
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

Book.prototype.showIndex = function()
{
    return this.index;
}

function newBook()
{
    confirmButton.addEventListener('click', () => 
    {
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookPages = document.getElementById('bookPages').value; 
        let bookStatus = document.getElementById('bookStatus').checked;
        let book = new Book (bookTitle, bookAuthor, bookPages, bookStatus);
        myLibrary.push(book);
        console.log(myLibrary);
        addVisualBook(bookTitle, bookAuthor, bookPages, bookStatus);

        //reset input fields post adding
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookPages').value = '';
        document.getElementById('bookStatus').checked = true;
    });
    
}

function updateBookIndex()
{
    let i = 0;
    myLibrary.forEach(book => 
    {
        book.index = i;
        i++;
    });
    console.log('new lib');
    console.log(myLibrary);
}

function addVisualBook(title, author, pages, status)
{
    let divclass_bookCard = document.createElement('div');
    let divclass_bigLeftLetter = document.createElement('div');
    let divclass_removeButton = document.createElement('div');
    let divclass_cardContent = document.createElement('div');
    let divclass_bookTitle = document.createElement('div');
    let divclass_content = document.createElement('div');
    let div_Author = document.createElement('div');
    let div_Pages = document.createElement('div');
    let div_Status = document.createElement('div');
    let span_Status = document.createElement('span');
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    shelf.insertBefore(divclass_bookCard, shelf.lastElementChild);    
    divclass_bookCard.appendChild(divclass_bigLeftLetter);
    divclass_bookCard.appendChild(divclass_removeButton);
    divclass_bookCard.appendChild(divclass_cardContent);
    divclass_cardContent.appendChild(divclass_bookTitle);
    divclass_cardContent.appendChild(divclass_content);
    divclass_content.appendChild(div_Author);
    divclass_content.appendChild(div_Pages);
    divclass_content.appendChild(div_Status);
    div_Status.appendChild(span_Status);
    divclass_removeButton.appendChild(svg);
    svg.appendChild(path);

    divclass_bookCard.classList.add('bookCard');
    divclass_removeButton.classList.add('removeButton');
    divclass_cardContent.classList.add('cardContent');
    divclass_bookTitle.classList.add('bookTitle');
    divclass_content.classList.add('content');

    //*******editing text and attributes*******
    svg.setAttribute('style', 'width:24px;height:24px');
    svg.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');
    
    divclass_bookTitle.textContent = '\"' + title + '\"';
    div_Author.textContent = 'Author: ' + author;
    div_Pages.textContent = 'Pages: ' + pages;

    //*******linked functions*******
    let thisBook = myLibrary.find(Book => Book.title === title 
        && Book.author === author && Book.pages === pages 
        && Book.status === status);

    checkStatus(status, divclass_bigLeftLetter, div_Status);
    updateBookIndex();
    console.log(myLibrary);
    //console.log(indexLib);
    removeBook(thisBook, divclass_removeButton, divclass_bookCard);
    toggleBigLetterStatus(title, author, pages, status, divclass_bigLeftLetter, div_Status);
}

function checkStatus(status, div_bigLetter, div_status)
{
    
    if(status === true)
    {
        //for top-left letter R/U
        div_bigLetter.classList.add('readStatus');
        div_bigLetter.textContent = 'R';
        //for content
        div_status.innerHTML = 'Status: <span class="status-read">'+'Read'+'</span>';
    }
    else
    {
        //for top-left letter R/U
        div_bigLetter.classList.add('unreadStatus');
        div_bigLetter.textContent = 'U';
        //for content
        div_status.innerHTML = 'Status: <span class="status-unread">'+'Unread'+'</span>';
    }
    
}

function toggleBigLetterStatus(bookTitle, bookAuthor, bookPages, bookStatus, div_bigLetter, div_status)
{
    div_bigLetter.addEventListener('click', () => 
    {   
        let reqBook = myLibrary.find(Book => Book.title === bookTitle 
            && Book.author === bookAuthor && Book.pages === bookPages 
            && Book.status === bookStatus);

        if(bookStatus === true)
        {
            div_bigLetter.classList.remove('readStatus');
            bookStatus = false;
            reqBook.status = false;
        }
        else
        {
            div_bigLetter.classList.remove('unreadStatus');
            bookStatus = true;
            reqBook.status = true;
        }

        checkStatus(bookStatus, div_bigLetter, div_status);
        updateBookIndex();
        console.log(myLibrary);
        //console.log(reqBook);
    });
}

function removeBook(reqBook, removeButton, div_bookCard)
{
    removeButton.addEventListener('click', () => 
    {
       let findBook = reqBook.index;

        console.log(findBook);
        myLibrary.splice(findBook, 1);
        //removes from the page
        removeButton = div_bookCard.querySelector('.removeButton');
        shelf.removeChild(div_bookCard);
        updateBookIndex();
    });
}

function scrollToTop()
{
    scrollUpArrow.addEventListener('click', () =>
    {
        window.scrollTo({
            top: 0,
            left: 0, 
            behavior: "smooth"
        });
    });
}

function displayUpArrowButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollUpArrow.style.display = "block";
    } else {
      scrollUpArrow.style.display = "none";
    }
  }


// *******variables*******
const closeFormButton = document.querySelector('#closeFormButton');
const addBookBg = document.querySelector('#addBookBg');
const confirmButton = document.querySelector('#confirmButton');
const addCardButton = document.querySelectorAll('.addCard');
const shelf = document.querySelector('#shelf');
const helpButton = document.querySelector('#helpButton');
const helpPopupBg = document.querySelector('#helpPopupBg');
const closeHelpCardButton = document.querySelector('#closeHelpCard');
const scrollUpArrow = document.querySelector('#scrollUpArrow');

let removeButtons = document.querySelectorAll('.removeButton');
let myLibrary = [];
let indexLib = [];
let book1 = new Book ('The Hobbit', 'J. R. R. Tolkien', '239', true);
myLibrary.push(book1);
addVisualBook('The Hobbit', 'J. R. R. Tolkien', '239', true);
let book2 = new Book ('The Call of Cthulhu', 'H. P. Lovecraft', '40', false);
myLibrary.push(book2);
addVisualBook('The Call of Cthulhu', 'H. P. Lovecraft', '40', false);


// *******execution*******
hideHelpCard();
showHelpCard();
hideAddNewBookForm(closeFormButton);
hideAddNewBookForm(confirmButton);
showAddNewBookForm();
newBook();
updateBookIndex();
scrollToTop();
window.onscroll = function() {displayUpArrowButton()};
console.log(myLibrary);