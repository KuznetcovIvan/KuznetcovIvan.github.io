// Функция для определения предпочитаемой темы пользователя
function getPreferredTheme() {
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Функция для установки темы
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Обновление иконок
    if (theme === 'dark') {
        document.getElementById('moon-icon').style.display = 'none';
        document.getElementById('sun-icon').style.display = 'inline';
    } else {
        document.getElementById('moon-icon').style.display = 'inline';
        document.getElementById('sun-icon').style.display = 'none';
    }
}

// Функция переключения темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Инициализация темы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTheme(getPreferredTheme());
    
    // Обработчик клика на кнопке переключения темы
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});