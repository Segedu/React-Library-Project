//  // אם הוא מצא במערך אחד אין לאפשר לו להמשיך לחפש
//     // עבור הסטרינג, לשכפל גם את הספר באמצעות temp וגם את האינפוט מהלקוח

//     function searchStringInAuthorTitleDescription(inputData) {
        let userInput = inputData.toLowerCase()
        tempBook.forEach(element => {
            let array = element.title.toLowerCase()
            element.title = array;
            if (array.indexOf(userInput > -1)) {
                console.log(userInput, "exist");
            }
        })
        // tempBook.forEach(element => {
        //     let array = element.description.toLowerCase()
        //     element.description = array;
        //     if (array.indexOf(userInput > -1)) {
        //         console.log(userInput, "exist");
        //     }
        // })
        // tempBook.forEach(element => {
        //     let array = element.author.toLowerCase()
        //     element.author = array;
        //     if (array.indexOf(userInput > -1)) {
        //         console.log(userInput, "exist");
        //     }
        // })

        setTempBook(tempBook);


//         const titleFilter = tempBook.filter(book => book.title.includes(inputData));
//         const authorFilter = tempBook.filter(book => book.author.includes(inputData));
//         const descriptionFilter = tempBook.filter(book => book.description.includes(inputData));

//         let searchesResultArray = titleFilter.concat(authorFilter).concat(descriptionFilter);

//         let uniqueArray = [...new Set(searchesResultArray)];
//         let shortenArray = uniqueArray.splice(0, 10);
//         setSearchBooksArray(shortenArray)



//     }
