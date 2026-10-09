const quoteCards = Array.from(document.querySelectorAll('.quotes-grid .quote'));
const featuredText = document.getElementById('featured-quote-text');
const featuredAuthor = document.getElementById('featured-quote-author');
const shuffleButton = document.getElementById('shuffle-quote');

if (featuredText && featuredAuthor && shuffleButton && quoteCards.length) {
  const quotes = quoteCards.map((card) => ({
    text: card.querySelector('blockquote p').textContent.trim(),
    author: card.querySelector('cite').textContent.trim(),
  }));
  let currentIndex = -1;

  function shuffleQuote() {
    // Exclude the current quote so every click brings a different selection.
    const choices = quotes.length - (currentIndex >= 0 ? 1 : 0);
    if (choices === 0) return;
    let nextIndex = Math.floor(Math.random() * choices);
    if (currentIndex >= 0 && nextIndex >= currentIndex) nextIndex += 1;
    currentIndex = nextIndex;
    featuredText.textContent = quotes[currentIndex].text;
    featuredAuthor.textContent = quotes[currentIndex].author;
  }

  shuffleQuote();
  shuffleButton.hidden = quotes.length < 2;
  shuffleButton.addEventListener('click', shuffleQuote);
}
