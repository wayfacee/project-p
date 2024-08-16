import { Flex, FlexProps } from '../Flex/Flex';
// HStack - горизонт

type HStackProps = Omit<FlexProps, 'direction'>;
export const HStack = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};
