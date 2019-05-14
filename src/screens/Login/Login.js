import React from 'react';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get } from 'lodash';
import Image from 'react-native-remote-svg';

// Locals
import {
  InputField,
  StatusBarBackground,
  Wrapper,
  KeyboardAvoidingWrapper,
  Icon,
  Button,
  Text
} from '~/commons';
import { images } from '~/config';

const LoginSchema = yup.object().shape({
  login: yup.string().required('Required'),
  password: yup.string().required('Required')
});

const getFieldError = (touched, errors, field) => {
  return get(touched, field) && get(errors, field);
};

export const Login = ({ signin, isSignedIn, navigation }) => {
  return (
    <KeyboardAvoidingWrapper>
      <StatusBarBackground />
      <WrapperLogin>
        <WrapperImage>
          <ImageLogo source={images.logo} />
        </WrapperImage>
        <WrapperForm>
          <Formik
            initialValues={{
              login: '',
              password: ''
            }}
            onSubmit={signin}
            validationSchema={LoginSchema}
            render={({
              setFieldValue,
              setFieldTouched,
              values,
              touched,
              errors,
              submitForm
            }) => {
              return (
                <Content>
                  <InputField
                    label="Telefone"
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) '
                    }}
                    onChangeText={text => setFieldValue('login', text)}
                    handleBlur={() => setFieldTouched('login')}
                    value={values.login}
                    validationMessage={getFieldError(touched, errors, 'login')}
                  />
                  <InputField
                    label="Senha"
                    secureTextEntry={true}
                    onChangeText={text => setFieldValue('password', text)}
                    handleBlur={() => setFieldTouched('password')}
                    value={values.password}
                    validationMessage={getFieldError(
                      touched,
                      errors,
                      'password'
                    )}
                  />
                  <ButtonText
                    transparent
                    onPress={() =>
                      navigation.navigate({ routeName: 'ForgetPassword' })
                    }
                  >
                    <Text size={12} primary align="left">
                      Não lembro minha senha
                    </Text>
                  </ButtonText>
                  <Button primary onPress={submitForm}>
                    <Text>Entrar</Text>
                  </Button>
                </Content>
              );
            }}
          />
        </WrapperForm>
      </WrapperLogin>
      <ButtonFooter>
        <Text>Quero me cadastrar</Text>
      </ButtonFooter>
    </KeyboardAvoidingWrapper>
  );
};

Login.navigationOptions = {
  header: null
};

Login.propTypes = {};

const Content = styled.View``;

const ButtonText = styled(Button)`
  text-align: left;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 15;
`;

const WrapperImage = styled.View`
  justify-content: center;
  text-align: center;
  align-items: center;
  flex: 1;
`;

const ImageLogo = styled(Image)`
  width: 300;
  height: 300;
  flex: 1;
`;

const WrapperForm = styled.View`
  flex: 2;
  top: 40;
`;

const WrapperLogin = styled(Wrapper)`
  padding-horizontal: 15;
  padding-vertical: 15;
`;

const ButtonFooter = styled(Button)`
  position: absolute;
  background-color: ${props => props.theme.tertiary};
  bottom: 0;
  width: 100%;
  border-radius: 0;
`;
