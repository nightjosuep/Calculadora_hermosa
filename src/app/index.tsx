import { View } from 'react-native';
import { CalculatorDisplay } from '../Components/CalculatorDisplay';
import { CalculatorGrid } from '../Components/CalculatorGrid';
import { globalStyles } from '../styles/global-styles';

export default function Index() {
  return (
    <View style={globalStyles.calculatorContainer}>
      <CalculatorDisplay subText="28+67-20" mainText="75" />
      <CalculatorGrid />
    </View>
  );
}