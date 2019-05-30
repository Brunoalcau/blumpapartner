import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';
import moment from 'moment';
import {
  ListItem,
  Left,
  Body as BodyNative,
  Icon,
  Right,
  Title
} from 'native-base';

// Locals
import { Text } from '~/commons';
import { money } from '~/helpers';

export const ItemAccordion = ({ item, title }) => {
  return (
    <WrapperCard>
      <If condition={item.header}>
        <HeaderItem itemDivider>
          <WrapperItem>
            <Text size={13} weight="bold">
              {item.send_date} - R$: {item.total}
            </Text>
          </WrapperItem>
        </HeaderItem>
      </If>
      <If condition={!item.header}>
        <BodyItem>
          <WrapperSubItem>
            <Text size={13} secondary>
              {moment(item.send_date).format('DD/MM/YYYY')} -
            </Text>
            <Text size={13} secondary weight="bold">
              R$ {(item.amount_cents, 2)}
            </Text>
          </WrapperSubItem>
        </BodyItem>
      </If>
    </WrapperCard>
  );
};

ItemAccordion.propTypes = {
  item: object
};

const WrapperCard = styled.View``;

const HeaderItem = styled(ListItem)`
  background-color: ${props => props.theme['border']};
`;

const BodyItem = styled(ListItem)`
  margin-left: 0;
`;
const WrapperItem = styled(BodyNative)``;

const WrapperSubItem = styled(BodyNative)`
  flex: 1;
  flex-direction: row;
  padding-left: 15;
`;
