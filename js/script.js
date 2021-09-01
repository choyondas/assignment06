// get the search result and load data from API

const searchBook = () => {
    const searchField = document.getElementById('searchbox');
    const searchResults = searchField.value;
    // display spinner
    spinner('block');
    toggleResult('none');
    toggleNum('none');
    emptyResult('none');




    //clear previous search value
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchResults}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadBook(data))
}

const spinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleResult = displayStyle => {
    document.getElementById('searchResults').style.display = displayStyle;
}
const toggleNum = displayStyle => {
    document.getElementById('itemsNumber').style.display = displayStyle;
}
const emptyResult = displayStyle => {
    document.getElementById('results').style.display = displayStyle;
}


// display data
const loadBook = data => {

    const itemsNumber = data.numFound;
    const number = document.getElementById('itemsNumber');

    number.innerText = `Total items found = ${itemsNumber}`;
    const items = data.docs;
    const results = document.getElementById('searchResults');

    // clear previous search results
    results.textContent = ' ';

    const searchResult = document.getElementById('results');
    searchResult.innerText = " ";
    if (items.length == 0) {
        searchResult.innerText = "no results found, please try again later!"
    }

    // loop through to get each element 
    items.forEach(bookItem => {
        const div = document.createElement('div');
        div.classList.add('design');

        div.innerHTML =
            `
            <div><img width="100px" src="https://covers.openlibrary.org/b/id/${bookItem.cover_i}-L.jpg"></div>
            <div><h2>${bookItem.title} </h2>
            <h4> ${bookItem.author_name}</h4>
            <p>Publish Year: ${bookItem.first_publish_year}</p></div>
        `
        results.appendChild(div);

    })
    spinner('none');
    toggleResult('block');
    toggleNum('block');
    emptyResult('block');

}