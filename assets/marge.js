document.documentElement.classList.remove('no-js');

document.querySelectorAll('[data-product-gallery-thumb]').forEach((button) => {
  button.addEventListener('click', () => {
    const main = document.querySelector('[data-product-gallery-main]');
    if (!main) return;
    main.src = button.dataset.src;
    main.alt = button.dataset.alt || '';
    document.querySelectorAll('[data-product-gallery-thumb]').forEach((thumb) => {
      thumb.classList.toggle('is-active', thumb === button);
    });
  });
});

const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
}

const quiz = document.querySelector('[data-quiz]');

if (quiz) {
  const questions = [
    {
      question: 'Which game night vibe are you?',
      answers: [
        ['Read the rulebook cover to cover. Twice.', 'planner'],
        ['Skim the quick-start, learn as we go.', 'chaos']
      ]
    },
    {
      question: 'Pick your ideal game-night fuel.',
      answers: [
        ['A perfectly arranged snack board.', 'planner'],
        ['Whatever is closest to the table.', 'chaos']
      ]
    },
    {
      question: 'The score is tied. What happens next?',
      answers: [
        ['A carefully negotiated tiebreaker.', 'planner'],
        ['Sudden death. No questions asked.', 'chaos']
      ]
    }
  ];

  let current = 0;
  const scores = { planner: 0, chaos: 0 };
  const content = quiz.querySelector('[data-quiz-content]');

  const renderQuestion = () => {
    const item = questions[current];
    content.innerHTML = `
      <p class="marge-quiz__count">Question ${current + 1} of ${questions.length}</p>
      <h3>${item.question}</h3>
      <div class="marge-quiz__answers">
        ${item.answers.map(([label, score]) => `<button type="button" data-score="${score}">${label}</button>`).join('')}
      </div>`;

    content.querySelectorAll('[data-score]').forEach((button) => {
      button.addEventListener('click', () => {
        scores[button.dataset.score] += 1;
        current += 1;
        if (current < questions.length) renderQuestion();
        else renderResult();
      });
    });
  };

  const renderResult = () => {
    const plannerWins = scores.planner >= scores.chaos;
    content.innerHTML = `
      <p class="marge-quiz__count">Your game-night personality</p>
      <h3>${plannerWins ? 'The Delightful Director' : 'The Beautiful Wild Card'}</h3>
      <p>${plannerWins ? 'You bring the plan, the snacks, and the very satisfying score sheet.' : 'You bring the plot twists, the big laughs, and the rule interpretations nobody saw coming.'}</p>
      <button class="marge-button" type="button" data-restart-quiz>Play again</button>`;
    content.querySelector('[data-restart-quiz]').addEventListener('click', () => {
      current = 0;
      scores.planner = 0;
      scores.chaos = 0;
      renderQuestion();
    });
  };

  renderQuestion();
}
