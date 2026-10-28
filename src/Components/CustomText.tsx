import { Text, type TextProps } from 'react-native';
import { globalStyles } from '../styles/global-styles';

interface Props extends TextProps {
  variant?: 'main' | 'sub';
}

export const CustomText = ({ children, style, variant = 'main', ...rest }: Props) => {
  return (
    <Text
      style={[
        variant === 'main' ? globalStyles.mainResult : globalStyles.subResult,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};