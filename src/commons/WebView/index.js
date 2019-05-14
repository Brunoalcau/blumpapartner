import React from 'react';
import styled from 'styled-components/native';
import {
  WebView as NativeWebView,
  Dimensions,
  ActivityIndicator,
  Linking
} from 'react-native';
import {
  compose,
  withState,
  withProps,
  defaultProps,
  withHandlers,
  pure
} from 'recompose';

// Local
import {theme} from '~/config';

const withRefs = withProps(() => {
  const refs = {};
  return {
    getRefs: () => {
      return refs;
    },
    registerRef: (name, element) => {
      refs[name] = element;
    }
  };
});

const enhancedWebView = compose(
  defaultProps({
    autoHeight: true,
    startInLoadingState: true,
    scrollEnabled: false,
    defaultHeight: Dimensions.get('window').height,
    automaticallyAdjustContentInsets: true
  }),
  withState(
    'webViewHeight',
    'setWebViewHeight',
    ({defaultHeight}) => defaultHeight
  ),
  withProps(({source, width, webViewHeight, autoHeight, defaultHeight}) => ({
    width: width || Dimensions.get('window').width - 100,
    height: autoHeight ? webViewHeight : defaultHeight,
    source: {...source, html: source.html ? wrapHTML(source.html) : undefined}
  })),
  withRefs,
  withHandlers({
    onMessage: ({setWebViewHeight}) => e => {
      setWebViewHeight(parseInt(e.nativeEvent.data));
    },
    onStateChange: ({getRefs}) => e => {
      const {webview} = getRefs();

      if (
        e.url !== 'about:blank' &&
        e.url.indexOf('data:text') === -1 &&
        e.url.indexOf('react-js') === -1
      ) {
        webview.stopLoading();
        Linking.openURL(e.url);
      }
    },
    renderLoading: () => () => (
      <ActivityIndicator color={theme.textSecondary} size="small" />
    )
  }),
  pure
)(props => {
  return (
    <NativeWebView
      ref={webview => props.registerRef('webview', webview)}
      showsVerticalScrollIndicator={false}
      injectedJavaScript={'(' + String(injectedScript) + ')();'}
      onNavigationStateChange={props.onStateChange}
      javaScriptEnabled={true}
      renderLoading={props.renderLoading}
      {...props}
      style={[{width: props.height}, props.style, {height: props.height}]}
    />
  );
});

const injectedScript = () => {
  (function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    } else {
      var height = 0;
      if (document.documentElement.clientHeight > document.body.clientHeight) {
        document.title = document.documentElement.clientHeight;
      } else {
        document.title = document.body.clientHeight;
      }

      postMessage(document.title);
      setTimeout(waitForBridge, 200);
    }
  })();
};

const wrapHTML = html => `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta charset="UTF-8">
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          <script
            src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous"></script>
          <style>
            html, body {
              font-family: 'Roboto', sans-serif;
              font-size: 5px!important;
            }
            p {
              width: 100%;
              padding: 10px 10px!important;
              font-size: 14px!important;
              box-sizing: border-box;
            }
            td {
              padding-top: 10px!important;
              padding-left: 10px!important;
              padding-bottom: 10px!important;
              padding-right: 10px!important;
              font-size: 5px!important;
            }
            li{
              displat: block;
              font-size: 14px!important;
              padding-top: 10px!important;
              padding-left: 10px!important;
            }
            tbody tr:nth-child(odd) {
               background-color: ${theme.bg};
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
     </html>
   `;

export const WebView = styled(enhancedWebView)``;
