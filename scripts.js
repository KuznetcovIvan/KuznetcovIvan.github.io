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
function loadProjects() {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные проектов');
            }
            return response.json();
        })
        .then(projects => {
            const projectsGrid = document.querySelector('.projects-grid');
            projectsGrid.innerHTML = ''; // Очищаем сетку перед добавлением новых карточек
            
            projects.forEach(project => {
                const card = createProjectCard(project);
                projectsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке проектов:', error);
            document.querySelector('.projects-grid').innerHTML = `
                <div class="error-message">
                    <p>Не удалось загрузить проекты. Пожалуйста, попробуйте позже.</p>
                </div>
            `;
        });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем тему
    setTheme(getPreferredTheme());
    
    // Обработчик клика на кнопке переключения темы
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Загружаем проекты
    loadProjects();
});