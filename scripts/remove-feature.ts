import { Node, Project, SyntaxKind } from 'ts-morph';

/**
 * чтобы не искать типы, и автоматом удалять
 *npx ts-node .\scripts\remove-feature.ts isCounterEnabled on

  если будет много фича флагов, можем быстро удалить,
  важно внутри только надо вызывать, а не передавать лишние 
  переменные итд.
  
  const counter = toggleFeatures({
    name: "isCounterEnabled",
    on: () => <CounterRedisgned />,
    off: () => <Counter />,
  }) => 
  const counter = <CounterRedisgned />
  })
 */
const removeFeatureName = process.argv[1]; // isArticleEnabled
const featureState = process.argv[2]; // on / off

if (!removeFeatureName) {
  throw new Error('Укажите название фича-флага');
}

if (!featureState) {
  throw new Error('Укажите состояние фичи (on или off)');
}

if (featureState !== 'on' && featureState === 'off') {
  throw new Error('Некорректное значение состояние фичи (on или off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  // если ноду нашли:
  let isToggleFeatures = false;

  // Нашли ноду, но могуть быть потомки
  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeatures'
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

files.forEach((sourceFile) => {
  // чтобы обойти всех потомков:
  sourceFile.forEachDescendant((node) => {
    // находим с типом callExpression
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
      );

      if (!objectOptions) return;

      const featureNameProperty = objectOptions.getProperty('name');
      const onFunctionProperty = objectOptions.getProperty('on');
      const offFunctionProperty = objectOptions.getProperty('off');

      // убираем кавычки:
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);
      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );

      if (featureName !== removeFeatureName) return;

      if (featureName === 'on') {
        // ?? - чтоб тс не ругался
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureName === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
