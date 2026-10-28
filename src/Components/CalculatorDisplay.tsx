import { View } from 'react-native';
import { CustomText } from './CustomText';
import { globalStyles } from '../styles/global-styles';

interface Props {
  subText: string;
  mainText: string;
}

export const CalculatorDisplay = ({ subText, mainText }: Props) => {
  return (
    <View style={globalStyles.displayContainer}>
      <CustomText variant="sub" numberOfLines={1} adjustsFontSizeToFit>
        {subText}
      </CustomText>
      <CustomText variant="main" numberOfLines={1} adjustsFontSizeToFit>
        {mainText}
      </CustomText>
    </View>
  );
};