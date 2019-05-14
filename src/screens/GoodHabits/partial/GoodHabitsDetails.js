import React from 'react';
import Immutable from 'seamless-immutable';
import styled from 'styled-components';
import withRematch from 'with-rematch';
import Fuse from 'fuse.js';
// Locals

import {
  Wrapper,
  FlatList,
  Text,
  EmptyText,
  TopBar,
  BackButton
} from '~/commons';
import {Item} from './Item';

import {Search} from './Search';

const initState = Immutable({
  value: '',
  items: []
});

const model = {
  state: initState,
  reducers: {
    onChange(state, {value, items}) {
      return state.merge({
        value,
        items
      });
    }
  },
  effects: actions => ({
    onChangeText(payload, state, props) {
      const fuse = new Fuse(props.navigation.state.params.item.articles, {
        threshold: 0.6,
        location: 0,
        minMatchCharLength: 1,
        keys: ['title']
      });

      actions.onChange({
        value: payload,
        items: fuse.search(payload)
      });
    },
    clear() {
      actions.onChange({
        value: '',
        items: []
      });
    }
  })
};

export const GoodHabitsDetails = withRematch(model)(props => (
  <Wrapper>
    <TopBar
      title={props.navigation.state.params.item.title}
      leftComponent={<BackButton />}
    />
    <Search
      value={props.state.value}
      onChangeText={props.actions.onChangeText}
      clear={props.actions.clear}
    />
    <FlatList
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.title}
      ListEmptyComponent={<EmptyText>Nenhum Manual.</EmptyText>}
      data={
        props.state.value
          ? props.state.items
          : props.navigation.state.params.item.articles
      }
      renderItem={({item}) => {
        return <Item item={item} routeName="Post" />;
      }}
    />
  </Wrapper>
));

const WrapperImage = styled.View``;

const Separator = styled.View`
  height: 0.5;
`;
