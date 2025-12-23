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

// 3D TILT + MODAL POPUP
document.querySelectorAll('.project-card').forEach(card => {

  // ---- 3D Tilt (Desktop only)
  card.addEventListener('mousemove', e => {
    if (window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });

  // ---- Modal popup
  card.addEventListener('click', () => {

    const modal = document.createElement('div');
    modal.className = 'project-modal';

    modal.innerHTML = `
      <div class="modal-content">
        <h2>${card.dataset.title}</h2>
        <p>${card.dataset.desc}</p>
        <p><strong>Tech:</strong> ${card.dataset.tech}</p>

        <div class="modal-actions">
          <a href="${card.dataset.github}" target="_blank">GitHub</a>
          <a href="${card.dataset.live}" target="_blank">Live Demo</a>
        </div>

        <div class="modal-close">Close</div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', e => {
      if (e.target.classList.contains('project-modal') ||
          e.target.classList.contains('modal-close')) {
        modal.remove();
      }
    });

  });

});
