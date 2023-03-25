import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Provider } from 'react-redux';

import Layout from '@app/components/Layout/Layout';
import { wrapper } from '@app/store';

import 'react-toastify/dist/ReactToastify.css';
import '@app/styles/index.scss';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        {/* @ts-ignore */}
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
