module.exports = (layer, componentName) => `import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ${componentName} } from './${componentName}';

export default {
  title: '${layer}/${componentName}',
  component: ${componentName},
} as Meta<typeof ${componentName}>;

const Template: StoryFn<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  
};`;
