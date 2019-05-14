import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get } from 'lodash';
import Image from 'react-native-remote-svg';
import { object, func, string } from 'prop-types';
import { Row, Grid, Col } from 'react-native-easy-grid';
import { Content, Container } from 'native-base';
// Locals
import { images } from '~/config';
import {
  Wrapper,
  TopBar,
  InputField,
  Button,
  Text,
  BackButton,
  FooterButton
} from '~/commons';

const ResetPasswordSchema = yup.object().shape({
  recovery_code: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Confirmação de senha é necessário')
});

const getFieldError = (touched, errors, field) => {
  return get(touched, field) && get(errors, field);
};

export const ResetPassword = ({ navigation, resetPassword, login }) => (
  <Formik
    initialValues={{
      recovery_code: '',
      password: '',
      confirmPassword: ''
    }}
    validationSchema={ResetPasswordSchema}
    onSubmit={values =>
      resetPassword({
        recovery_code: values.recovery_code,
        password: values.password,
        login
      })
    }
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
          <TopBar title="Nova senha" leftComponent={<BackButton />} />
          <Grid>
            <Content>
              <Row size={2}>
                <WrapperText>
                  <Title tertiary weight="700">
                    Você está quase terminando!
                  </Title>
                  <Description inverted>
                    Agora é só colocar seu código e escolher uma nova senha.
                    Clique se não tiver recebido o SMS.
                  </Description>
                  <Phone source={images.phoneSms} />
                </WrapperText>
              </Row>
              <RowStyled size={2}>
                <Col>
                  <WrapperForm>
                    <InputField
                      label="Código"
                      weight="500"
                      autoCapitalize="characters"
                      onChangeText={text =>
                        setFieldValue('recovery_code', text)
                      }
                      handleBlur={() => setFieldTouched('recovery_code')}
                      value={values.recovery_code}
                      validationMessage={getFieldError(
                        touched,
                        errors,
                        'recovery_code'
                      )}
                    />
                    <InputField
                      label="Nova senha"
                      weight="500"
                      secureTextEntry
                      onChangeText={text => setFieldValue('password', text)}
                      handleBlur={() => setFieldTouched('password')}
                      value={values.password}
                      validationMessage={getFieldError(
                        touched,
                        errors,
                        'password'
                      )}
                    />
                    <InputField
                      label="Confirme a senha"
                      weight="500"
                      secureTextEntry
                      onChangeText={text =>
                        setFieldValue('confirmPassword', text)
                      }
                      handleBlur={() => setFieldTouched('confirmPassword')}
                      value={values.confirmPassword}
                      validationMessage={getFieldError(
                        touched,
                        errors,
                        'confirmPassword'
                      )}
                    />
                  </WrapperForm>
                </Col>
              </RowStyled>
            </Content>
          </Grid>
          <FooterButton onPress={submitForm} textButton="Salvar" primary />
        </Container>
      );
    }}
  />
);

ResetPassword.propTypes = {
  navigation: object,
  resetPassword: func.isRequired,
  login: string
};

ResetPassword.navigationOptions = {
  header: null
};

const WrapperText = styled.View`
  justify-content: center;
  align-items: center;
  padding-horizontal: 15;
  width: 100%;
  padding-top: 15;
  background-color: ${props => props.theme.bg};
`;

const WrapperForm = styled.View`
  padding-vertical: 15;
  padding-horizontal: 15;
`;

const Title = styled(Text)`
  padding-vertical: 5;
`;

const Description = styled(Text)`
  line-height: 25;
`;

const Phone = styled(Image)`
  width: 140;
  height: 140;
`;

const RowStyled = styled(Row)`
  justify-content: flex-end;
  background-color: ${props => props.theme.secondary};
`;
