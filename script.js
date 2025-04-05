// since I'm doing a code-walk through with the video im putting my own comments to make sure I know
// whats going on
const questions = [
  {
    question: 'How does &lt;meta charset="utf-8"&gt; tag affect a web page?',
    answer:
      'It defines the character encoding for the HTML document. UTF-8 is the most common encoding and supports a wide range of characters from various languages. Without it, special characters may not display correctly.',
  },
  {
    question: 'Can a webpage have multiple &lt;header&gt; or &lt;footer&gt; tags?',
    answer:
      'Yes, multiple header and footer tags are allowed but should be used within different section like &lt;article&gt; or &lt;section&gt;.',
  },
  {
    question: 'What is the role of a &lt;fieldset&gt; tag?',
    answer: '&lt;fieldset&gt; groups related elements within a form.',
  },
  {
    question: 'What is the difference between section and article tag.',
    answer:
      '&lt;section&gt; is used for grouping content, usually with a heading and &lt;article&gt; is for content that can be independently distributed like a blog.',
  },
  {
    question: 'What is the purpose of defer attribute?',
    answer: 'defer scripts are downloaded but only executed after HTML is fully parsed.',
  },
  {
    question: 'What is the purpose of async attribute?',
    answer: 'script that is downloaded and executed as soon as its ready.',
  },
  {
    question: 'What is the difference between &lt;strong&gt; and &lt;b&gt;?',
    answer:
      '&lt;strong&gt; conveys something is important while &lt;b&gt; is only for bolding with no important meaning.',
  },
  {
    question: 'What is the use of the contenteditable attribute?',
    answer: 'Allows creator to edit the content of the element directly in the browser.',
  },
  {
    question: 'What are void elements?',
    answer: 'Element that is self-closing and cannot have any child elements like &lt;br&gt;, &lt;img&gt;, etc.',
  },
  {
    question: 'What is the function of the &lt;noscript&gt; tag?',
    answer: 'Provides fallback content for browsers that do not support JavaScript or have it disabled.',
  },
];

// pulls data from local storage and stores it in viewedQuestions variable
let viewedQuestions = JSON.parse(localStorage.getItem(`viewedQuestions`)) || [];

function saveViewedQuestion(questionIndex) {
  // check if data already exists
  if (!viewedQuestions.includes(questionIndex)) {
    viewedQuestions.push(questionIndex);

    // sets local storage to viewedQuestions variable from above
    localStorage.setItem(`viewedQuestions`, JSON.stringify(viewedQuestions));

    // calls the function to refresh the progress bar
    updateProgressBar();
  }
}

function resetProgress() {
  localStorage.removeItem(`viewedQuestions`); // resets local storage data
  viewedQuestions = []; // resets viewedQuestion array to nothing

  // resetting checkmarks
  questions.forEach((item, index) => {
    const completed = document.getElementById(`completed-${index}`);
    if (completed) {
      completed.style.display = `none`;
    }
    const answer = document.getElementById(`answer-${index}`);
    if (answer) {
      answer.style.display = `none`;
    }
  });
  // refreshes progress bar
  updateProgressBar();
}

function updateProgressBar() {
  // creates a constant linked to the progressBar in the HTML
  const progressBar = document.getElementById(`progressBar`);

  // variable to get the current progress on viewedQuestions then converts it to a percent
  const progress = (viewedQuestions.length / questions.length) * 100;

  // changes the css to have the same width as the progress number
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute(`aria-valuenow`, progress);
}

// const variable linked to questions on html
const questionsDiv = document.getElementById(`questions`);

// dynamically creates the answer entries
questions.map((item, index) => {
  const row = document.createElement(`div`); // creates a div tag for a row
  row.className = `row centered-row mb-4`; // gives the new div tag a class name

  const card = document.createElement(`div`); // creates a div for a card
  card.className = `col-md-8`; // gives the card div a class name

  // HTML inside of the card, display none hides the div from appearing
  card.innerHTML = `
        <div class="card">
            <div class="card-header" data-index="${index}">
                ${item.question}
                <span id="completed-${index}" class="float-right"
                style="display: none;">&#10004;</span>
            </div>
            <div class="card-body" id="answer-${index}" style="display: none;
            ">
                <p class="text-primary">${item.answer}</p>
            </div>
        </div>
        `;

  row.appendChild(card); // adds the card html to the row div
  questionsDiv.appendChild(row); // adds row to the questions div
});

questions.forEach((item, index) => {
  const header = document.querySelector(`.card-header[data-index="${index}"]`);
  const answer = document.getElementById(`answer-${index}`);
  const completed = document.getElementById(`completed-${index}`);

  if (viewedQuestions.includes(index)) {
    completed.style.display = `inline`;
  }

  header.addEventListener(`click`, () => {
    // collapses other answers (not the one that is currently clicked)
    questions.forEach((otherItem, otherIndex) => {
      if (otherIndex !== index) {
        const otherAnswer = document.getElementById(`answer-${otherIndex}`);
        if (otherAnswer) {
          otherAnswer.style.display = `none`;
        }
      }
    });

    // toggles the selected answer
    answer.style.display = answer.style.display === `none` ? `block` : `none`;
    saveViewedQuestion(index);
    completed.style.display = `inline`;
  });
});

// executes resetProgress function when reset button is clicked
document.getElementById(`resetButton`).addEventListener(`click`, resetProgress);
updateProgressBar(); // refreshes the bar when the page loads
