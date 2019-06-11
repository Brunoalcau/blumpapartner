import React from "react";
import styled from "styled-components";
import { Footer } from "native-base";
import { Linking } from "react-native";
import { object } from "prop-types";
// Locals
import { Wrapper, Button, Text, Icon, Image } from "~/commons";
import { images } from "~/config";

export const Preview = ({ navigation }) => (
  <WrapperPreview>
    <Content>
      <WrapperImage>
        <ImageHome source={images.home} />
      </WrapperImage>
      <WrapperButton>
        <ButtonPreview
          primary
          onPress={() => {
            navigation.navigate({ routeName: "Login" });
          }}
        >
          <Text weight="500">Sou cadastrada</Text>
        </ButtonPreview>
        <ButtonPreview inverted>
          <Text inverted weight="500">
            Não sou cadastrada
          </Text>
        </ButtonPreview>
        <ButtonText transparent>
          <TextButton size={12} primary align="left">
            Como é trabalhar com o Blumpa ?
          </TextButton>
        </ButtonText>
      </WrapperButton>
    </Content>
  </WrapperPreview>
);

Preview.propTypes = {
  navigation: object
};

Preview.navigationOptions = {
  header: null
};

const ImageHome = styled(Image)`
  width: 100%;
  height: 300;
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  padding-horizontal: 15;
  padding-vertical: 15;
`;

const WrapperImage = styled.View`
  justify-content: center;
  text-align: center;
  align-items: center;
  flex: 2;
`;

const WrapperButton = styled.View`
  flex: 1;
`;

const WrapperPreview = styled(Wrapper)`
  background: ${props => props.theme.secondary};
`;

const ButtonPreview = styled(Button)`
  margin-top: 15px;
`;
const ButtonText = styled(ButtonPreview)`
  text-align: left;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  width: 100%;
  bottom: 0;
  flex: 1;
`;

const TextButton = styled(Text)`
  padding-left: 3;
`;
