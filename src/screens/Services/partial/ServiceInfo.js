import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { Text } from 'native-base';

export const ServiceInfo = ({ item }) => {
  return (
    <Wrapper>
      <If condition={!!item}>
        <Title>{item.format_date}</Title>
        <Label>{item.hours} Hora(s) de serviços</Label>
        <Label>{item.address}</Label>
        <Choose>
          <When condition={item.ironing}>
            <Label>Passar Roupa</Label>
          </When>
          <When condition={item.dishwasher}>
            <Label>Lavar Louça</Label>
          </When>
          <When condition={item.sustainable}>
            <Label>Produtos Sustentáveis</Label>
          </When>
        </Choose>
      </If>
    </Wrapper>
  );
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

const Wrapper = styled.View``;
