import React from 'react';
import { Item, Input as InputNative } from 'native-base';
import styled from 'styled-components';
import { string, func, bool } from 'prop-types';
import DatePicker from 'react-native-datepicker';

// Local
import { Text } from '../Text';
import { TextInputMask } from '../TextInputMask';
import { theme } from '~/config';
export const InputField = ({
  label,
  onChangeText,
  value,
  handleBlur,
  validationMessage,
  weight,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'words',
  height,
  type = 'text',
  ...props
}) => {
  return (
    <Wrapper>
      <If condition={label}>
        <Label inverted weight={weight}>
          {label}
        </Label>
      </If>
      <Choose>
        <When condition={type === 'password'}>
          <WrapperItem rounded error={!!validationMessage} height={height}>
            <Input
              secureTextEntry={true}
              onChangeText={onChangeText}
              value={value}
              onBlur={handleBlur}
              autoCapitalize={autoCapitalize}
              placeholder={placeholder}
            />
          </WrapperItem>
        </When>
        <When condition={type === 'text'}>
          <WrapperItem rounded error={!!validationMessage} height={height}>
            <Input
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              value={value}
              onBlur={handleBlur}
              placeholder={placeholder}
              {...props}
            />
          </WrapperItem>
        </When>
        <When condition={type === 'cel-phone'}>
          <TextInputMask
            maskType="BRL"
            type={type}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            value={value}
            onBlur={handleBlur}
            autoCapitalize={autoCapitalize}
            placeholder={placeholder}
            validation={!!validationMessage}
            {...props}
          />
        </When>
        <When condition={type === 'date-picker'}>
          <DatePicker
            style={{ width: '100%' }}
            onDateChange={onChangeText}
            customStyles={{
              dateInput: {
                height: 48,
                borderWidth: 0,
                borderRadius: 10,
                padding: 15,
                fontSize: theme.fontSizeTitle,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }
            }}
            {...props}
          />
        </When>
      </Choose>

      <If condition={validationMessage}>
        <ValidationMessage>{validationMessage}</ValidationMessage>
      </If>
    </Wrapper>
  );
};

InputField.propTypes = {
  label: string,
  onChangeText: func,
  value: string,
  handleBlur: func,
  validationMessage: string,
  secureTextEntry: bool,
  autoCapitalize: string,
  type: string
};

const Label = styled(Text)`
  padding-vertical: 2;
`;
const Wrapper = styled.View`
  padding-vertical: 5;
`;

const ValidationMessage = styled(Text)`
  color: ${props => props.theme.danger};
  font-size: 12px;
`;

const WrapperItem = styled(Item)`
  border-radius: 10;
  height: ${props => props.height || 45};
`;

const Input = styled(InputNative)`
  font-size: ${props => props.theme.fontSizeTitle};
  top: 1;
  padding-left: 5;
`;
