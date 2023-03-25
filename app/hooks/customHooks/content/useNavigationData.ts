import { useState } from 'react';

type Data = {
  navigation: {
    text: string;
    link: string;
  }[];
};

const SData: Data = {
  navigation: [
    { text: 'Home', link: '/' },
    { text: 'Links', link: '/links' },
    { text: 'Login', link: '/login' },
    { text: 'Nginx basic status', link: '/basic_status' },
  ],
};

export const useNavigationData = () => {
  const [data, setData] = useState(SData);

  return data;
};
