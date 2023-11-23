const programs = [
  {
    name: 'People Picker',
    link: 'peoplepicker'
  },
  {
    name: 'Meter Bill Calculator',
    link: 'meterbill'
  },
  {
    name: 'Dictionary',
    link: 'dictionary'
  },
  {
    name: 'Rock Paper scissor',
    link: 'game'
  },
  {
    name: 'Calculator',
    link: 'js-calculator'
  },
  {
    name: 'SEA Students',
    link: 'students'
  },
  {
    name: 'English Level Test',
    link: 'leveltest'
  }
];

export function otherProgramsHTML() {
  let html = '';

  programs.forEach((program) => {
    const { name, link } = program;

    html += `
    <a href="https://kothaunaing.github.io/${link}">
    <div class="program">${name}</div>
  </a>
    `;
  });
  document.querySelector('.other-programs')
    .innerHTML = html;

  updateProgramsCount();
}

function updateProgramsCount() {
  document.querySelector('.other-programs-count')
    .innerHTML = programs.length;
}