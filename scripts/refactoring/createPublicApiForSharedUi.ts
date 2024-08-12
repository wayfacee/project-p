import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});


// файлы с исход. кодом с которыми будем робить
// тсМорф будет усильно по этим файлом проходиться
// а мы можем с ними работать как с обычн. объектами
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы
const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
// получаем папку, в которой наши комп.
const sharedUiDirectory = project.getDirectory(uiPath);
const componetnDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some(layer => value.startsWith(layer));
}

componetnDirs?.forEach(directory => {
  // путь до index.ts файла
  const indexFilePath = `${directory.getPath()}/index.ts`;
  const indexFile = directory.getSourceFile(indexFilePath);

  if (!indexFile) {
    // re-export, не рекоменд! но для ui комп. у которых в одном
    // файле кроме самого комп. + макс. интерфейса ниче нет
    // это допустимо
    const sourceCode = `export * from './${directory.getBaseName()}';`
    // 1) путь до файла 2) код который будет внутри файла 
    // 3) опции (overwrite - если хотим чтобы файл перезаписался)
    const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

    file.save();
  }
})

files.forEach(sourceFile => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach(importDeclaration => {
    // то откуда идет импорт:
    const value = importDeclaration.getModuleSpecifierValue();
    const valeuWithoutAlias = value.replace('@', '');

    const segments = valeuWithoutAlias.split('/');
    const isSharedLayer = segments[0] === 'shared';
    const isUiSlice = segments[1] === 'ui';

    if (isAbsolute(valeuWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valeuWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

// чтобы тс морф применил изменения:
project.save();