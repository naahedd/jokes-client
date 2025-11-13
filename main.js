const API_BASE = "http://localhost:5000/api/v1/jokes";

document.getElementById("btnAmuse").addEventListener("click", async () => {
    const jokeId = document.getElementById("jokeId").value.trim();
    const container = document.getElementById("jokesContainer");
    
    container.innerHTML = "";
    
    try {
        let url;
        
        if (jokeId) {
            url = `${API_BASE}/${jokeId}`;
        } else {
            const language = document.getElementById("selLang").value;
            const category = document.getElementById("selCat").value;
            const number = document.getElementById("selNum").value;
            
            if (number === "all") {
                url = `${API_BASE}/${language}/${category}/all`;
            } else {
                url = `${API_BASE}/${language}/${category}/${number}`;
            }
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            if (data.jokes) {
                if (data.jokes.length === 0) {
                    displayMessage("There are no jokes in the chosen combination of languages and categories", "warning");
                } else {
                    data.jokes.forEach(joke => displayJoke(joke));
                }
            } else if (data.joke) {
                // 
                // ---- handling both string (mock) and object (real API) formats
                const jokeText = typeof data.joke === 'string' ? data.joke : data.joke.text;
                displayJoke(jokeText);
            }
        } else {
            displayMessage(data.error, "danger");
        }
    } catch (error) {
        displayMessage(`Error fetching jokes: ${error.message}`, "danger");
    }
});

function displayJoke(jokeText) {
    const container = document.getElementById("jokesContainer");
    const article = document.createElement("article");
    article.className = "message is-info";
    article.innerHTML = `
        <div class="message-body">
            ${jokeText}
        </div>
    `;
    container.appendChild(article);
}

function displayMessage(message, type) {
    const container = document.getElementById("jokesContainer");
    const article = document.createElement("article");
    article.className = `message is-${type}`;
    article.innerHTML = `
        <div class="message-body">
            ${message}
        </div>
    `;
    container.appendChild(article);
}