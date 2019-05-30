import React from 'react';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get } from 'lodash';
import {
  ScrollView as ScrollViewNative,
  KeyboardAvoidingView
} from 'react-native';
import { func, bool, object } from 'prop-types';
// import { Content, Container } from 'native-base';
import { Content, Container, Form } from 'native-base';
// Locals
import {
  InputField,
  StatusBarBackground,
  Wrapper,
  KeyboardAvoidingWrapper,
  Icon,
  Button,
  Text,
  Image
} from '~/commons';
import { images } from '~/config';

// console.log(Logo);
const LoginSchema = yup.object().shape({
  login: yup.string().required('Required'),
  password: yup.string().required('Required')
});

const getFieldError = (touched, errors, field) => {
  return get(touched, field) && get(errors, field);
};

export const Login = ({ signin, isSignedIn, navigation }) => {
  return (
    <Container>
      <StatusBarBackground />
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
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <Content
                contentContainerStyle={{ flex: 1 }}
                scrollEnabled={false}
              >
                <BodyStyled>
                  <WrapperImage>
                    <ImageLogo source={images.logo} />
                  </WrapperImage>
                  <FormStyled>
                    <Form>
                      <InputField
                        returnKeyType={'next'}
                        label="Telefone"
                        type="cel-phone"
                        options={{
                          maskType: 'BRL',
                          withDDD: true,
                          dddMask: '(99) '
                        }}
                        secureTextEntry={false}
                        onChangeText={text => setFieldValue('login', text)}
                        handleBlur={() => setFieldTouched('login')}
                        value={values.login}
                        validationMessage={getFieldError(
                          touched,
                          errors,
                          'login'
                        )}
                      />
                      <InputField
                        label="Senha"
                        type="text"
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
                    </Form>
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
                  </FormStyled>
                </BodyStyled>
                <ButtonFooter>
                  <Text>Quero me cadastrar</Text>
                </ButtonFooter>
              </Content>
            </KeyboardAvoidingView>
          );
        }}
      />
    </Container>
  );
};

Login.navigationOptions = {
  header: null
};

Login.propTypes = {
  signin: func,
  isSignedIn: bool,
  navigation: object
};

// const Content = styled.View``;

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
  width: 100%;
  height: 150;
  flex-grow: 1;
`;

const BodyStyled = styled.View`
  flex-direction: column;
  padding-horizontal: 15;
  flex: 1;
`;
const FormStyled = styled.View`
  flex: 2;
`;

const ButtonFooter = styled(Button)`
  position: absolute;
  background-color: ${props => props.theme.tertiary};
  bottom: 0;
  width: 100%;
  border-radius: 0;
`;

const ScrollView = styled(ScrollViewNative)``;
