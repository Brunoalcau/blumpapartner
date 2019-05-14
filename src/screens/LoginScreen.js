import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Text } from 'native-base';
import { get } from 'lodash';

// Locals
import { InputField } from '~/commons';

const LoginSchema = yup.object().shape({
  phone: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório')
});

const ButtonRed = styled(Button)`
  background-color: red;
`;

const getFieldError = (touched, errors, field) => {
  return get(touched, field) && get(errors, field);
};

const LoginScreen = ({ navigation }) => (
  <Wrapper>
    <Formik
      initialValues={{
        phone: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      render={({ setFieldValue, setFieldTouched, values, touched, errors }) => {
        return (
          <Content>
            <InputField
              label="Celular"
              onChangeText={text => setFieldValue('phone', text)}
              handleBlur={() => setFieldTouched('phone')}
              value={values.phone}
              validationMessage={getFieldError(touched, errors, 'phone')}
            />
            <InputField
              label="Senha"
              secureTextEntry={true}
              onChangeText={text => setFieldValue('password', text)}
              handleBlur={() => setFieldTouched('password')}
              value={values.password}
              validationMessage={getFieldError(touched, errors, 'password')}
            />
          </Content>
        );
      }}
    />
  </Wrapper>
);

LoginScreen.navigationOptions = {
  header: null
};

LoginScreen.propTypes = {};

const Content = styled.View``;

const Wrapper = styled.View`
  padding-left: 15px;
  padding-right: 15px;
`;

export default LoginScreen;
