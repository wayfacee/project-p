import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

/**
 * чтобы не искать типы, и автоматом удалять
 *npx ts-node .\scripts\remove-feature.ts isCounterEnabled on

  если будет много фича флагов, можем быстро удалить,
  важно внутри только надо вызывать, а не передавать лишние 
  переменные итд.
  
  const counter = toggleFeatures({
    name: "isCounterEnabled",
    on: () => <CounterRedesigned />,
    off: () => <Counter />,
  }) => 
  const counter = <CounterRedesigned />
  })
 */
const removedFeatureName = process.argv[2]; // isArticleEnabled
const featureState = process.argv[3]; // on / off

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!removedFeatureName) {
  throw new Error('Укажите название фича-флага');
}

if (!featureState) {
  throw new Error('Укажите состояние фичи (on или off)');
}

if (featureState !== 'on' && featureState !== 'off') {
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
      child.getText() === toggleFunctionName
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

function isToggleComponent(node: Node) {
  // находим 1-дочерний элемент по типу у ноду
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

// ------------------

const replaceToggleFunction = (node: Node) => {
  // находим с типом callExpression

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

  if (featureName !== removedFeatureName) return;

  if (featureState === 'on') {
    // ?? - чтоб тс не ругался
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};

const getAttributeNodeByName = (
  jsxAttributes: JsxAttribute[],
  name: string,
) => {
  return jsxAttributes.find((node) => {
    const nameNode = node.getNameNode();
    return nameNode.getText() === name;
  });
};

// если есть кавычки, on(<button>ddd</button), уберет:
const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceComponent = (node: Node) => {
  // получаем аттр. = []
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  // 'feature' - кавычки
  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1);

  if (featureName !== removedFeatureName) return;

  // компоненты внутри он / офф
  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === 'on' && onValue) {
    // от гетТекст избавились, пошта строка возв.
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  // чтобы обойти всех потомков:
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      // заменяем потом начинаем работать, поэтому ретурн надо добавить
      return replaceToggleFunction(node);
    }

    // будет всегда одиноч., без чилдрен
    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      return replaceComponent(node);
    }
  });
});

project.save();
