import { Button } from "../Atomic/atoms/Button.js";

export const darkMode = () => {
    const elementsToToggle = [
        document.body,
        document.getElementById("header-container"),
        document.getElementById("items-container"),
        document.getElementById("card-container"),
        document.getElementById("menu-container"),
    ];

    const applyDarkMode = (enable) => {
        elementsToToggle.forEach(el => el?.classList.toggle("dark-mode", enable));
        document.querySelectorAll(".card").forEach(card => card.classList.toggle("dark-mode", enable));
        localStorage.setItem("darkMode", enable);
    };

    const toggleButton = new Button('Dark Mode', () => {
        const isDarkMode = !document.body.classList.contains('dark-mode');
        applyDarkMode(isDarkMode);
    });

    if (localStorage.getItem("darkMode") === "true") {
        applyDarkMode(true);
    }

    return toggleButton;
};
