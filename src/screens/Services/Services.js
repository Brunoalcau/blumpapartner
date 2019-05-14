import React from 'react';
import styled from 'styled-components/native';
import {array, bool, func, object} from 'prop-types';
import {Text} from 'native-base';
// locals
import {
  TopBar,
  Wrapper,
  Separator,
  FlatList,
  EmptyText,
  Modal,
  ConfirmModal,
  FiltersButton
} from '~/commons';
import {ServiceCard} from './partial/ServiceCard';
import {ConfirmModalService} from './partial/ConfirmModalService';

const Services = ({
  items,
  loading,
  accept,
  confirmModalServiceOpened,
  confirmModalServiceOpen,
  selectService,
  selectedService,
  find,
  permissions
}) => (
  <Wrapper>
    <TopBar
      rightComponent={<FiltersButton routeName="Filter" />}
      title="Pegar Serviços"
    />
    <Content loading={loading}>
      <Choose>
        <When condition={permissions.location}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={Separator}
            keyExtractor={item => item.id.toString()}
            onRefresh={find}
            ListEmptyComponent={<EmptyText>Nenhum serviços.</EmptyText>}
            data={items}
            renderItem={({item}) => (
              <ServiceCard
                item={item}
                onConfirm={() => {
                  selectedService({item});
                  confirmModalServiceOpen(true);
                }}
              />
            )}
          />
        </When>
        <When condition={!permissions.location} />
      </Choose>
      <ConfirmModalService
        item={selectService}
        onConfirm={() => accept({item: selectService})}
        visible={confirmModalServiceOpened}
        onCancel={() => confirmModalServiceOpen(false)}
      />
    </Content>
  </Wrapper>
);

Services.propTypes = {
  items: array,
  loading: bool,
  accept: func.isRequired,
  confirmModalServiceOpened: bool.isRequired,
  confirmModalServiceOpen: func.isRequired,
  selectService: object,
  selectedService: func.isRequired,
  find: func.isRequired,
  permissions: object
};
const Content = styled(Wrapper)`
  padding-left: 15;
  padding-right: 15;
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

export {Services};
// const Card = styled.View``;
