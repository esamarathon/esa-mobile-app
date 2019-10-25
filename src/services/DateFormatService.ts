import dayjs, {ConfigType} from 'dayjs';

export function longDateRange(from: ConfigType, to: ConfigType) {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);

  const isSameMonth = fromDate.month === toDate.month;

  const startDay = fromDate.format('D');
  const startMonth = fromDate.format('MMMM');
  const dayRange = `${fromDate.format('ddd')} - ${toDate.format('ddd')}`;
  const endDate = toDate.format('D MMMM YYYY');

  return `${startDay}${isSameMonth ? '' : ' ' + startMonth} - ${endDate} (${dayRange})`;
}

export function shortDateRange(from: ConfigType, to: ConfigType) {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);

  const isSameMonth = fromDate.month === toDate.month;

  const startDay = fromDate.format('D');
  const startMonth = fromDate.format('MMM').toUpperCase();
  const endDate = toDate.format('D MMM').toUpperCase();

  return `${startDay}${isSameMonth ? '' : ' ' + startMonth} - ${endDate}`;
}
