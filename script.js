window.addEventListener('DOMContentLoaded', (event) => {
  const scrollArea = document.getElementById('scrollArea');
  const bigText = document.getElementById('bigText');
  const offset = 500; // Adjust this value to change the scroll needed to switch highlight

  // Break up bigText into spans at each word
  let words = bigText.textContent.split(' ');
  bigText.innerHTML = '';
  words.forEach((word, i) => {
    if(word.trim() !== '') {
      bigText.innerHTML += `<span>${word.trim()} </span>`;
    }
  });

  const spans = Array.from(bigText.getElementsByTagName('span'));

  scrollArea.addEventListener('scroll', function() {
    let scrollPos = scrollArea.scrollTop + offset;
    let firstHighlightFound = false;
    let highlightedCount = 0;

    spans.forEach((span) => {
      let spanPos = span.offsetTop;

      if(spanPos >= scrollPos && !firstHighlightFound && highlightedCount < 3) {
        span.classList.add('highlight');
        highlightedCount++;
        if(highlightedCount >= 3) firstHighlightFound = true;
      } else {
        span.classList.remove('highlight');
      }
    });

    // Check if we're at the end of the scrollable area
    if(scrollArea.scrollHeight - scrollArea.scrollTop === scrollArea.clientHeight) {
      // Add the 'highlight' class to the last three spans
      for(let i = Math.max(0, spans.length - 3); i < spans.length; i++) {
        spans[i].classList.add('highlight');
      }
    }
  });

  // Trigger scroll once at start to highlight in-view spans
  var event = new Event('scroll');
  scrollArea.dispatchEvent(event);
});