document.addEventListener("DOMContentLoaded", () => {
const title = document.querySelector("#hero-title");

// разбиваем текст по буквам, пробелы через &nbsp;
const letters = title.textContent.split("");
title.innerHTML = letters
.map(l => l === " " ? `<span class="letter">&nbsp;</span>` : `<span class="letter">${l}</span>`)
.join("");

gsap.registerPlugin(ScrollTrigger);

gsap.to(".letter", {
y: -150,             // улетают вверх
x: (i, target) => (i % 2 === 0 ? -1 : 1), // улетают в стороны чередуя
opacity: 0,          // исчезают
stagger: {
    each: 0.05,        // задержка между буквами
    from: "center"     // старт с центра слова
},
ease: "power2.out",
scrollTrigger: {
    trigger: "#hero",
    start: "top 1%",  
    end: "bottom top",
    scrub: true
}
});
});
