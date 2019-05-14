import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

const goBack = () => {
  _navigator._navigation.goBack();
};

const resetTo = async (routeName, key) => {
  const actionToDispatch = StackActions.reset({
    index: 0,
    key: key,
    actions: [NavigationActions.navigate({ routeName })]
  });
  await _navigator.dispatch(actionToDispatch);
};

export { navigate, setTopLevelNavigator, resetTo, goBack };
