import React from 'react';
import styled from 'styled-components';
import {object, func} from 'prop-types';
import {Text} from 'native-base';

// Locals
import {Card, Button} from '~/commons';

import {ServiceInfo} from './ServiceInfo';

export const ServiceCard = ({item, onConfirm}) => (
  <Card>
    <Content>
      <ServiceInfo item={item} />
      <ButtonAccept transparent onPress={onConfirm}>
        <LabelButton>Aceitar</LabelButton>
      </ButtonAccept>
    </Content>
  </Card>
);

ServiceCard.propTypes = {
  item: object,
  onConfirm: func.isRequired
};

const Title = styled(Text)`
  font-size: ${props => props.theme.fontSizeTitle};
  font-weight: 700;
  text-align: center;
`;

const Label = styled(Text)`
  text-align: center;
  font-weight: normal;
  padding-top: 5;
  font-size: ${props => props.theme.fontSizeTitle};
  color: ${props => props.theme.textSecondary};
`;

const Content = styled.View`
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LabelButton = styled(Text)`
  font-weight: 600;
  font-size: ${props => props.theme.fontSizeTitle};
  color: ${props => props.theme.tertiary};
`;

const ButtonAccept = styled(Button)`
  text-align: center;
  padding-top: 5;
`;
