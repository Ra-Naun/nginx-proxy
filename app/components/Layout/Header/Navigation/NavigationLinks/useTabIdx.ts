import { useNavigationData } from '@app/hooks/customHooks/content/useNavigationData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTabIdx = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const router = useRouter();

  const { navigation } = useNavigationData();

  useEffect(() => {
    const idx = navigation.findIndex((nav) => nav.link === router.asPath);

    idx !== -1 && setActiveTabIdx(idx);
  }, [router.asPath, navigation]);

  return activeTabIdx;
};

export default useTabIdx;
