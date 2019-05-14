import React from 'react';
import styled from 'styled-components';
import { object, bool } from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
// locals
import { images } from '~/config';
import {
  Wrapper as WrapperNative,
  TopBar,
  BackButton,
  Text,
  Image as ImageNative,
  ScrollWrapper as ScrollWrapperNative
} from '~/commons';

export const Profile = ({ item, loading }) => (
  <Wrapper>
    <TopBar title="Dados pessoais" leftComponent={<BackButton />} />
    <Wrapper loading={loading}>
      <If condition={item}>
        <Grid>
          <Row size={40}>
            <WrapperImage>
              <ProfileStyled>
                <Choose>
                  <When condition={item.avatar}>
                    <Image uri={item.avatar} />
                  </When>
                  <Otherwise>
                    <Image source={images.dayJob} />
                  </Otherwise>
                </Choose>
              </ProfileStyled>
              <WrapperText>
                <Text weight="700" size={20} inverted>
                  {item.full_name}
                </Text>
                <Text align="center" secondary>
                  {`RG: ${item.rg_number}`}
                </Text>
              </WrapperText>
            </WrapperImage>
          </Row>
          <Row size={60}>
            <Grid>
              <InformationFirst>
                <InfoTab>
                  <Text align="center" size={20} inverted>
                    {item.services_counter}
                  </Text>
                  <Text secondary size={13}>
                    Servicos Feitos
                  </Text>
                </InfoTab>
              </InformationFirst>
              <Information>
                <InfoTab>
                  <Text align="center" size={20} inverted>
                    {item.rating}
                  </Text>
                  <Text secondary size={13}>
                    Classificação
                  </Text>
                </InfoTab>
              </Information>
            </Grid>
          </Row>
        </Grid>
      </If>
    </Wrapper>
  </Wrapper>
);

Profile.propTypes = {
  item: object,
  loading: bool
};

Profile.navigationOptions = {
  header: null
};

const WrapperImage = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;
// Avatar
const ContentImage = styled.View`
  border-radius: 50;
`;
const Image = styled(ImageNative)`
  height: 120;
  width: 120;
  padding-left: 8;
  border-radius: 60;
  overflow: hidden;
  border-width: 1;
  border-color: ${props => props.theme['border']};
`;

const Wrapper = styled(WrapperNative)`
  background-color: ${props => props.theme.secondary};
`;

const WrapperText = styled.View`
  padding-top: 15;
  padding-bottom: 15;
`;

const Information = styled(Row)`
  height: 60;
  justify-content: center;
  align-items: center;
  border-top-width: 1.5;
  border-top-color: ${props => props.theme.bg};
`;

const InformationFirst = styled(Information)`
  border-right-width: 1.5;
  border-right-color: ${props => props.theme.bg};
`;

const InfoTab = styled.View`
  flex-direction: column;
`;

const ProfileStyled = styled.View`
  height: 120;
  width: 120;
  border-radius: 60;
`;
