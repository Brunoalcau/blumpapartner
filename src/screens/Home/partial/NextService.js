import React from 'react';
import styled from 'styled-components';
import {object, func} from 'prop-types';
import {Icon as IconNative} from 'native-base';
// Locals
import {Text, Card as CardNative, Button} from '~/commons';

export const NextService = ({item, checkin}) => (
  <If condition={item}>
    <Card>
      <Content>
        <WrapperInfo>
          <Icon name="calendar" />
          <Text secondary>{item.date}</Text>
        </WrapperInfo>
        <WrapperInfo>
          <Icon name="time" />
          <Text secondary>{`${item.hourState} horas, ${
            item.hours
          } de serviço(s)`}</Text>
        </WrapperInfo>
        <WrapperInfo>
          <Icon name="pin" />
          <Text secondary>{item.address}</Text>
        </WrapperInfo>
        <Choose>
          <When condition={item.ironing}>
            <WrapperInfo>
              <Icon name="search" />
              <Text secondary>Passar Roupa</Text>
            </WrapperInfo>
          </When>
          <When condition={item.dishwasher}>
            <WrapperInfo>
              <Icon name="search" />
              <Text secondary>Lavar Louça</Text>
            </WrapperInfo>
          </When>
          <When condition={item.sustainable}>
            <WrapperInfo>
              <Icon name="search" />
              <Text secondary>Produtos Sustentáveis</Text>
            </WrapperInfo>
          </When>
        </Choose>
        <If condition={item.note}>
          <WrapperInfo>
            <Icon name="information-circle" />
            <Text secondary>{item.note}</Text>
          </WrapperInfo>
        </If>
        <ButtonNextService tertiary>
          <Text> Fale com o cliente</Text>
        </ButtonNextService>
        <ButtonNextService inverted>
          <Text secondary> Cancelar</Text>
        </ButtonNextService>
        <Choose>
          <When condition={item.can_check_in}>
            <ButtonNextService
              success
              onPress={() =>
                checkin({
                  type: 'checkin',
                  work_ticket_id: item.id
                })
              }
            >
              <Text> Estou no local</Text>
            </ButtonNextService>
          </When>
          <When condition={item.can_check_out}>
            <ButtonNextService
              success
              onPress={() =>
                checkin({
                  type: 'checkout',
                  work_ticket_id: item.id
                })
              }
            >
              <Text>Finalizei</Text>
            </ButtonNextService>
          </When>
        </Choose>
      </Content>
    </Card>
  </If>
);

NextService.propTypes = {
  item: object,
  checkin: func.isRequired
};

const WrapperInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8;
  padding-bottom: 8;
`;

const Icon = styled(IconNative)`
  font-size: 27;
  color: ${props => props.theme.primary};
  padding-right: 15;
`;

const ButtonNextService = styled(Button)`
  margin-top: 10;
`;

const Content = styled.View`
  padding-top: 10;
  padding-left: 15;
  padding-right: 15;
  padding-bottom: 10;
  text-align: center;
`;

const Card = styled(CardNative)``;
