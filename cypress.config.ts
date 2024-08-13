import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // базовый урл сайт, можно и через env передавать ссылки
    // на тестовые среды, среды на стенды которые поднимаем в рамках
    // ci/cd, препрод. стенды которые гоняются на данных приближенных
    // проду
    baseUrl: "http://localhost:3000/",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
