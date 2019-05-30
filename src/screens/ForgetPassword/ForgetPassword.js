import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get } from 'lodash';
import { object } from 'prop-types';
import { Row, Grid, Col } from 'react-native-easy-grid';
import { Content, Container } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
// Locals
import { images } from '~/config';
import {
  Wrapper,
  TopBar,
  InputField,
  Button,
  Text,
  BackButton,
  FooterButton,
  Image
} from '~/commons';

const ForgetPasswordSchema = yup.object().shape({
  phone: yup.string().required('Campo obrigatório')
});

// TODO: colocar no helpers
const getFieldError = (touched, errors, field) => {
  return get(touched, field) && get(errors, field);
};

export const ForgetPassword = ({ navigation, resetCode }) => (
  <Formik
    initialValues={{
      phone: ''
    }}
    validationSchema={ForgetPasswordSchema}
    onSubmit={values => {
      resetCode({ login: values.phone });
    }}
    render={({
      setFieldValue,
      setFieldTouched,
      values,
      touched,
      errors,
      submitForm
    }) => {
      return (
        <Container>
          <TopBar title="Mudar senha" leftComponent={<BackButton />} />
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <Content
              contentContainerStyle={{ flex: 1, position: 'relative' }}
              scrollEnabled={false}
            >
              <WrapperText>
                <Phone source={images.menssage} />
                <Text weight="600" align="center" tertiary size={14}>
                  Esqueceu a senha?
                </Text>
                <Text lineHeight={20} align="center" inverted size={14}>
                  Colocar seu número de telefone e clique em envia UMA vez. Você
                  receberá um código para renovar sua senha, aguarde pois o SMS
                  pode demora um pouquinho para chegar!
                </Text>
              </WrapperText>
              <WrapperForm>
                <InputField
                  label="Telefone"
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  onChangeText={text => setFieldValue('phone', text)}
                  handleBlur={() => setFieldTouched('phone')}
                  value={values.phone}
                  validationMessage={getFieldError(touched, errors, 'phone')}
                />
              </WrapperForm>
            </Content>
            <FooterButton
              onPress={submitForm}
              textButton="Enviar SMS"
              primary
            />
          </KeyboardAvoidingView>
        </Container>
      );
    }}
  />
);

const WrapperImage = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;
const Phone = styled(Image)`
  width: 100%;
  height: 150;
`;
const WrapperForm = styled.View`
  padding-horizontal: 15;
  padding-bottom: 20;
  padding-top: 5;
  width: 100%;
  justify-content: center;
  flex: 0.5;
`;

// const Content = styled.View``;

const WrapperText = styled.View`
  padding-top: 15;
  padding-horizontal: 15;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.bg};
  flex: 2;
`;

const RowTop = styled(Row)`
  justify-content: flex-start;
  background-color: ${props => props.theme.bg};
`;

const RowFooter = styled(Row)`
  justify-content: center;
`;

// const KeyboardAvoidingWrapper = styled(KeyboardAvoidingWrapperNative)`
//   background-color: ${props => props.theme.secondary};
// `;

ForgetPassword.propTypes = {
  navigation: object
};
ForgetPassword.navigationOptions = {
  header: null
};
