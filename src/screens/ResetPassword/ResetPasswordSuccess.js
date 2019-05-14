import React from 'react';
import {Row, Grid, Col} from 'react-native-easy-grid';
import styled from 'styled-components';
import {Content, Container} from 'native-base';
// import Image from 'react-native-remote-svg';

// Locals
import {
  Wrapper,
  Text,
  FooterButton,
  TopBar,
  BackButton,
  Image
} from '~/commons';

import {images} from '~/config';

export const ResetPasswordSuccess = ({navigation}) => (
  <Wrapper>
    <Grid>
      <Content>
        <Row size={1}>
          <JobImage source={images.dayJob} />
        </Row>
        <Row size={1}>
          <WrapperText>
            <Text weight="bold" tertiary>
              Pronto !
            </Text>
            <Text weight="500" secondary>
              Agora é só entrar em sua conta ;)
            </Text>
          </WrapperText>
        </Row>
      </Content>
    </Grid>
    <FooterButton
      textButton="Entra na minha conta"
      primary
      onPress={() => navigation.navigate({routeName: 'Login'})}
    />
  </Wrapper>
);

ResetPasswordSuccess.navigationOptions = {
  header: null
};

const JobImage = styled(Image)`
  flex: 1;
  width: 300;
  height: 300;
  top: 50;
`;

const WrapperText = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  top: 30%;
`;
