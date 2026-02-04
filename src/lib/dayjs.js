import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/uk';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat);
dayjs.extend(dayjsRelativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('uk')

dayjs.tz.setDefault('Europe/Kiev');

export { dayjs }
