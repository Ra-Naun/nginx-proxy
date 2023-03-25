import { Controller } from '@app/server/API/types';
import { revalidateAuthToken } from '@app/server/API/config/common';

const revalidate: Controller = async (req, res) => {
  const { page = '', secret } = req.query;

  if (secret !== revalidateAuthToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Check for secret to confirm this is a valid request
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(page as string);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
};

export default revalidate;
