/* ===== HERO AURORA BACKGROUND ===== */
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Aurora {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 180 + Math.random() * 220;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;
    this.hue = 260 + Math.random() * 40; // purple-blue
    this.alpha = 0.08;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );

    gradient.addColorStop(0, `hsla(${this.hue},100%,70%,${this.alpha})`);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (
      this.x < -this.radius ||
      this.x > canvas.width + this.radius ||
      this.y < -this.radius ||
      this.y > canvas.height + this.radius
    ) {
      this.reset();
    }
  }
}

const auroras = [];
for (let i = 0; i < 6; i++) auroras.push(new Aurora());

function animateAurora() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  auroras.forEach(a => {
    a.update();
    a.draw();
  });
  requestAnimationFrame(animateAurora);
}
animateAurora();


// Scroll animations
const hiddenElements = document.querySelectorAll('.hidden');
window.addEventListener('scroll', () => {
  hiddenElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if(elTop < windowHeight - 100){
      el.classList.add('show');
    }
  });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));

// Active nav link highlighting
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 100;
  navItems.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
      navItems.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Typing effect
const typingText = ["MCA Fresher", "Developer", "Android & Web Enthusiast"];
let index = 0, charIndex = 0;
const typingSpan = document.querySelector(".typing");
function type() {
  if(index >= typingText.length) index = 0;
  if(charIndex < typingText[index].length){
    typingSpan.textContent += typingText[index][charIndex];
    charIndex++;
    setTimeout(type, 150);
  } else setTimeout(erase, 1000);
}
function erase() {
  if(charIndex > 0){
    typingSpan.textContent = typingText[index].substring(0,charIndex-1);
    charIndex--;
    setTimeout(erase,100);
  } else { index++; setTimeout(type,500); }
}
type();

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  // Create details overlay dynamically
  const details = document.createElement('div');
  details.classList.add('project-details');
  details.innerHTML = `
    <p>${card.dataset.desc}</p>
    <p><strong>Tech Stack:</strong> ${card.dataset.tech}</p>
    ${card.dataset.github ? `<a href="${card.dataset.github}" target="_blank">GitHub</a>` : ''}
    ${card.dataset.live ? `<a href="${card.dataset.live}" target="_blank">Live Demo</a>` : ''}
  `;
  card.appendChild(details);

  // Toggle active on project name click
  const projectName = card.querySelector('h3');
  projectName.addEventListener('click', e => {
    e.stopPropagation();
    projectCards.forEach(c => { if(c !== card) c.classList.remove('active'); });
    card.classList.toggle('active');
  });
});
