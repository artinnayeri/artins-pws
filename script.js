const sections = document.querySelectorAll('.section');
const markers = document.querySelectorAll('.marker');
const progressBar = document.getElementById('progress-bar');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }

    markers.forEach(marker => marker.classList.remove('active'));
    const index = Array.from(sections).indexOf(entry.target);
    if (entry.isIntersecting && markers[index]) {
      markers[index].classList.add('active');
    }

    if (entry.target.id === 'method' && entry.isIntersecting) {
      startAIPromptAnimation();
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const header = section.querySelector('h2');
    if(header){
      const offset = rect.top * 0.05;
      header.style.transform = `translateY(${offset}px)`;
    }
  });
});

const aiPromptEl = document.getElementById('ai-prompt');
const aiText = "Hier is de tekst:---Schrijfblokkades zijn een veelvoorkomend probleem onder schrijvers — een uitdaging die vaak voortkomt uit perfectionisme — en AI-tools zoals ChatGPT kunnen hierbij een waardevolle oplossing bieden. Hoewel sommige schrijvers zorgen hebben over authenticiteit, biedt AI vooral ondersteuning bij het creatieve proces — zonder de unieke stem van de schrijver te vervangen. Experts in de uitgeefwereld en psychologen erkennen steeds vaker de potentie van AI als schrijfhulpmiddel — een ontwikkeling die de drempel om te beginnen aanzienlijk kan verlagen.---";
const humanPrompt = "Voor ik mijn experimenten uitleg, zal ik gelijk zeggen dat ik weiger gebruik te maken van AI zoals ChatGPT voor het schrijven. Dit is een advies dat ik regelmatig tegenkom en zelfs heb gekreven van een psycholoog. Volgens de CEO van een bekende uitgever zal AI helpen tegen schrijfblokkades, maar ik vind dat dit niet klopt. Als de meeste schrijvers met writer’s block last hebben van perfectionisme, zouden ze nooit het werk van een ander als hun eigen beweren, in het bijzonder niet van AI die bekendstaan om hun herkenbare schrijfstijl en plagiaat. Zo voelt het voor mij in ieder geval.";

function startAIPromptAnimation() {

  aiPromptEl.textContent = "";
  aiPromptEl.classList.add('typing');

  setTimeout(() => {
    aiPromptEl.textContent = aiText;

    setTimeout(() => {
      let text = aiPromptEl.textContent;
      let i = text.length;

      function deleteChar() {
        if (i > 0) {
          aiPromptEl.textContent = text.substring(0, i - 1);
          i--;
          setTimeout(deleteChar, 0.5);
        } else {
          let j = 0;
          function typeHuman() {
            if (j < humanPrompt.length) {
              aiPromptEl.textContent += humanPrompt.charAt(j);
              j++;
              setTimeout(typeHuman, 0.5);
            } else {
              aiPromptEl.classList.remove('typing');
            }
          }
          typeHuman();
        }
      }
      deleteChar();
    }, 1000);
  }, 700);
}

markers.forEach(marker => {
  marker.addEventListener('click', () => {
    const targetId = marker.dataset.target;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});