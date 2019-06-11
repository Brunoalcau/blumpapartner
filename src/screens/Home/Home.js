import React from "react";
import { object, bool, func } from "prop-types";
import styled from "styled-components";

// Locals
import {
  Wrapper,
  TopBar,
  ScrollWrapper,
  EmptyImage,
  ServiceInfo
} from "~/commons";
import { Refresh } from "./partial/Refresh";
// import { Icon } from "~/commons";

export const Home = ({
  item,
  loading,
  checkin,
  going,
  checkout,
  get,
  error
}) => (
  <Wrapper>
    <TopBar
      title="Próximo Serviços"
      rightComponent={<Refresh action={get} />}
    />
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
        <When condition={error}>
          <EmptyImage text={"Ocorreu um error ao listar. Tente mais tarde."} />
        </When>
        <Otherwise>
          <EmptyImage text={"Você ainda não tem nenhum serviço agendado."} />
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
