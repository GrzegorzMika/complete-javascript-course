'use strict';

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   answers: new Array(4).fill(0),
//
//   registerNewAnswer() {
//     const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
//     if (typeof answer === 'number' && answer < this.answers.length && answer > 0) {
//       this.answers[answer]++;
//     }
//     this.displayResults();
//   },
//
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   }
//
// };
//
// document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
//
// poll.displayResults.call({
//   answers: [5, 2, 3]
// });

(function() {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function() {
    header.style.color = 'blue';
  });
})();