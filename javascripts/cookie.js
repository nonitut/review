document.addEventListener("DOMContentLoaded", () => {
const popup = document.getElementById("cookiePopup");
const acceptBtn = document.getElementById("acceptCookies");
const declineBtn = document.getElementById("declineCookies");
const checkbox = document.getElementById("policyAgree");

// Кнопки заблокированы до галочки
acceptBtn.disabled = true;
declineBtn.disabled = true;

checkbox.addEventListener("change", () => {
const enabled = checkbox.checked;
acceptBtn.disabled = !enabled;
declineBtn.disabled = !enabled;
});

// Скрытие попапа по любой кнопке
acceptBtn.addEventListener("click", () => {
popup.style.display = "none";
});

declineBtn.addEventListener("click", () => {
popup.style.display = "none";
});
});
