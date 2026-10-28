import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  label: string;
  color?: string;
  doubleSize?: boolean;
  onPress: () => void;
}

export const CalculatorButton = ({
  label,
  color = Colors.buttonNumber,
  doubleSize = false,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
        doubleSize ? styles.doubleSize : {},
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  doubleSize: {
    width: 176,
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'blackOpsOne',
    color: Colors.buttonText,
  },
});