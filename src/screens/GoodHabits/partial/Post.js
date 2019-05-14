import React from 'react';
import {object} from 'prop-types';
import styled from 'styled-components';
// import { as WebViewNative} from 'react-native';

// Locals
import {
  Text,
  WebView as WebViewNative,
  TopBar,
  BackButton,
  Button
} from '~/commons';

export const Post = ({navigation}) => (
  <Wrapper>
    <TopBar
      leftComponent={<BackButton />}
      title={navigation.state.params.item.title}
    />
    <PostScrollView showsVerticalScrollIndicator={false}>
      <InfoNoBorder>
        <Text size={25} inverted>
          {navigation.state.params.item.title}
        </Text>
      </InfoNoBorder>
      <PostWrapper>
        <Info>
          <WebView source={{html: navigation.state.params.item.body}} />
        </Info>
      </PostWrapper>
    </PostScrollView>
  </Wrapper>
);

Post.propTypes = {
  item: object
};

const Wrapper = styled.View`
  flex: 1;
  background: ${props => props.theme.bg};
`;

const PostScrollView = styled.ScrollView`
  flex: 1;
`;

const PostWrapper = styled.View`
  flex: 1;
  background: ${props => props.theme.bg};
`;
const WrapperTitle = styled.View`
  padding-left: 10;
  padding-right: 10;
`;

const WebView = styled(WebViewNative)`
  width: 100%;
`;

const WrapperBody = styled.View`
  flex: 1;
`;

const Info = styled.View`
  flex: 1;
  border: 1px solid ${props => props.theme.bg};
  border-right-width: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  background: ${props => props.theme.secondary};
`;

const InfoNoBorder = styled(Info)`
  border-top-width: 0;
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
  padding-bottom: 10;
`;
