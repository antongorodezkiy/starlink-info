import styles from './Sidebar.module.css'
import logo from '../../assets/logo.png'

import Ticker from './../Ticker/Ticker'
import packageInfo from './../../../package.json'

export default function Header() {
  return (
    <div className="bg-sidebar">
      <div className="flex flex-row items-center justify-between gap-2 p-2">
        <div className="text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
          <img className={styles.logo} src={logo} alt='Garuda' />
        </div>
        <div className="ml-1 grid flex-1 text-left text-sm">
          <span className="mb-0.5 truncate text-lg leading-none font-semibold md:text-base">Starlink Info</span>
          <small className="text-sm text-gray-600 md:text-xs">{packageInfo.version}</small>
        </div>
      </div>

      <Ticker/>
    </div>
  );
};
