// configs & utils:
import type { NextPage, GetServerSideProps } from 'next';

// components:
import Seo from '@app/components/common/Seo/Seo';
import LinksContent from '@app/components/pages/links/Links';

//store:
import { wrapper } from '@app/store';

const Index: NextPage = () => {
  return (
    <>
      <Seo />
      <LinksContent />
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
