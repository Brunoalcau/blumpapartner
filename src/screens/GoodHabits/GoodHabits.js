import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';

// Locals
import {
  Wrapper,
  TopBar,
  BackButton,
  Text,
  FlatList,
  Separator,
  EmptyText,
  Image as ImageNative
} from '~/commons';
import { images } from '~/config';
import { Item } from './partial';

export const GoodHabits = ({ loading, item }) => (
  <Wrapper>
    <TopBar title="Manual de boas prácas" leftComponent={<BackButton />} />
    <Wrapper loading={loading}>
      <WrapperImage>
        <Image source={images.manual} />
      </WrapperImage>
      <WrapperText>
        <Label secondary>{item.description}</Label>
      </WrapperText>
      <FlatList
        ItemSeparatorComponent={Separator}
        keyExtractor={item => item.title}
        ListEmptyComponent={<EmptyText>Nenhum serviços.</EmptyText>}
        data={item.topics || []}
        renderItem={({ item }) => {
          return <Item item={item} routeName="GoodHabitsDetails" />;
        }}
      />
    </Wrapper>
  </Wrapper>
);

GoodHabits.protoTypes = {
  loading: bool
};

GoodHabits.navigationOptions = {
  header: null
};

const WrapperText = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
  padding-bottom: 10;
  line-height: 30;
`;

const Image = styled(ImageNative)`
  width: 150;
  height: 150;
`;

const WrapperImage = styled.View`
  justify-content: center;
  align-items: center;
`;
const Label = styled(Text)`
  line-height: 25;
`;
