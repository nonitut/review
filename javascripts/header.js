document.addEventListener("DOMContentLoaded", function() {

const menuLinks = document.querySelectorAll('header nav a:not(:has(button))');

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

menuLinks.forEach(link => {
const text = link.textContent;
link.dataset.orig = text; 

link.addEventListener('mouseenter', () => {
let iterations = 0;
const scrambleInterval = setInterval(() => {
link.textContent = text
.split('')
.map(() => letters[Math.floor(Math.random() * letters.length)])
.join('');
iterations++;
if (iterations > 10) clearInterval(scrambleInterval);
}, 30);

link.dataset.scrambleInterval = scrambleInterval;
});

link.addEventListener('mouseleave', () => {
clearInterval(link.dataset.scrambleInterval);
link.textContent = link.dataset.orig;
});
});



// // JS звук
// const audio = document.getElementById('ambientAudio');
// const toggleBtn = document.getElementById('musicToggle');
// let musicStarted = false; // первый запуск с клика по экрану

// // Первый клик по странице, кроме кнопки, включает музыку
// document.body.addEventListener('click', function startMusic(e) {
// // Если клик по кнопке — игнорируем
// if (e.target === toggleBtn) return;

// if (!musicStarted) {
// audio.play();
// musicStarted = true;
// document.body.removeEventListener('click', startMusic);
// }
// });

// // Кнопка-тоггл
// toggleBtn.addEventListener('click', () => {
// if (audio.paused) {
// audio.play();
// toggleBtn.textContent = '🎧 ON';
// } else {
// audio.pause();
// toggleBtn.textContent = '🎧 OFF';
// }
// });




});