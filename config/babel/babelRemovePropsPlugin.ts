import { PluginItem } from '@babel/core';

export default function babelRemovePlugin(): PluginItem {
  return {
    visitor: {
      // надо чтобы могли в плагин прокидывать пропсы
      Program(path, state) {
        // атр который хотим выпилить
        const forbidden = state.opts.props || [];

        // проходимся по всем нодам этого дерева
        path.traverse({
          // тип ноды: data-testid = JSXIdentifier
          JSXIdentifier(current) {
            // имя ноды:
            const nodeName = current.node.name;

            // nodeName === 'data-testid'
            // но в нашем случае мы не харкодим прям в плагин
            // название ноды, а мы проверяем те пропсы которые в плагин
            // прибежали
            if (forbidden.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}

// babelPlugin(['data-testid, 'sdfsdf'])
