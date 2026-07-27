(() => {
  const graphics = [
    ['Project Brief and Success Criteria', '01-project-brief.png'],
    ['Plans and Design Choices', '02-plans.png'],
    ['Work Health and Safety', '03-whs.png'],
    ['Timber Selection and Preparation', '04-timber.png'],
    ['Measuring and Marking Out', '05-markout.png'],
    ['Folding Mechanism and Movement', '06-folding-mechanism.png'],
    ['Joinery and Controlled Cuts', '07-joinery.png'],
    ['Assembly and Accuracy', '08-assembly.png'],
    ['Seat and Back Slats', '09-seat-back-slats.png'],
    ['Surface Preparation and Finish', '10-surface-finish.png'],
    ['Problem-solving and Adjustments', '11-problem-solving.png'],
    ['Final Evaluation', '12-final-evaluation.png']
  ];

  function addInfographics() {
    const cards = document.querySelectorAll('#folioCards .folio-card');
    cards.forEach((card, index) => {
      const graphic = graphics[index];
      const header = card.querySelector('.folio-head');
      if (!graphic || !header || card.querySelector('.folio-card-graphic')) return;

      const figure = document.createElement('figure');
      figure.className = 'folio-card-graphic';
      figure.innerHTML = `
        <img src="assets/folio/cards/${graphic[1]}" alt="${graphic[0]} infographic" loading="lazy" decoding="async">
        <figcaption>Use this visual to help you identify the evidence and explanation needed for this stage.</figcaption>
      `;
      header.insertAdjacentElement('afterend', figure);
    });
  }

  function start() {
    requestAnimationFrame(addInfographics);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
