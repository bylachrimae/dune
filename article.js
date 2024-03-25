//article.js
// Function to extract URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
// Function to load article content based on URL parameters
function loadArticleContent() {
    // Get URL parameters
    const params = getUrlParams();
    const category = params['category'];
    const article = params['article'];

    if (!category || !article) {
        console.error('Category or article not specified in URL parameters.');
        return;
    }
    

    // Construct the path to the text file and image file
    const textFilePath = `./content/${encodeURIComponent(category)}/${encodeURIComponent(article)}/${encodeURIComponent(article)}.txt`;

    const pngImagePath = `./content/${encodeURIComponent(category)}/${encodeURIComponent(article)}/${encodeURIComponent(article)}.png`;
    const gifImagePath = `./content/${encodeURIComponent(category)}/${encodeURIComponent(article)}/${encodeURIComponent(article)}.gif`;

    // Check if the PNG image exists
    fetch(pngImagePath)
        .then(response => {
            if (response.ok) {
                // Display the PNG image
                document.getElementById('article-image').src = pngImagePath;
            } else {
                // Fetch the GIF image if the PNG image doesn't exist
                fetch(gifImagePath)
                    .then(gifResponse => {
                        if (gifResponse.ok) {
                            // Display the GIF image
                            document.getElementById('article-image').src = gifImagePath;
                        } else {
                            console.error('No PNG or GIF image found for the article.');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching GIF image:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching PNG image:', error);
        });

    // Fetch the content of the text file
    fetch(textFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load article content.');
            }
            return response.text();
        })
        .then(articleContent => {
            // Split the text content into title and article body using the delimiter '---'
            const [category,articleTitle, articleBody] = articleContent.split('---', 3);
        
            // Display the article title and body on the page
            document.getElementById('category-label').textContent = category.trim();
            document.getElementById('article-title').innerText = articleTitle.trim();
            document.getElementById('article-body').innerHTML = articleBody.trim();
        })
        .catch(error => {
            console.error('Error loading article content:', error);
        });

    // Set the image source
    document.getElementById('article-image').src = imagePath;
    document.getElementById('article-gif').src = gifPath;
}



// Load article content when the page loads
window.addEventListener('DOMContentLoaded', loadArticleContent);
