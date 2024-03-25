// script.js
// Function to navigate to the article page with the selected article
function navigateToArticle(category, article) {
  // Construct the URL for the article page
  const articleURL = `article.html?category=${category}&article=${article}`;

  // Redirect the user to the article page
  window.location.href = articleURL;
}

// Event listener for "Read more" buttons
document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    // Prevent default button behavior
    event.preventDefault();

    // Extract category and article name from the button's data attributes
    const category = this.getAttribute("data-category");
    const article = this.getAttribute("data-article");

    // Navigate to the article page with the selected article
    navigateToArticle(category, article);
  });
});

const readMoreButtons = document.querySelectorAll(".read-more-btn");

// Add event listener to each button
readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the article category and title
    const category = button.dataset.category;
    const article = button.dataset.article;

    // Encode parameters
    const encodedCategory = encodeURIComponent(category);
    const encodedArticle = encodeURIComponent(article);

    // Generate the URL with parameters
    const url = `article.html?category=${encodeURIComponent(
      category
    )}&article=${encodeURIComponent(article)}`;

    // Navigate to the article page
    window.location.href = url;
  });

  const carouselItems = document.querySelectorAll(".carousel-item");

  // Add event listener to each carousel item
  carouselItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Get the article category and title from the carousel item
      const category = item.querySelector(".section-title").innerText;
      const article = item.querySelector(".card-title").innerText;

      // Encode parameters
      const encodedCategory = encodeURIComponent(category);
      const encodedArticle = encodeURIComponent(article);

      // Generate the URL with parameters
      const url = `article.html?category=${encodeURIComponent(
        category
      )}&article=${encodeURIComponent(article)}`;

      // Navigate to the article page
      window.location.href = url;
    });
  });
});
