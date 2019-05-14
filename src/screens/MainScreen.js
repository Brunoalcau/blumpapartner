import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

const MainScreen = ({navigation}) => (
  <View style={styles.container}>
    <Text>Home</Text>
    <Button
      onPress={() => navigation.navigate({routeName: 'Profile'})}
      title="Go To Profile"
    />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen'
};

export default MainScreen;
