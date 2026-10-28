// styles/global-styles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const globalStyles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  
  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  
  displayContainer: {
    backgroundColor: Colors.displayBackground,
    borderRadius: 20, 
    padding: 20,
    marginBottom: 20,
    minHeight: 180,
    justifyContent: 'flex-end',
  },

  
  mainResult: {
    color: Colors.displayText,
    fontSize: 60,
    textAlign: 'right',
    fontFamily: 'blackOpsOne',
  },

  
  subResult: {
    color: Colors.displayText,
    fontSize: 25,
    textAlign: 'right',
    fontFamily: 'blackOpsOne',
    marginBottom: 5,
  },
});