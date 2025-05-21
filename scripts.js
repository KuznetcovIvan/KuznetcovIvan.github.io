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
    
    // Обновление иконок для шапки
    document.getElementById('moon-icon').style.display = theme === 'dark' ? 'none' : 'inline';
    document.getElementById('sun-icon').style.display = theme === 'dark' ? 'inline' : 'none';
}

// Функция переключения темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Функция для определения языка
function getPreferredLanguage() {
    if (localStorage.getItem('language')) {
        return localStorage.getItem('language');
    }
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang.startsWith('ru') ? 'ru' : 'en';
}

// Функция для установки языка
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    
    // Обновляем заголовок
    document.getElementById('header-title').textContent = lang === 'ru' ? 'Мои проекты' : 'My projects';
    
    // Обновляем кнопку переключения языка
    document.getElementById('lang-button-text').textContent = lang === 'ru' ? 'Translate' : 'Перевести';
    
    // Обновляем текст кнопки профиля
    document.getElementById('profile-button-text').textContent = lang === 'ru' ? 'В профиль GitHub' : 'To GitHub profile';
    
    // Загружаем проекты на выбранном языке
    loadProjects(lang);
}

// Функция переключения языка
function toggleLanguage() {
    const currentLang = localStorage.getItem('language') || 'ru';
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
}

// Функция для создания карточки проекта
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = function() {
        window.open(project.link, '_blank');
    };

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;

    const techStack = document.createElement('div');
    techStack.className = 'tech-stack';

    project.techStack.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techStack.appendChild(tag);
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(techStack);

    return card;
}

// Функция для загрузки проектов из JSON файла
function loadProjects(lang = 'ru') {
    const file = lang === 'ru' ? 'projects.json' : 'projects_en.json';
    
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(lang === 'ru' ? 'Не удалось загрузить данные проектов' : 'Failed to load project data');
            }
            return response.json();
        })
        .then(projects => {
            const projectsGrid = document.querySelector('.projects-grid');
            projectsGrid.innerHTML = '';
            
            projects.forEach(project => {
                const card = createProjectCard(project);
                projectsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error(lang === 'ru' ? 'Ошибка при загрузке проектов:' : 'Error loading projects:', error);
            document.querySelector('.projects-grid').innerHTML = `
                <div class="error-message">
                    <p>${lang === 'ru' ? 'Не удалось загрузить проекты. Пожалуйста, попробуйте позже.' : 'Failed to load projects. Please try again later.'}</p>
                </div>
            `;
        });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем тему
    setTheme(getPreferredTheme());
    
    // Устанавливаем язык
    setLanguage(getPreferredLanguage());
    
    // Обработчик клика для переключения темы
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Обработчик клика для переключения языка
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
});