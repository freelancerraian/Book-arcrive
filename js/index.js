// Button Function
            const buttonClick = () => {
                const Input = document.getElementById('search-value');
                const inputValue = Input.value;
                Input.value = "";

                // Invalied and fetch sec
                if (inputValue === "") {
                    window.alert('Please Input A Book Name.')
                } else {
                    spinnerDisplay("block");
                    contentDisplay("none")
                    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
                        .then(res => res.json())
                        .then(data => result(data))
                        .catch((error) => disError(error))
                    }
            };

            // server error sec
            const disError = error => {
                window.alert('Please Try agin later.')
            }

            // Function sec
            const result = books => {
                spinnerDisplay("none");
                contentDisplay("block");

                // total result sec
                const bookFound = document.getElementById('Numfound');
                bookFound.textContent = '';
                const divFound = document.createElement('div');

                divFound.classList.add('find');

                divFound.innerHTML = `<h1>Total Book Found : ${books.numFound}</h1>`
                bookFound.appendChild(divFound);
                
                if(books.numFound === 0){
                    window.alert('Input a Book Name Plase');
                }

                // main content sec
                const content = document.getElementById('res');
                content.textContent = '';

                const Docs = books.docs;
                const takeResult = Docs.slice(0, 12);

                // Arry Sec
                takeResult.forEach((book) => {

                    const div = document.createElement('div');
                    
                    div.classList.add('col-3');

                    div.innerHTML = `
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
                    <h1>Book Name : ${book.title}</h1>
                    <h3>Aurthur : ${book.author_name}</h3>
                    <h5>publisher : ${book.publisher}</h5>
                    <p>Year : ${book.publish_year}</p>
                    `;
                    content.appendChild(div);
                });
            }

            // spinner 
            let spinner = document.getElementById('spinnerId');

            window.addEventListener('load', function () {
                spinner.style.display = 'none';
            })

            const spinnerDisplay = displaySpinner => {
                     document.getElementById('spinnerId')
                     .style.display = displaySpinner; 
                    };
            
            const contentDisplay = displayBody =>{
                document.getElementById('res-main')
                .style.display = displayBody;
            }
