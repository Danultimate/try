import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';

import { Sentry } from 'react-native-sentry';

Sentry.config('https://c504b76ae8d5438bb0118f55c24ad066@sentry.io/1317344').install();

Sentry.setTagsContext({
  "environment": process.env.NODE_ENV,
  "react": true
});

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
