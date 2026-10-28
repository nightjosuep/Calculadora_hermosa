import { Pressable, Platform, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/Colors';

interface Props {
  label: string;
  color?: string;
  doubleSize?: boolean;
  size: number;
  onPress: () => void;
}

export const CalculatorButton = ({
  label,
  color = Colors.buttonNumber,
  doubleSize = false,
  size,
  onPress,
}: Props) => {
  const handlePress = () => {
    const feedback = Platform.OS === 'android'
      ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Keyboard_Tap)
      : Haptics.selectionAsync();

    void feedback.catch(() => {});
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: color,
          opacity: pressed ? 0.8 : 1,
          height: size,
          borderRadius: size / 2,
          flex: doubleSize ? 2 : 1,
        },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, { fontSize: Math.min(30, Math.max(14, size * 0.36)) }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
  },
  buttonText: {
    fontFamily: 'blackOpsOne',
    color: Colors.buttonText,
  },
});