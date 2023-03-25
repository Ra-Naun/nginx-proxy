import { NextPage } from 'next';

import Custom404Body from '@app/components/pages/Custom404/Custom404';

type Props = { statusCode: number | undefined };

const Error: NextPage<Props> = ({ statusCode }) => {
  if (statusCode === 404) return <Custom404Body />;

  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
