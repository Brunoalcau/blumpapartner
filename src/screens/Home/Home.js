import React from 'react';
import {object, bool, func} from 'prop-types';
import styled from 'styled-components';

// Locals
import {
  Wrapper,
  TopBar,
  ScrollWrapper,
  EmptyImage,
  ServiceInfo
} from '~/commons';
// import {NextService} from './partial/NextService';

export const Home = ({item, loading, checkin, going, checkout}) => (
  <Wrapper>
    <TopBar title="Próximo Serviços" />
    <Content loading={loading}>
      <Choose>
        <When condition={item}>
          <ServiceInfo
            item={item}
            checkin={checkin}
            going={going}
            checkout={checkout}
          />
        </When>
        <Otherwise>
          <EmptyImage />
        </Otherwise>
      </Choose>
    </Content>
  </Wrapper>
);

Home.propType = {
  item: object,
  loading: bool,
  checkin: func,
  going: func,
  checkout: func
};

const Content = styled(Wrapper)`
  padding-left: 15;
  padding-right: 15;
  padding-top: 15;
`;
