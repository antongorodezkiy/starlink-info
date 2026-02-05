import { usePythonState } from '../../hooks/pythonBridge'
import Ticker from './../Ticker/Ticker'
import packageInfo from './../../../package.json'
import { dayjs } from '../../lib/dayjs'

import styles from './Sidebar.module.css'
import logo from '../../assets/logo.png'
import nrkInactiveImage from '../../assets/nrk-inactive.png'

export default function Header() {
  const updatedAt = usePythonState('updatedAt')

  return (
    <div className="bg-sidebar">
      <div className="flex flex-row items-center justify-between gap-2 p-2">
        <div className="text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
          <img className={styles.logo} src={updatedAt ? logo : nrkInactiveImage} alt='Garuda' />
        </div>
        <div className="ml-1 grid flex-1 text-left text-sm">
          <span className="mb-0.5 truncate text-lg leading-none font-semibold md:text-base">Starlink Info</span>
          <small className="text-sm text-gray-600 md:text-xs flex flex-row gap-2">
            {packageInfo.version}
          </small>
          <small className="text-sm text-gray-600 md:text-xs flex flex-row gap-2">
            {!!updatedAt && (
              <div className="flex flex-row items-center gap-1">
                <span className="badge badge-theme-lime pr-2 gap-1 items-center" title={dayjs.unix(updatedAt).format('DD.MM.YYYY HH:mm:ss')}>
                  <span className="h-2 w-2 rounded-full bg-lime-500"></span>
                  <span className="flex flex-col">
                    <span>оновлено</span>
                    {dayjs.unix(updatedAt).fromNow()}
                  </span>
                </span>
              </div>
            )}

            {!updatedAt && (
              <div className="flex flex-row items-center gap-1">
                <span className="badge badge-theme-pink pr-2 gap-1 items-center">
                  <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                  не оновлюється
                </span>
              </div>
            )}
          </small>
        </div>
      </div>

      <Ticker/>
    </div>
  );
};
