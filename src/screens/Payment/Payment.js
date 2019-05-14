import React from 'react';
import { array, object } from 'prop-types';
// Locals
import {
  Wrapper,
  TopBar,
  BackButton,
  EmptyText,
  FlatList,
  Separator,
  Text,
  FiltersButton
} from '~/commons';

import { ItemAccordion } from './partial';

export const Payment = ({ allIds, byId, stickyHeaderIndices }) => (
  <Wrapper secondary>
    <TopBar
      title="Pagamentos"
      leftComponent={<BackButton />}
      rightComponent={<FiltersButton routeName="FilterPayment" />}
    />
    <FlatList
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      ListEmptyComponent={<EmptyText>Nenhum serviços.</EmptyText>}
      data={allIds}
      stickyHeaderIndices={stickyHeaderIndices}
      renderItem={item => {
        return <ItemAccordion item={byId[item.item]} />;
      }}
    />
  </Wrapper>
);

Payment.propTypes = {
  allIds: array,
  object: object
};

Payment.navigationOptions = {
  header: null
};
