import { Project } from 'ts-morph';

const project = new Project({});

// файлы с исход. кодом с которыми будем робить
// тсМорф будет усильно по этим файлом проходиться
// а мы можем с ними работать как с обычн. объектами
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы
const files = project.getSourceFiles();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    // то откуда идет импорт:
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

// чтобы тс морф применил изменения:
project.save();

// ts-node .\scripts\updateImports.ts
//
// npm install -g ts-node (если не работает, попробуй скачать)
