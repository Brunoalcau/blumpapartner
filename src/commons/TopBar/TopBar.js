import React from 'react';
import styled from 'styled-components/native';
import {oneOfType, element, string, bool} from 'prop-types';
import {compose, pure, setPropTypes, withProps} from 'recompose';
import {isNumber} from 'lodash';
import {
  Header as HeaderNative,
  Left as LeftNative,
  Body as BodyNative,
  Right as RightNative
} from 'native-base';

// locals
import {StatusBarBackground} from '../StatusBarBackground';
import {Text} from '../Text';

export const TopBar = compose(
  setPropTypes({
    leftComponent: oneOfType([element, string]),
    rightComponent: element,
    title: string,
    logo: bool
  }),
  withProps(({notEmpty}) => ({
    notEmpty: isNumber(notEmpty) ? notEmpty : true
  })),
  pure
)(({leftComponent, title, logo, rightComponent, notEmpty}) => (
  <Header>
    <Choose>
      <When condition={leftComponent}>
        <Left>{leftComponent}</Left>
      </When>
      <When condition={!leftComponent}>
        <Left />
      </When>
    </Choose>
    <Body>
      <Text weight="bold">{title}</Text>
    </Body>
    <Choose>
      <When condition={rightComponent}>
        <Right>{rightComponent}</Right>
      </When>
      <When condition={!rightComponent}>
        <Right />
      </When>
    </Choose>
  </Header>
));

const MainWrapper = styled.View`
  z-index: 2;
`;

const Header = styled(HeaderNative)`
  background-color: ${props => props.theme.bgSecondary};
`;

const Body = styled(BodyNative)`
  flex: 2;
`;
const Left = styled(LeftNative)`
  padding-left: 9;
`;

const Right = styled(RightNative)`
  padding-right: 10;
`;
