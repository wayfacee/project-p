import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comment';
import * as ratingCommands from './commands/rating';

// чтобы мог обрабатоывать
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// Cypress.Commands.overwrite('intercept', () => {
//   // передаем флажок через енв (READ | WRITE)
//   const FIXTURE_MODE = process.env.FIXTURE_MODE;
//   // generating name:
//   const fixtureName = req.METHOD + req.url + hash(req.body);

//   // записываем (автоматом), или считываем
//   if (FIXTURE_MODE === 'READ') {
//     // новую фикстуру не записваем, считываем из сущ. файлов
//     reqFixture(fixtureName);
//   }

//   // прогоняем файлы, записываем фикстуры в реж. WRITE
//   // затем где-нидь в ci или в релизной регрессии, или наоборот
//   // релизной регрессии - мы проверяем на рял данных. без фикстур
//   // а в ci, чтоб сервак не перегруз мы исп. фикстуры
//   if (FIXTURE_MODE === 'WRITE') {
//     // можем получ. данные из запроса. и на основ. этих данных
//     // фикстуру в автоматиз. режиме запис.
//     // cy.intercept('GET', '**/articles?*', req => { req. })
//     createFixture(fixtureName);
//   }

//   // local создаем задачу -> создаем pull request -> test
//   // представьте что у вас 30 фронтендеров
//   // для кд разрабов будут прогоняться тесты -> бесит -> spam backend
//   // + back is not stabable -> поднимать, опускать итд.
//   // и к тестам никто серьзено не будет относ.

//   // (115 модуль)
//   // поэтому в ci, для отдел. взятых пулл реквестов
//   // можем запросами работать в рамках фикстур, которые
//   // заранее были записаны, если кто то что-то ломает
//   // тесты отловят

//   // а вот когда прогоняем тесты перед релизом
//   // когда отводим релиз. ветку, запуск. тот же ci
//   // там мы можем перем. окруж. фикстурмод передавать как АПИ
//   // и тесты будут выполняться на рял данных, но там уже
//   // не 40-50 чел. спамят в сервер, а всего одна релиз. регрессия
//   // одна релиз. проверка работоспособности нашего сервиса
//   if (FIXTURE_MODE === 'API') {
//   }
// });
