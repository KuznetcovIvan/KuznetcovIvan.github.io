# [Веб-страница-портфолио](https://kuznetcovivan.github.io/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=plastic&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=plastic&logo=python&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=plastic&logo=githubactions&logoColor=white)


Адаптивная веб-страница, стилизованная под GitHub. Предназначена для наглядной демонстрации проектов с возможностью удобного редактирования через JSON.

---

## Возможности
- **Адаптивный дизайн**: Корректно отображается на разных устройствах.
- **Переключение тем**: Переключение между светлой и тёмной темами.
- **Мультиязычность**: Поддержка русского и английского языков. 
- **Динамические карточки проектов**: Загружаются из `projects.json`; каждая карточка ведёт на соответствующий репозиторий.
- **CI/CD**: Автоматический перевод json на английский язык и деплой через GitHub Actions.

---

## Технологии
- HTML, CSS, JavaScript
- Python (googletrans)
- GitHub Actions

---

## Установка и запуск локально
1. Клонируйте [репозиторий](https://github.com/KuznetcovIvan/KuznetcovIvan.github.io)
   `git clone https://github.com/KuznetcovIvan/KuznetcovIvan.github.io.git
   `
2. Перейдите в директорию с проектом `cd KuznetcovIvan.github.io`
3. Создайте виртуальное окружение `python -m venv venv`
4. Активируйте окружение `source venv\Scripts\activate` (`source venv/bin/activate` - для Linux/macOS)
5. Установите зависимости `pip install -r requirements.txt`
6. Запустите скрипт перевода для создания английской версии json `python translate.py`
7. Запустите сервер `python -m http.server 8000`
8. Откройте браузер и перейдите по адресу [http://localhost:8000](http://localhost:8000)

---

## Использование
- Переключайте тему кнопкой с `солнцем/луной`.
- Меняйте язык отображения кнопкой `Translate/Перевести`.
- Кликайте на карточки проектов для перехода в их репозитории на GitHub.
- Для перехода на страницу с профилем, нажмите кнопку расположеную в footer `В профиль GitHub/To GitHub profile`

---

## Как настроить для другого пользователя с деплоем на GitHub Pages

### 1. Форк проекта
1. Перейди на [страницу репозитория](https://github.com/KuznetcovIvan/KuznetcovIvan.github.io).
2. Нажми кнопку **Fork** в правом верхнем углу.
3. Выбери свой аккаунт — проект скопируется к тебе.
4. Переименуй репозиторий под `<yourusername>.github.io`.

### 2. Кастомизация под себя
1. Открой форк у себя
2. Замени ссылку на GitHub-профиль:

В файле `index.html` найди строки:
```html
<footer>
  <button class="profile-button" id="profile-button"
    onclick="window.location.href='https://github.com/KuznetcovIvan'">
    <span id="profile-button-text">В профиль GitHub</span>
  </button>
</footer>
```
И укажи в `window.location.href` путь к своему профилю на GitHub

3. В файле `projects.json` укажи свои проекты. 

Пример:
```json
[
  {
    "title": "My Flask App",
    "description": "Мой pet-проект на Flask.",
    "url": "https://github.com/yourusername/my-flask-app"
  }
]
```
### 3. Включи GitHub Pages.

- Зайди в свой репозиторий → Settings → Pages.

- В разделе Source выбери `Branch: main`, `Folder: / (root)`

- Сохрани. GitHub создаст сайт по адресу:
[https://yourusername.github.io](https://yourusername.github.io)


### 4. Включи нужные разрешения для GITHUB_TOKEN.
- Открой настройки репозитория:
`https://github.com/<твой_профиль>/<твой_репозиторий>/settings/actions`
- Пролистай до секции `Workflow permissions`
- Установи `✓ Read and write permissions`
- Нажми `Save`
Понял, сохраняю форматирование и только исправляю наклонения:


### 5. Проверь настройки GitHub Actions для автоматического перевода.

В файле `.github/workflows/translate.yml` прописано:

запускать перевод json при изменении файла `projects.json` или вручную со страницы Actions в репозитория

При этом выполняется:

- Устанавливается Python 3.9 и зависимости (из requirements.txt, включая googletrans).

- Запускается translate.py, который:

- Загружает projects.json

- Переводит названия и описания проектов на английский

- Сохраняет результат в projects\_en.json

Git добавляет изменения:

- projects\_en.json добавляется в коммит

- Выполняется push обратно в твой репозиторий

### 6. Проверь, что CI/CD работает исправно

- Отредактируй файл `projects.json` в корне проекта (можно через GitHub Web UI или локально).

- Сделай commit и push изменений (если работаешь через GitHub UI — просто «Commit changes»).

- Перейди во вкладку `Actions` в репозитории:

Там должен появиться workflow под названием `Translate projects`.

Убедись, что он запустился и все шаги прошли успешно (зелёные галочки).
### 7. Перейди на свой сайт [https://yourusername.github.io](https://yourusername.github.io)

---

### Автор: [Иван Кузнецов](https://github.com/KuznetcovIvan)
