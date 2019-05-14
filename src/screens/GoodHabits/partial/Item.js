import React from 'react';
import styled from 'styled-components';
import {object} from 'prop-types';
import {Icon} from 'native-base';
import {withNavigation} from 'react-navigation';

// Locals
import {Text, Button} from '~/commons';

export const Item = withNavigation(({item, navigation, routeName}) => (
  <ItemWrapper>
    <ItemButton
      onPress={() =>
        navigation.navigate(routeName, {
          item: item
        })
      }
    >
      <Label size={13} secondary ellipsizeMode="tail" numberOfLines={1}>
        {item.title}
      </Label>
      <Arrow name="arrow-forward" />
    </ItemButton>
  </ItemWrapper>
));

Item.propTypes = {
  manual: object
};

const ItemWrapper = styled.View`
  background-color: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.bg};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const ItemButton = styled(Button)`
  justify-content: space-between;
  padding-left: 10;
  padding-right: 10;
  padding-top: 20;
  padding-bottom: 20;
`;

const Arrow = styled(Icon)`
  font-size: 16;
  color: ${props => props.theme.textSecondary};
`;

const PostWrapper = styled.View`
  flex: 1;
  background: ${props => props.theme.bgSecondary};
`;

const Label = styled(Text)`
  width: 90%;
`;
