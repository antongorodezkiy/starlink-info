import { usePythonState } from '../../hooks/pythonBridge'
import { dayjs } from '../../lib/dayjs'

import styles from './Ticker.module.css'

export default function Ticker() {
  const updatedAt = usePythonState('updatedAt')
  const position = usePythonState('position')

  return (
    <div className={styles.tickerContainer}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="p-4 flex items-center">
            <div className={`pr-4 p-2 rounded-lg text-center ${!!updatedAt ? 'bg-blue-500' : 'bg-red-500'}`}>
            <p className="text-4xl font-bold text-white">...</p>
            {!!updatedAt && (
              <p className="text-sm text-white" title={dayjs.unix(updatedAt).format('DD.MM.YYYY HH:mm:ss')}>
                {dayjs.unix(updatedAt).fromNow()}
              </p>
            )}
            </div>
            <div className="ml-4">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{position}</div>
            </div>
        </div>
      </div>
    </div>
  )
}
