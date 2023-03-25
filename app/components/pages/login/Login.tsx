// hooks:
import { useRouter } from 'next/router';

// components:
import type { FC } from 'react';
import Spinner from '@app/components/common/Spinner/Spinner';

import styles from './Login.module.scss';

const Login: FC<{}> = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="container">Login</h2>
    </>
  );
};

export default Login;
