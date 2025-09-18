document.addEventListener("DOMContentLoaded", () => {
const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

// если вдруг элементов нет, выходим
if (!cursor || !dot) return;

document.addEventListener("mousemove", (e) => {
cursor.style.top = e.pageY + "px";
cursor.style.left = e.pageX + "px";

dot.style.top = e.pageY + "px";
dot.style.left = e.pageX + "px";
});
});
