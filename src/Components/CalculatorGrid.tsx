import { View, StyleSheet } from 'react-native';
import { CalculatorButton } from './CalculatorButton';
import { Colors } from '../constants/Colors';

interface Props {
  onPress: (label: string) => void;
}

interface ButtonDefinition {
  label: string;
  value: string;
  color: string;
  doubleSize?: boolean;
}

const rows: ButtonDefinition[][] = [
  [
    { label: 'sin', value: 'sin', color: Colors.buttonFunction },
    { label: 'cos', value: 'cos', color: Colors.buttonFunction },
    { label: 'tan', value: 'tan', color: Colors.buttonFunction },
    { label: 'log', value: 'log', color: Colors.buttonFunction },
  ],
  [
    { label: 'xʸ', value: '^', color: Colors.buttonFunction },
    { label: '√', value: '√', color: Colors.buttonFunction },
    { label: 'a/b', value: 'a/b', color: Colors.buttonFunction },
    { label: 'ANS', value: 'ANS', color: Colors.buttonFunction },
  ],
  [
    { label: '(', value: '(', color: Colors.buttonFunction },
    { label: ')', value: ')', color: Colors.buttonFunction },
    { label: 'AC', value: 'AC', color: Colors.buttonFunction },
    { label: '÷', value: '÷', color: Colors.buttonOperation },
  ],
  [
    { label: '7', value: '7', color: Colors.buttonNumber },
    { label: '8', value: '8', color: Colors.buttonNumber },
    { label: '9', value: '9', color: Colors.buttonNumber },
    { label: '×', value: '×', color: Colors.buttonOperation },
  ],
  [
    { label: '4', value: '4', color: Colors.buttonNumber },
    { label: '5', value: '5', color: Colors.buttonNumber },
    { label: '6', value: '6', color: Colors.buttonNumber },
    { label: '-', value: '-', color: Colors.buttonOperation },
  ],
  [
    { label: '1', value: '1', color: Colors.buttonNumber },
    { label: '2', value: '2', color: Colors.buttonNumber },
    { label: '3', value: '3', color: Colors.buttonNumber },
    { label: '+', value: '+', color: Colors.buttonOperation },
  ],
  [
    { label: '0', value: '0', color: Colors.buttonNumber, doubleSize: true },
    { label: '.', value: '.', color: Colors.buttonNumber },
    { label: '=', value: '=', color: Colors.buttonOperation },
  ],
];

export const CalculatorGrid = ({ onPress }: Props) => (
  <View style={styles.container}>
    {rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((button) => (
          <CalculatorButton
            key={button.label}
            label={button.label}
            color={button.color}
            doubleSize={button.doubleSize}
            onPress={() => onPress(button.value)}
          />
        ))}
      </View>
    ))}
  </View>
);

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