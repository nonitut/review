document.addEventListener("DOMContentLoaded", () => {
const items = document.querySelectorAll(".service-item");

items.forEach(item => {
const desc = item.querySelector(".service-description");

// Базовое состояние
desc.style.overflow = "hidden";
desc.style.transition = "height 0.5s ease, opacity 0.5s ease, padding 0.5s ease";
desc.style.height = "0";
desc.style.opacity = "0";
desc.style.paddingTop = "0";

item.addEventListener("click", () => {
    item.classList.toggle("active");

    if (item.classList.contains("active")) {
    // раскрытие (делаем чуть больше, чем scrollHeight, чтобы был запас)
    desc.style.height = desc.scrollHeight + 20 + "px";
    desc.style.opacity = "1";
    desc.style.paddingTop = "1vw";
    } else {
    // сворачивание
    desc.style.height = "0";
    desc.style.opacity = "0";
    desc.style.paddingTop = "0";
    }
});
});
});
