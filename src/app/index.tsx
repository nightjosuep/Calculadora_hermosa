import { ScrollView, StyleSheet, View } from 'react-native';
import { CalculatorDisplay } from '../Components/CalculatorDisplay';
import { CalculatorGrid } from '../Components/CalculatorGrid';
import { useCalculator } from '../hooks/useCalculator';
import { globalStyles } from '../styles/global-styles';

export default function Index() {
  const calculator = useCalculator();

  return (
    <View style={globalStyles.calculatorContainer}>
      <CalculatorDisplay subText={calculator.expression} mainText={calculator.display} />
      <ScrollView
        style={styles.keyboardScroll}
        contentContainerStyle={styles.keyboardContent}
        showsVerticalScrollIndicator
      >
        <CalculatorGrid onPress={calculator.press} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardScroll: {
    flex: 1,
  },
  keyboardContent: {
    paddingBottom: 8,
  },
});