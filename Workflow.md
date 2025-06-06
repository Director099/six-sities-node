# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

Переменные окружения:

```bash
DB_HOST=string - адрес для подключения к БД
DB_USER=string - имя пользователя для подключения к БД
DB_PASSWORD=string - пароль для подключения к БД
DB_PORT=number - порт для подключения к БД
DB_NAME=string - имя БД
UPLOAD_DIRECTORY=string - директория для загрузки статики
STATIC_DIRECTORY_PATH=string - директория для хранения статики
JWT_SECRET=string - соль для создания токена
PORT=number - порт для входящих подключений к серверу
SALT=string - соль для хеширования пароля
HOST=string - хост на котором запущен сервер
```

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Запустить cli команды

```bash
npm run cli -- --<commandName> [--arguments]
```
Вызовет cli команду c переданными аргументами Подробнее о доступных командах: npm run cli -- --help

#### Запустить мок-сервер

```bash
npm run mock:server
```
Запустит сервер с набором моковых данных на порту 3123

#### Генерация моковых данных

Команда генерации 5 тестовых данных в файл .tsv.

> Вызывается после запуска мок-сервера

```bash
npm run cli -- --generate 5 ./mocks/mock-data.tsv http://localhost:3123/api
```

#### Импортировать данные в базу данных MongoDB

Команда импорта тестовых данных из файла `.tsv` в БД.

> Вызывается после генерации моковых данных

```bash
npm run cli -- --import ./mocks/mock-data.tsv admin test localhost six-cities secrect
```

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
