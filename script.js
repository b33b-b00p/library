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

function toggleLangMenu()
{
    langButton.addEventListener('click', () => 
    {
        if(langListShown === false)
        {
            langList.style.display = 'block';
            langListShown = true;
        }
        else
        {
            langList.style.display = 'none';
            langListShown = false;
        }
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

function showClearLibraryCard()
{
    clearLibraryPromptText.addEventListener('click', () => 
    {
        clearLibraryPopupCard.style.display = 'flex';
        helpPopupCard.style.display = 'none';
    });
}

function hideClearLibraryCard()
{
    clearLibraryButtonCancel.addEventListener('click', () => 
    {
        clearLibraryPopupCard.style.display = 'none';
        helpPopupCard.style.display = 'flex';
    });
}

function removeAllBooks()
{
    clearLibraryButtonConfirm.addEventListener('click', () => 
    {
        localStorage.removeItem("myLibrary");
        location.reload(true);
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
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        addVisualBook(book); 
        
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
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    console.log('new lib');
    console.log(myLibrary);
}

function addVisualBook({title, author, pages, status})
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
    div_Author.classList.add('bookAuthor');
    div_Pages.classList.add('bookPages');
    div_Status.classList.add('bookStatus');

    //*******editing text and attributes*******
    svg.setAttribute('style', 'width:24px;height:24px');
    svg.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');
    
    divclass_bookTitle.textContent = '\"' + title + '\"';
    div_Author.textContent = authorText + author;
    div_Pages.textContent = pagesText + pages;

    //*******linked functions*******
    let thisBook = myLibrary.find(Book => Book.title === title 
        && Book.author === author && Book.pages === pages 
        && Book.status === status);

    checkStatus(status, divclass_bigLeftLetter, div_Status, div_Author, div_Pages, author, pages);
    updateBookIndex();
    console.log(myLibrary);
    removeBook(thisBook, divclass_removeButton, divclass_bookCard);
    toggleBigLetterStatus(title, author, pages, status, divclass_bigLeftLetter, div_Status, div_Author, div_Pages);
}

function checkStatus(status, div_bigLetter, div_status, div_author, div_pages, author, pages)
{
    
    if(status === true)
    {
        //for top-left letter R/U
        div_bigLetter.classList.add('readStatus');
        div_bigLetter.textContent = 'R';
        //for content
        div_author.textContent = authorText + author;
        div_pages.textContent = pagesText + pages;
        div_status.innerHTML = statusText + '<span class="status-read">'+statusReadText+'</span>';
    }
    else
    {
        //for top-left letter R/U
        div_bigLetter.classList.add('unreadStatus');
        div_bigLetter.textContent = 'U';
        //for content
        div_author.textContent = authorText + author;
        div_pages.textContent = pagesText + pages;
        div_status.innerHTML = statusText + '<span class="status-unread">'+statusUnreadText+'</span>';
    }
    
}

function toggleBigLetterStatus(bookTitle, bookAuthor, bookPages, bookStatus, div_bigLetter, div_status, div_author, div_pages)
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

        checkStatus(bookStatus, div_bigLetter, div_status, div_author, div_pages, bookAuthor, bookPages);
        updateBookIndex();
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
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
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
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

// *******languages*******
let langs = document.querySelector(".lang-menu"),
    link = document.querySelectorAll("a");

//bookCard
let authorText = "Author: "
    pagesText = "Pages: ",
    statusText = "Status: ",
    statusReadText = "Read",
    statusUnreadText = "Unread";
// addBookForm
let formHeader = document.querySelector(".formHeader"),
    bookTitlePlaceholder = document.querySelector("#bookTitle"),
    bookAuthorPlaceholder = document.querySelector("#bookAuthor"),
    bookPagesPlaceholder = document.querySelector("#bookPages"),
    checkboxLabelText = document.querySelector("#checkboxLabelText"),
    confirmButtonTextTranslation = document.querySelector("#confirmButton");
// helpCard
let helpCardHeader = document.querySelector(".helpCardHeader"),
    firstWord1 = document.querySelector("#firstWord1"),
    firstWord2 = document.querySelector("#firstWord2"),
    firstWord3 = document.querySelector("#firstWord3"),
    firstWord4 = document.querySelector("#firstWord4"),
    tipDescription1 = document.querySelector("#tipDescription1"),
    tipDescription2 = document.querySelector("#tipDescription2"),
    tipDescription3 = document.querySelector("#tipDescription3"),
    tipDescription4 = document.querySelector("#tipDescription4"),
    helpCardSortOptionButton = document.querySelector(".helpCardSortButton");
// ClearLibraryCard
let clearLibraryCardHeaderText = document.querySelector(".clearLibraryCardHeader"),
    clearLibraryCardContentText = document.querySelector(".clearLibraryCardContent");
//searchbar
let sortOptionButtonTitleText = "Title",
    sortOptionButtonAuthorText = "Author",
    sortOptionButtonPagesText = "Pages",
    sortOptionButtonStatusText = "Status";
let searchFieldPlaceholder = document.querySelector("#search-item");
    
link.forEach(el=>{
    el.addEventListener("click", ()=>{
        langs.querySelector(".active").classList.remove("active");
        el.classList.add("active");

        let attr = el.getAttribute("language")

        
        localStorage.setItem('selectedLang', JSON.stringify(attr));

        location.reload(true); //reloads the page to apply the language
    })
})

function checkSelectedLang()
{
    let attr = JSON.parse(localStorage.getItem('selectedLang')) || "english";

    langs.querySelector(".active").classList.remove("active");
    langs.querySelector(`a[language=${attr}]`).classList.add("active");

    // bookCard
    authorText = data[attr].authorText
    pagesText = data[attr].pagesText
    statusText = data[attr].statusText
    statusReadText = data[attr].statusReadText
    statusUnreadText = data[attr].statusUnreadText
    // addBookForm
    formHeader.textContent = data[attr].formHeader
    bookTitlePlaceholder.setAttribute("placeholder", data[attr].bookTitlePlaceholder)
    bookAuthorPlaceholder.setAttribute("placeholder", data[attr].bookAuthorPlaceholder)
    bookPagesPlaceholder.setAttribute("placeholder", data[attr].bookPagesPlaceholder)
    checkboxLabelText.textContent = data[attr].checkboxLabelText
    confirmButtonTextTranslation.textContent = data[attr].confirmButtonTextTranslation
    // helpCard
    helpCardHeader.textContent = data[attr].helpCardHeader
    firstWord1.textContent = data[attr].firstWord1
    tipDescription1.textContent = data[attr].tipDescription1
    firstWord2.textContent = data[attr].firstWord2
    tipDescription2.textContent = data[attr].tipDescription2
    firstWord3.textContent = data[attr].firstWord3
    tipDescription3.textContent = data[attr].tipDescription3
    firstWord4.textContent = data[attr].firstWord4
    tipDescription4.textContent = data[attr].tipDescription4
    helpCardSortOptionButton.textContent = data[attr].sortOptionButtonTitleText
    clearLibraryPromptText.textContent = data[attr].clearLibraryPromptText
    // ClearLibraryCard
    clearLibraryCardHeaderText.textContent = data[attr].clearLibraryCardHeaderText
    clearLibraryCardContentText.textContent = data[attr].clearLibraryCardContentText
    clearLibraryButtonConfirm.textContent = data[attr].clearLibraryButtonConfirmText
    clearLibraryButtonCancel.textContent = data[attr].clearLibraryButtonCancelText
    //searchbar
    sortOptionButton.textContent = data[attr].sortOptionButtonTitleText //displaying "Title" as a default sort option
    sortOptionButtonTitleText = data[attr].sortOptionButtonTitleText
    sortOptionButtonAuthorText = data[attr].sortOptionButtonAuthorText
    sortOptionButtonPagesText = data[attr].sortOptionButtonPagesText
    sortOptionButtonStatusText = data[attr].sortOptionButtonStatusText
    searchFieldPlaceholder.setAttribute("placeholder", data[attr].searchFieldPlaceholder)
}

let data = {
    english: {
        // bookCard
        authorText: "Author: ",
        pagesText: "Pages: ",
        statusText: "Status: ",
        statusReadText: "Read", 
        statusUnreadText: "Unread",
        // addBookForm
        formHeader: "Add new book",
        bookTitlePlaceholder: "Title",
        bookAuthorPlaceholder: "Author",
        bookPagesPlaceholder: "Pages",
        checkboxLabelText: "Read before",
        confirmButtonTextTranslation: "Confirm",
        // helpCard
        helpCardHeader: "Functionality",
        firstWord1: "Press",
        tipDescription1: "to add book to your shelf",
        firstWord2: "Toggle",
        tipDescription2: "to change book status",
        firstWord3: "Press",
        tipDescription3: "to remove book form your shelf",
        firstWord4: "Toggle",
        tipDescription4: "to change the sort option",
        clearLibraryPromptText: "want to clear the Library?",
        // ClearLibraryCard
        clearLibraryCardHeaderText: "Clear the Library",
        clearLibraryCardContentText: "Are you sure you want to remove all books from your Library?",
        clearLibraryButtonConfirmText: "Confirm",
        clearLibraryButtonCancelText: "Cancel",
        //searchbar
        searchFieldPlaceholder: "Search book",
        sortOptionButtonTitleText: "Title",
        sortOptionButtonAuthorText: "Author",
        sortOptionButtonPagesText: "Pages",
        sortOptionButtonStatusText: "Status"


    },
    russian: {
        // bookCard
        authorText: "Автор: ",
        pagesText: "Количество страниц: ",
        statusText: "Статус: ",
        statusReadText: "Прочитано", 
        statusUnreadText: "Не прочитано",
        // addBookForm
        formHeader: "Добавить книгу",
        bookTitlePlaceholder: "Название",
        bookAuthorPlaceholder: "Автор",
        bookPagesPlaceholder: "Количество страниц",
        checkboxLabelText: "Прочитано",
        confirmButtonTextTranslation: "Готово",
        // helpCard
        helpCardHeader: "Функционал",
        firstWord1: "Нажмите",
        tipDescription1: ", чтобы добавить книгу на полку",
        firstWord2: "Нажмите",
        tipDescription2: ", чтобы изменить статус книги",
        firstWord3: "Нажмите",
        tipDescription3: ", чтобы убрать книгу с полки",
        firstWord4: "Нажмите",
        tipDescription4: ", чтобы изменить вариант сортировки",
        clearLibraryPromptText: "хотите очистить библиотеку?",
        // ClearLibraryCard
        clearLibraryCardHeaderText: "Очистить библиотеку",
        clearLibraryCardContentText: "Вы уверены, что хотите удалить все книги из своей библиотеки?",
        clearLibraryButtonConfirmText: "Подтвердить",
        clearLibraryButtonCancelText: "Отменить",
        //searchbar
        searchFieldPlaceholder: "Поиск книги",
        sortOptionButtonTitleText: "Название",
        sortOptionButtonAuthorText: "Автор",
        sortOptionButtonPagesText: "Страницы",
        sortOptionButtonStatusText: "Статус"
     }
}

// *******search bar*******

//choosing sort option
const sortOptionButton = document.querySelector(".defaultOption");
let nextSort = "Author";
let currentSort = "Title";
function chooseSortOption()
{
    sortOptionButton.addEventListener("click", () => {
        if(nextSort === "Title")
        {
            sortOptionButton.textContent = sortOptionButtonTitleText;
            currentSort = nextSort;
            nextSort = "Author";
        }
        else if(nextSort === "Author")
        {
            sortOptionButton.textContent = sortOptionButtonAuthorText;
            currentSort = nextSort;
            nextSort = "Pages";
        }
        else if(nextSort === "Pages")
        {
            sortOptionButton.textContent = sortOptionButtonPagesText;
            currentSort = nextSort;
            nextSort = "Status";
        }
        else if(nextSort === "Status")
        {
            sortOptionButton.textContent = sortOptionButtonStatusText;
            currentSort = nextSort;
            nextSort = "Title";
        }
    });
}

//search field
const search = () => {

    const searchbar = document.getElementById("search-item").value.toLowerCase();
    const books = document.querySelectorAll(".bookCard");
    const bContent= document.getElementsByClassName("cardContent");

    switch(currentSort)
    {
        case "Title":
            for(let i = 0; i < bContent.length; i++)
            {
                let match = books[i].getElementsByClassName("bookTitle")[0];
                
                if(match)
                {
                    let textValue = match.textContent || match.innerHTML

                    if(textValue.toLowerCase().indexOf(searchbar) > -1)
                    {
                        books[i].style.display = "";
                    }
                    else
                    {
                        books[i].style.display = "none";
                    }
                }
            }
            break;

        case "Author":
            for(let i = 0; i < bContent.length; i++)
            {
                let match = books[i].getElementsByClassName("bookAuthor")[0];
                
                if(match)
                {
                    let textValue = match.textContent || match.innerHTML

                    if(textValue.toLowerCase().indexOf(searchbar) > -1)
                    {
                        books[i].style.display = "";
                    }
                    else
                    {
                        books[i].style.display = "none";
                    }
                }
            }
            break;

        case "Pages":
            for(let i = 0; i < bContent.length; i++)
            {
                let match = books[i].getElementsByClassName("bookPages")[0];
                
                if(match)
                {
                    let textValue = match.textContent || match.innerHTML

                    if(textValue.toLowerCase().indexOf(searchbar) > -1)
                    {
                        books[i].style.display = "";
                    }
                    else
                    {
                        books[i].style.display = "none";
                    }
                }
            }
            break;

        case "Status":
            for(let i = 0; i < bContent.length; i++)
            {
                let match = books[i].getElementsByClassName("bookStatus")[0];
                
                if(match)
                {
                    let textValue = match.textContent || match.innerHTML

                    if(textValue.toLowerCase().indexOf(": " + searchbar) > -1)
                    {
                        books[i].style.display = "";
                    }
                    else
                    {
                        books[i].style.display = "none";
                    }
                }
            }
            break;

        default:
            console.log("didn't work T-T");
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

const helpPopupCard = document.querySelector('#helpPopupCard');
const clearLibraryPromptText = document.querySelector('#clearLibraryPromptText');
const clearLibraryPopupCard = document.querySelector('#clearLibraryPopupCard');
const clearLibraryButtonConfirm = document.querySelector("#clearLibraryButtonConfirm");
const clearLibraryButtonCancel = document.querySelector("#clearLibraryButtonCancel");

const langButton = document.querySelector('#langButton');
const langList = langs.querySelector('ul');
let langListShown = false;

let removeButtons = document.querySelectorAll('.removeButton');
let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien', 
        pages: 239, 
        status: true
    },
    {
        title: 'The Call of Cthulh',
        author: 'H. P. Lovecraft', 
        pages: 40, 
        status: false
    }
];
localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

let indexLib = [];


// *******execution*******
checkSelectedLang();
myLibrary.forEach(addVisualBook);

hideHelpCard();
showHelpCard();

toggleLangMenu();

showClearLibraryCard();
hideClearLibraryCard();
removeAllBooks();

hideAddNewBookForm(closeFormButton);
hideAddNewBookForm(confirmButton);
showAddNewBookForm();

newBook();
updateBookIndex();
scrollToTop();
chooseSortOption();
window.onscroll = function() {displayUpArrowButton()};
console.log(myLibrary);