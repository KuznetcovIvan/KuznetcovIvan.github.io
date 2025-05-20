import json
from googletrans import Translator

translator = Translator()


def translate_text(text, src='ru', dest='en'):
    try:
        return translator.translate(text, src=src, dest=dest).text
    except Exception as error:
        print(f'Ошибка перевода: {error}')
        return text


with open('projects.json', 'r', encoding='utf-8') as file:
    projects = json.load(file)

translated_projects = []
for project in projects:
    translated_project = {
        'title': translate_text(project['title']),
        'description': translate_text(project['description']),
        'techStack': project['techStack'],
        'link': project['link']
    }
    translated_projects.append(translated_project)

with open('projects_en.json', 'w', encoding='utf-8') as file:
    json.dump(translated_projects, file, ensure_ascii=False, indent=2)

print('Перевод завершён, файл projects_en.json создан/перезаписан.')
