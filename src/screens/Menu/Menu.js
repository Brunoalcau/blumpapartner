import React from "react";
import Image from "react-native-remote-svg";
import styled from "styled-components";
import { string, number } from "prop-types";
// Locals
import {
  Wrapper,
  ScrollWrapper,
  TopBar,
  StatusBarBackground,
  Text
} from "~/commons";
import { MenuItem } from "./partial/MenuItem";
import { images } from "~/config";
export const Menu = ({ channel }) => (
  <Wrapper>
    <TopBar title="Menu" />
    <ScrollWrapper>
      <MenuGroup>
        <Label weight="bold" inverted size={12}>
          Perfil
        </Label>
        <MenuItem icon="contact" routeName="Profile">
          Dados pessoais
        </MenuItem>
        <MenuItem icon="card" routeName="Payment">
          Pagamentos
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <Label weight="bold" inverted size={12}>
          Dúvidas
        </Label>
        <MenuItem icon="chatboxes" chat={channel} routeName="Chat">
          Fale com o Blumpa
        </MenuItem>
        <MenuItem icon="list-box" routeName="GoodHabits">
          Manual de boas práticas
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuItem leave={true} routeName="Login" icon="ios-exit">
          Sair
        </MenuItem>
      </MenuGroup>
    </ScrollWrapper>
  </Wrapper>
);

Menu.propTypes = {
  user: string,
  channel: number
};
Menu.navigationOptions = {
  header: null,
  title: "Home Screen"
};
const MenuGroup = styled.View`
  margin-top: 10;
`;

const Label = styled(Text)`
  margin-left: 15;
  margin-bottom: 10;
`;
