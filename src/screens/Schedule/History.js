import React from 'react';
import styled from 'styled-components';
import { array, bool, string } from 'prop-types';

// Locals
import { Wrapper, Text, FlatList, EmptyText, Separator } from '~/commons';
import { CardItem } from './partial/CardItem';
export const History = ({ items, loading, notFountText, ...props }) => (
  <Wrapper loading={loading}>
    <Content>
      <FlatList
        {...props}
        ItemSeparatorComponent={Separator}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<EmptyText>{notFountText}</EmptyText>}
        data={items}
        renderItem={({ item }) => <CardItem item={item} />}
      />
    </Content>
  </Wrapper>
);

History.propTypes = {
  items: array,
  loading: bool,
  notFountText: string
};

const Content = styled(Wrapper)`
  padding-left: 15;
  padding-right: 15;
  margin-top: 2;
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
