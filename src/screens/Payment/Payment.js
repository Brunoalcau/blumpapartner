import React from 'react';
import { array, object, bool, func } from 'prop-types';
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

export const Payment = ({
  allIds,
  byId,
  stickyHeaderIndices,
  loading,
  get,
  payment
}) => (
  <Wrapper>
    <TopBar
      title="Pagamentos"
      leftComponent={<BackButton />}
      rightComponent={<FiltersButton routeName="FilterPayment" />}
    />
    {console.log(loading)}
    <FlatList
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      loading={loading}
      onRefresh={() => get(payment)}
      ListEmptyComponent={<EmptyText>Nenhum pagamento.</EmptyText>}
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
  object: object,
  loading: bool,
  get: func,
  payment: object
};

Payment.navigationOptions = {
  header: null
};
