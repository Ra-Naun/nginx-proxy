// configs & utils:
import type { NextPage, GetServerSideProps } from 'next';

// hooks:
import { useRouter } from 'next/router';

//store:
import { wrapper } from '@app/store';

// components:
import Seo from '@app/components/common/Seo/Seo';
import Spinner from '@app/components/common/Spinner/Spinner';
import LoginContent from '@app/components/pages/login/Login';

const Login: NextPage = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner />;
  }

  return (
    <>
      <Seo />
      <LoginContent />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      return {
        props: {
          t: '~| teeeeestProp',
        },
      };
    }
);

export default Login;
