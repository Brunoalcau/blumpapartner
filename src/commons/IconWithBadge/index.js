import React from 'react';
import {Badge as BadgeNative, Icon as IconNative} from 'native-base';
import {string} from 'prop-types';
import styled from 'styled-components';
// Locals
import {Text as TextNative} from '../Text';
export const IconWithBadge = ({icon, size, ...props}) => {
  return (
    <Wrapper>
      <Icon {...props} name={icon} />
      <If condition={size}>
        <Badge>
          <Text size={10}>{size}</Text>
        </Badge>
      </If>
    </Wrapper>
  );
};

IconWithBadge.propTypes = {
  icon: string
};

const Icon = styled(IconNative).attrs(props => ({
  color: props.color || props.theme.icon
}))`
  font-size: 25;
  color: ${props => props.color};
`;

const Wrapper = styled.View`
  position: absolute;
  width: 24;
  height: 24;
  margin-top: 5;
  margin-left: 5;
  margin-bottom: 5;
  margin-right: 5;
`;

const Badge = styled.View`
  position: absolute;
  right: -6;
  top: -3;
  background-color: red;
  border-radius: 6;
  width: 12;
  height: 12;
  justify-content: center;
  align-items: center;
`;

const Text = styled(TextNative)`
  position: absolute;
`;
