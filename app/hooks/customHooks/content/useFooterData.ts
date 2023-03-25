import type { StaticImageData } from 'next/future/image';
import { useState } from 'react';

import FooterFonImg from './images/footer/footer-fon.png';

type FooterData = {
  banner: {
    alt: string;
    image: StaticImageData | string;
  };
};

const SData: FooterData = {
  banner: {
    alt: 'fon',
    image: FooterFonImg,
  },
};

export const useFooterData = () => {
  const [data, setData] = useState(SData);

  return data;
};
