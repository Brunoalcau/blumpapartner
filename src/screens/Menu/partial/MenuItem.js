import React from 'react';
import styled from 'styled-components';
import { string, object, number } from 'prop-types';
import { withNavigation } from 'react-navigation';
import withRematch from 'with-rematch';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { resetTo } from '~/helpers';
const model = {
  state: {},
  reducers: {
    get() {}
  },
  effects: actions => ({
    async onPress(payload, state, { leave, routeName, navigation, chat }) {
      if (leave) {
        await AsyncStorage.setItem('userToken', '');
        resetTo(routeName, 'Auth');
      } else {
        console.log(chat);
        navigation.navigate(routeName, { channel: chat });
      }
    }
  })
};

// Locals
import { Icon, Text, Button } from '~/commons';
export const MenuItem = withNavigation(
  withRematch(model)(({ icon, children, navigation, routeName, actions }) => (
    <ItemWrapper>
      <ItemButton onPress={actions.onPress}>
        <Left>
          <Icon name={icon} />
          <Label secondary>{children}</Label>
        </Left>
      </ItemButton>
    </ItemWrapper>
  ))
);

MenuItem.propTypes = {
  icon: string,
  routeName: string,
  children: string,
  navigation: object,
  actions: object
};

const ItemWrapper = styled.View`
  background-color: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.bg};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const Left = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Label = styled(Text)`
  padding-left: 17;
`;

const ItemButton = styled(Button)`
  justify-content: space-between;
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
`;
