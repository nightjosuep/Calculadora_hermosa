import { View, StyleSheet } from 'react-native';
import { CalculatorButton } from './CalculatorButton';
import { Colors } from '../constants/Colors';

export const CalculatorGrid = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CalculatorButton label="AC" color={Colors.buttonFunction} onPress={() => {}} />
        <CalculatorButton label="+/-" color={Colors.buttonFunction} onPress={() => {}} />
        <CalculatorButton label="%" color={Colors.buttonFunction} onPress={() => {}} />
        <CalculatorButton label="÷" color={Colors.buttonOperation} onPress={() => {}} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="7" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="8" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="9" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="×" color={Colors.buttonOperation} onPress={() => {}} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="4" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="5" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="6" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="-" color={Colors.buttonOperation} onPress={() => {}} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="1" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="2" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="3" color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="+" color={Colors.buttonOperation} onPress={() => {}} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="0" color={Colors.buttonNumber} doubleSize onPress={() => {}} />
        <CalculatorButton label="." color={Colors.buttonNumber} onPress={() => {}} />
        <CalculatorButton label="=" color={Colors.buttonOperation} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});