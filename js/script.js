const searchBook = () => {
    const searchField = document.getElementById('searchbox');
    const searchResults = searchField.value;

    // console.log(searchResults);
    searchField.value = '';



    const url = `http://openlibrary.org/search.json?q=${searchResults}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadBook(data.docs))
}



const loadBook = data => {
    data.forEach(bookItem => {
        console.log(bookItem);
    })
}