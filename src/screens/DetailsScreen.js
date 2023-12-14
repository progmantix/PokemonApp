import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {useGetPokemonsByIdQuery} from '../services/pokemon';
import {getPokemonIdFromURL} from '../functions/generalFunctions';
import Unorderedlist from 'react-native-unordered-list';

import ErrorScreen from './CommonScreens/ErrorScreen';
import LoadingScreen from './CommonScreens/LoadingScreen';

import colors from '../app/colors';

/*
abilities (V)
moves (V)
name (V)
stats (V)
types (V)
weight (V)
held_items (V)

*/

const EmptyPlaceholder = ({placeholder}) => {
  return (
    <View style={{...styles.paragraphContainer}}>
      <Text style={{...styles.paragraph}}>
        This pokemon has no {placeholder}
      </Text>
    </View>
  );
};

const StringsToUnorderedList = ({strings}) => {
  const toRender = strings.map(item => {
    return (
      <Text
        key={item}
        style={{
          ...styles.paragraph,
          borderBottomColor: 'transparent',
          borderBottomWidth: 0,
        }}>
        {item}
      </Text>
    );
  });

  return <View style={{...styles.paragraphContainer}}>{toRender}</View>;
};

const Types = ({data}) => {
  const types = data.types;
  const typesStrings = [];
  for (const key in types) {
    typesStrings.push(`${types[key].type.name}`);
  }

  if (typesStrings.length == 0) {
    return <EmptyPlaceholder placeholder={'types'} />;
  }

  return <StringsToUnorderedList strings={typesStrings} />;
};

const DisplayDetailsScreen = ({data}) => {
  const id = data.id;
  const name = data.name;

  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <SafeAreaView style={{backgroundColor: colors.backGround, flex: 1}}>
      <ScrollView>
        <View style={{...styles.container}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              paddingTop: 30,
            }}>
            <Image
              style={{
                ...styles.mainImage,
                width: 200,
                height: 200,
              }}
              source={{
                uri: imageURL,
              }}
              resizeMode={'contain'}
            />
          </View>

          <View>
            <View style={{...styles.paragraphContainer}}>
              <Text style={{...styles.title}}>Name:</Text>
              <Text style={{...styles.paragraph}}>{name}</Text>
            </View>
            <View style={{...styles.paragraphContainer}}>
              <Text style={{...styles.title}}>Height:</Text>
              <Text style={{...styles.paragraph}}>{data.height} cm</Text>
            </View>
            <View style={{...styles.paragraphContainer}}>
              <Text style={{...styles.title}}>Weight:</Text>
              <Text style={{...styles.paragraph}}>{data.weight} kg</Text>
            </View>
            <View style={{...styles.paragraphContainer}}>
              <Text style={{...styles.title}}>Weight:</Text>
              <Text style={{...styles.paragraph}}>{data.weight} kg</Text>
            </View>
            <View style={{...styles.paragraphContainer}}>
              <Text style={{...styles.title}}>Types:</Text>
              <View>
                <Types data={data} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailsScreen = ({route}) => {
  const {url} = route.params;
  const id = getPokemonIdFromURL(url);

  const {data, error, isFetching, refetch, isLoading} =
    useGetPokemonsByIdQuery(id);
  console.log(`data ${data}`);

  let toRender = error ? (
    <ErrorScreen refetch={refetch} isFetching={isFetching} />
  ) : isLoading ? (
    <LoadingScreen />
  ) : data ? (
    <DisplayDetailsScreen data={data} />
  ) : null;

  return toRender;
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.backGround, padding: 16},

  title: {
    fontSize: 22,
    lineHeight: 38,
    color: colors.primaryTextColor,
    fontWeight: '700',
  },
  paragraphContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.backGroundSurface,
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: 18,
    color: colors.secondaryTextColor,
    lineHeight: 38,
    marginLeft: 10,
  },
  mainImage: {
    borderRadius: 50,
  },
});

export default DetailsScreen;
