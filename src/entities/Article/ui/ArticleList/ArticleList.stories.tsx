import type { Meta, StoryFn } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { Article } from '../../model/types/article';
import { ArticleView } from "@/entities/Article";

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
} as Meta<typeof ArticleList>;

const Template: StoryFn<typeof ArticleList> = (args) => <ArticleList {...args} />;

const article = {
  "id": "1",
  "title": "JS news",
  "subtitle": "What's new in JS",
  "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png",
  "views": 1022,
  "createdAt": "26.07.2022",
  user: {
    id: '1',
    username: 'ulbi tv',
    avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
  },
  "type": [
    "IT"
  ],
  "blocks": [
    {
      "id": "1",
      "type": "TEXT",
      "title": "Заголовок этого блока",
      "paragraphs": [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
      ]
    },
    {
      "id": "4",
      "type": "CODE",
      "code": "<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\"hello\"></p>\n\n    <script>\n      document.getElementById(\"hello\").innerHTML = \"Hello, world!\";\n    </script>\n  </body>\n</html>;"
    },
    {
      "id": "5",
      "type": "TEXT",
      "title": "Заголовок этого блока",
      "paragraphs": [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
      ]
    },
    {
      "id": "2",
      "type": "IMAGE",
      "src": "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
      "title": "Рисунок 1 - скриншот сайта"
    },
    {
      "id": "3",
      "type": "CODE",
      "code": "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
    },
    {
      "id": "7",
      "type": "TEXT",
      "title": "Заголовок этого блока",
      "paragraphs": [
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:"
      ]
    },
    {
      "id": "8",
      "type": "IMAGE",
      "src": "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
      "title": "Рисунок 1 - скриншот сайта"
    },
    {
      "id": "9",
      "type": "TEXT",
      "title": "Заголовок этого блока",
      "paragraphs": [
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы."
      ]
    }
  ]
} as Article;

export const isLoadingBig = Template.bind({});
isLoadingBig.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.BIG,
};


export const isLoadingSmall = Template.bind({});
isLoadingSmall.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.SMALL,
};

export const listSmall = Template.bind({});
listSmall.args = {
  articles: new Array(9)
    .fill(0)
    .map((item, index) => ({
      ...article,
      id: String(index)
    })),
  view: ArticleView.SMALL,
};

export const listBig = Template.bind({});
listBig.args = {
  articles: new Array(9)
    .fill(0)
    .map((item, index) => ({
      ...article,
      id: String(index)
    })),
  view: ArticleView.BIG,
};
