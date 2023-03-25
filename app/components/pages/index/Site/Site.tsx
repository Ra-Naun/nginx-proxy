// configs & utils:
import { Site } from '@app/store/siteStore/types';
import classNames from 'classnames';

// hooks:
import { useState } from 'react';

// components:
import type { FC } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Site.module.scss';
import { useSites } from '@app/hooks/customHooks/content/useStoreData';

const Site: FC<{ className?: string; site: Site }> = ({ className, site }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [isActiveLocal, setIsActiveLocal] = useState(site.isActive);
  const [domainLocal, setDomainLocal] = useState(site.dns.domain);
  const [ipLocal, setIpLocal] = useState(site.dns.ip);
  const [portLocal, setPortLocal] = useState(site.dns.port);
  const [isExternalLocal, setIsExternalLocal] = useState(site.dns.isExternal);

  const { updateSite, removeSiteWithServer, updateSiteWithServer } = useSites();

  const setIsActive = (isActive: boolean) => {
    isActive !== isActiveLocal ? setIsChanged(true) : setIsChanged(false);

    return updateSite({ ...site, isActive });
  };
  const setDomain = (domain: string) => {
    domain !== domainLocal ? setIsChanged(true) : setIsChanged(false);
    return updateSite({ ...site, dns: { ...site.dns, domain } });
  };

  const setIP = (ip: string) => {
    ip !== ipLocal ? setIsChanged(true) : setIsChanged(false);
    return updateSite({ ...site, dns: { ...site.dns, ip } });
  };

  const setPort = (port: number) => {
    port !== portLocal ? setIsChanged(true) : setIsChanged(false);
    return updateSite({ ...site, dns: { ...site.dns, port } });
  };

  const setIsExternal = (isExternal: boolean) => {
    isExternal !== isExternalLocal ? setIsChanged(true) : setIsChanged(false);

    return updateSite({ ...site, dns: { ...site.dns, isExternal } });
  };

  const onSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (site.dns.isExternal && !site.dns.ip) {
      toast('IP adress is required!');
      return;
    }

    updateSiteWithServer(site);

    setIsChanged(false);
    setIsActiveLocal(site.isActive);
    setDomainLocal(site.dns.domain);
    setIpLocal(site.dns.ip);
    setPortLocal(site.dns.port);
    setIsExternalLocal(site.dns.isExternal);
  };

  const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    removeSiteWithServer({ id: site.id });
  };

  const onChange = <T = number | string | boolean,>(
    event: React.FormEvent<HTMLInputElement>,
    setValue: (param: T) => any,
    validator: (val: T) => T = (val) => val
  ) => {
    const newValue = validator(event.currentTarget.value as T);

    setValue(newValue);
  };

  const сlasses = classNames({
    [styles.site]: true,
    [styles.siteIsActive]: site.isActive,
    [className || '']: !!className,
  });

  return (
    <div className={сlasses}>
      <h3 className={styles.siteTitle}>{site.dns.domain}</h3>
      <div className="form-group">
        <input
          type="checkbox"
          id={`isActive-${site.id}`}
          checked={site.isActive}
          onChange={() => setIsActive(!site.isActive)}
        />
        <label htmlFor={`isActive-${site.id}`}>Is active</label>
      </div>

      <div className="form-group">
        <label htmlFor={`domain-${site.id}`}>Domain:</label>
        <input
          type="text"
          id={`domain-${site.dns.domain}`}
          value={site.dns.domain}
          onChange={(e) => onChange(e, setDomain)}
        />
      </div>

      {site.dns.isExternal && (
        <div className="form-group">
          <label htmlFor={`ip-${site.id}`}>IP:</label>
          <input
            type="text"
            id={`ip-${site.dns.ip}`}
            value={site.dns.ip}
            onChange={(e) => onChange(e, setIP)}
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor={`port-${site.id}`}>Port:</label>
        <input
          type="text"
          id={`port-${site.dns.port}`}
          value={site.dns.port}
          onChange={(e) => onChange(e, setPort)}
        />
      </div>

      <div className="form-group">
        <input
          type="checkbox"
          id={`isExternal-${site.id}`}
          checked={site.dns.isExternal}
          onChange={() => setIsExternal(!site.dns.isExternal)}
        />
        <label htmlFor={`isExternal-${site.id}`}>Is on external server</label>
      </div>

      {isChanged && (
        <button type="button" onClick={onSave} className={styles.siteSaveBtn}>
          Save
        </button>
      )}

      <button type="button" onClick={onRemove} className={styles.siteSaveBtn}>
        Remove
      </button>
      <ToastContainer key={site.id} />
    </div>
  );
};

export default Site;
