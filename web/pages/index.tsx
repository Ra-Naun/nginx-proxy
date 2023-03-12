// configs & utils:
import type { NextPage, GetServerSideProps } from 'next';

// components:
import Seo from '@app/components/common/Seo/Seo';
import IndexContent from '@app/components/pages/index/Index';

//store:
import { wrapper } from '@app/store';

const Index: NextPage = () => {
  return (
    <>
      <Seo />
      <IndexContent />
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

export default Index;
