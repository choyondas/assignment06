const searchBook = () => {
    const searchField = document.getElementById('searchbox');
    const searchResults = searchField.value;

    // console.log(searchResults);
    searchField.value = '';



    const url = `http://openlibrary.org/search.json?q=${searchResults}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadBook(data))
}
const loadBook = data => {
    const itemsNumber = data.numFound;

    const number = document.getElementById('itemsNumber');
    number.innerText = `Total search items = ${itemsNumber}`;



    const items = data.docs;
    items.forEach(bookItem => {
        // console.log(bookItem);

        const results = document.getElementById('searchResults');
        const div = document.createElement('div');
        div.classList.add('design')
        div.innerHTML = `
        <img width="100px" src="https://covers.openlibrary.org/b/id/${bookItem.cover_i}-L.jpg">
<h2>${bookItem.title} </h2>
<p> ${bookItem.author_name}</p>
<p>Publish Year: ${bookItem.first_publish_year}</p>
`
        results.appendChild(div);

    })
}