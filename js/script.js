// get the search result and load data from API

const searchBook = () => {
    const searchField = document.getElementById('searchbox');
    const searchResults = searchField.value;
    // display spinner
    spinner('block');





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

    // condition check for error message

    if (items.length === 0) {
        searchResult.innerText = "no results found, please try again later!"
    }

    // loop through to get each element 
    items.forEach(bookItem => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML =
            `
            <div  class="card h-100 d-flex flex-row align-items-center">
                <div>
                    <img width="100px" src="https://covers.openlibrary.org/b/id/${bookItem.cover_i}-L.jpg" class="card-img-top" alt="..."></div>
                <div class="card-body">
                     <h4 class="card-title">${bookItem.title}</h4>
                     <h6 class="card-title">author_name: ${bookItem.author_name}</h6>
                     <h6 class="card-title">publisher: ${bookItem.publisher}</h6>
                    <p class="card-text">Publish Year: ${bookItem.first_publish_year}</p>
                </div>
              </div>


        `
        results.appendChild(div);

    })
    spinner('none');

}