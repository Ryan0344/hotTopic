// Main container where fetched HTML partials will be placed
const container = document.getElementById("content");

// Navigation links in the main nav
const links = document.querySelectorAll("nav a");

// Default page to load on initial render
let url = "./partials/home.html";

/**
 * Fetches an HTML partial and injects it into the main container.
 * This is used to show page navigation without full page reloads.
 */
const loadContent = (urlFeed) => {
    fetch(urlFeed)
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
        })
        .catch(error => console.log(error));
};


const selectContent = (e) => {
    e.preventDefault();
    let href = e.target.getAttribute("href");
    loadContent(href);
};

// Attach click handlers to all nav links.
links.forEach(link => {
    link.addEventListener("click", selectContent);
});

// Load initial page content when script runs.
loadContent(url);

/**
 * Event delegation for "Go Home" for the links.
 * Allows dynamically loaded content to still trigger navigation.
 */
document.addEventListener("click", (e) => {
    const goHomeItem = e.target.closest(".go-home");

    if (goHomeItem) {
        e.preventDefault();

        // Always route back to home partial
        loadContent("./partials/home.html");
    }
});
