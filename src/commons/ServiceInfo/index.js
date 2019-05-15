import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import { Icon as IconNative } from 'native-base';
import { withNavigation } from 'react-navigation';
// Locals
import { Text } from '../Text';
import { Card as CardNative } from '../Card';
import { Button } from '../Button';
import { ButtonAnimation } from '../ButtonAnimation';
export const ServiceInfo = withNavigation(
  ({ item, checkin, cancel, going, checkout, navigation }) => (
    <If condition={item}>
      <Card>
        <Content>
          <WrapperInfo>
            <Icon name="calendar" />
            <Label secondary>{item.date}</Label>
          </WrapperInfo>
          <WrapperInfo>
            <Icon name="time" />
            <Label secondary>{`${item.hourState} horas, ${
              item.hours
            } de serviço(s)`}</Label>
          </WrapperInfo>
          <WrapperInfo>
            <Icon name="pin" />
            <Label secondary>{item.address}</Label>
          </WrapperInfo>
          <Choose>
            <When condition={item.ironing}>
              <WrapperInfo>
                <Icon name="search" />
                <Label secondary>Passar Roupa</Label>
              </WrapperInfo>
            </When>
            <When condition={item.dishwasher}>
              <WrapperInfo>
                <Icon name="search" />
                <Label secondary>Lavar Louça</Label>
              </WrapperInfo>
            </When>
            <When condition={item.sustainable}>
              <WrapperInfo>
                <Icon name="search" />
                <Label secondary>Produtos Sustentáveis</Label>
              </WrapperInfo>
            </When>
          </Choose>
          <If condition={item.note}>
            <WrapperInfo>
              <Icon name="information-circle" />
              <Label secondary>{item.note}</Label>
            </WrapperInfo>
          </If>

          <ButtonNextService
            tertiary
            onPress={() =>
              navigation.navigate('Chat', { channel: item.room_id })
            }
          >
            <Text> Fale com o cliente</Text>
          </ButtonNextService>

          <Choose>
            <When condition={item.can_set_on_the_way}>
              <ButtonNextService success onPress={() => going(item.id)}>
                <Text>Estou a caminho</Text>
              </ButtonNextService>
            </When>
            <When condition={item.can_cancel && cancel}>
              <ButtonNextService inverted success onPress={cancel}>
                <Text secondary>Cancelar</Text>
              </ButtonNextService>
            </When>
            <When condition={item.can_check_in}>
              <ButtonNextService
                success
                onPress={() =>
                  checkin({
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
                  checkout({
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
  )
);

ServiceInfo.propTypes = {
  item: object,
  cancel: func,
  checkin: func,
  visible: bool,
  checkout: func,
  going: func
};

const WrapperInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8;
  padding-bottom: 8;
  flex-wrap: wrap;
`;

const Icon = styled(IconNative)`
  font-size: 27;
  color: ${props => props.theme.primary};
  padding-right: 10;
  width: 10%;
`;

const ButtonNextService = styled(Button)`
  margin-top: 10;
`;

const Content = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  text-align: center;
  width: 100%;
`;

const Label = styled(Text)`
  width: 90%;
`;

const Card = styled(CardNative)``;
