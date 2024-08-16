import { Flex, FlexProps } from '../Flex/Flex';
// HStack - горизонт

type HStackProps = Omit<FlexProps, 'direction'>;
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated 
 */
export const HStack = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};
