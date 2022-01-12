
function searchStringInAuthorTitleDescription(inputData) {
    let userInput = inputData.toLowerCase()
    tempBook.forEach(element => {
        element.title = element.title.toLowerCase();
        element.description = element.description.toLowerCase()
        element.author = element.author.toLowerCase()
        if (tempBook.indexOf(userInput > -1)) {
            return tempBook[userInput]
        }
    })

    setTempBook(tempBook);
}

const titleFilter = tempBook.filter(book => book.title.match(inputData));
const authorFilter = tempBook.filter(book => book.author.match(inputData));
const descriptionFilter = tempBook.filter(book => book.description.match(inputData));

let searchesResultArray = titleFilter.concat(authorFilter).concat(descriptionFilter);

let uniqueArray = [...new Set(searchesResultArray)];
let shortenArray = uniqueArray.splice(0, 10);
setSearchBooksArray(shortenArray)



