import React from 'react';
import styled from 'styled-components';
import {withNavigation} from 'react-navigation';

// Locals
import {Card, Text, Button} from '~/commons';

export const CardItem = withNavigation(({item, navigation}) => (
  <Card>
    <If condition={item}>
      <Content>
        <Title inverted>{item.format_date}</Title>
        <Label>{item.hours} de serviços</Label>
        <ButtonAccept
          transparent
          onPress={() => navigation.navigate('ServiceDetail', {id: item.id})}
        >
          <LabelButton>Detalhes</LabelButton>
        </ButtonAccept>
      </Content>
    </If>
  </Card>
));

const Content = styled.View`
  text-align: center;
  width: 100%;
`;

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

const LabelButton = styled(Text)`
  font-weight: 500;
  font-size: ${props => props.theme.fontSizeTitle};
  color: ${props => props.theme.tertiary};
`;

const ButtonAccept = styled(Button)`
  text-align: center;
  padding-top: 5;
`;
