import {View, Text} from 'react-native';
import {useGetPokemonsPaginatorQuery} from '../services/pokemon';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, ScrollView} from 'react-native';
import PokemonsList from '../components/Lists/PokemonList';
import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native-paper';
import colors from '../app/colors';

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  paginationButton: {
    width: '35%',
    backgroundColor: colors.backGroundSurface,
  },

  centererView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: colors.primaryTextColor, padding: 5},
});

const getPaginationButtonOpacity = isActive => {
  if (!isActive) {
    return {opacity: 0};
  }
  return {};
};
const PaginationButtons = ({
  isPrevActive,
  isNextActive,
  page,
  incrementPage,
  decrementPage,
}) => {
  return (
    <View style={{...styles.buttonsContainer}}>
      <Button
        style={{
          ...styles.paginationButton,
          ...getPaginationButtonOpacity(isPrevActive),
        }}
        onPress={decrementPage}
        disabled={!isPrevActive}
        mode={'contained-tonal'}
        textColor={styles.text.color}
        contentStyle={{...styles.text}}>
        Previous
      </Button>

      <View style={{...styles.centererView}}>
        <Text style={{...styles.text}}>Page: {page}</Text>
      </View>
      <Button
        style={{
          ...styles.paginationButton,
          ...getPaginationButtonOpacity(isNextActive),
        }}
        onPress={incrementPage}
        disabled={!isNextActive}
        mode={'contained-tonal'}
        textColor={styles.text.color}
        contentStyle={{...styles.text}}>
        <Text>Next</Text>
      </Button>
    </View>
  );
};

export default PaginationButtons;
