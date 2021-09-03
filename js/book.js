// search result
const searchResultData = () => {
    const search = document.getElementById("search-field").value;
    if (search === "") {
        document.getElementById("searchMessage").classList.remove("d-none");
    } else {
        // blank message message show 
        document.getElementById("searchMessage").classList.add("d-none");
        url = `https://openlibrary.org/search.json?q=${search}`
        document.getElementById("search-field").value = "";
        fetch(url)
            .then(res => res.json())
            .then(data => showData(data));
    }

}

// result show function
const showData = data => {
    document.getElementById('searchResult').innerText = data.numFound;
    if (data.numFound !== 0) {
        // error message hide 
        document.getElementById("noBookMsg").classList.add("d-none")
        document.getElementById("book-card").textContent = "";
        for (let i = 0; i <= 40; i++) {
            const bookdetails = data.docs[i]
            const bookImageId = data.docs[i].cover_i;
            if (bookImageId) {

                let bookCard = document.getElementById("book-card");
                let bookcoldiv = document.createElement("div");
                bookcoldiv.classList.add("col");
                // book result show
                bookcoldiv.innerHTML = `
                         <div class="card p-3 h-100">
                             <img class = "rounded  h-75 w-75 mx-auto" src="https://covers.openlibrary.org/b/id/${bookImageId}-M.jpg" class="card-img-top>
                             <div class="card-body">
                                 <h5 class="card-title text-center"><u>${bookdetails.title}</u></h5>
                                 <p>Publisher : <b>${bookdetails.publisher[0]}</b></p>
                                 <p class="card-text">First publishing date : ${bookdetails.first_publish_year}</p>
                                 <blockquote class = "mb-0">Author : ${bookdetails.author_name[0]}</blockquote>
                             </div>
                         </div>
                     `;
                bookCard.appendChild(bookcoldiv);
            }
        }
    } else {
        document.getElementById("book-card").textContent = "";
        document.getElementById("noBookMsg").classList.remove("d-none");
    }
}
