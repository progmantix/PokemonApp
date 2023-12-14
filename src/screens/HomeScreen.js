import {View} from 'react-native';
import {useGetPokemonsPaginatorQuery, usePrefetch} from '../services/pokemon';
import {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, ScrollView} from 'react-native';
import PokemonsList from '../components/Lists/PokemonList';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import PaginationButtons from '../components/PaginationButtons';
import LoadingScreen from './CommonScreens/LoadingScreen';
import ErrorScreen from './CommonScreens/ErrorScreen';
import colors from '../app/colors';

import * as React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.backGround,
  },
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    width: '35%',
    padding: 5,
  },
  centererView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const ListScreen = ({
  data,
  page,
  isPrevActive,
  isNextActive,
  incrementPage,
  decrementPage,
  isFetching,
  refetch,
}) => {
  const activityIndicator = isFetching ? (
    <View style={{...styles.centererView}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <></>
  );

  const bottomPagination = (
    <PaginationButtons
      isPrevActive={isPrevActive}
      isNextActive={isNextActive}
      page={page}
      incrementPage={incrementPage}
      decrementPage={decrementPage}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <PokemonsList
        data={data}
        bottomPagination={bottomPagination}
        isFetching={isFetching}
        refetch={refetch}
      />
    </SafeAreaView>
  );
};

const PokemonListRoute = () => {
  const [page, setPage] = useState(1);
  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    setPage(page - 1);
  };

  const {data, error, isFetching, refetch, isLoading} =
    useGetPokemonsPaginatorQuery(page);

  const prefetchPage = usePrefetch('getPokemonsPaginator');

  const prefetchNext = useCallback(() => {
    prefetchPage(page + 1);
  }, [prefetchPage, page]);

  let isNextActive = false;
  let isPrevActive = false;

  if (!error) {
    if (!isFetching) {
      if (data.next != null) {
        isNextActive = true;
      }
      if (data.previous != null) {
        isPrevActive = true;
      }
    }
  }

  useEffect(() => {
    if (isNextActive) {
      prefetchNext();
    }
  });

  let toRender = error ? (
    <ErrorScreen refetch={refetch} isFetching={isFetching} />
  ) : isLoading ? (
    <LoadingScreen />
  ) : data ? (
    <ListScreen
      page={page}
      isPrevActive={isPrevActive}
      isNextActive={isNextActive}
      incrementPage={incrementPage}
      decrementPage={decrementPage}
      data={data}
      isFetching={isFetching}
      refetch={refetch}
    />
  ) : null;

  return toRender;
};

const HomeScreen = () => {
  return <PokemonListRoute />;
};

export default HomeScreen;
