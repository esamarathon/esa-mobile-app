import {longDateRange, shortDateRange} from '../DateFormatService';

it('formats long dates in the same month', () => {
  const fromDate = '2018-08-08';
  const toDate = '2018-08-10';

  expect(longDateRange(fromDate, toDate)).toEqual('8 - 10 August 2018 (Wed - Fri)');
});

it('formats long dates in different months', () => {
  const fromDate = '2019-12-30';
  const toDate = '2020-01-02';

  expect(longDateRange(fromDate, toDate)).toEqual('30 December - 2 January 2020 (Mon - Thu)');
});

it('formats short dates in the same month', () => {
  const fromDate = '2018-08-08';
  const toDate = '2018-08-10';

  expect(shortDateRange(fromDate, toDate)).toEqual('8 - 10 AUG');
});

it('formats short dates in different months', () => {
  const fromDate = '2019-12-30';
  const toDate = '2020-01-02';

  expect(shortDateRange(fromDate, toDate)).toEqual('30 DEC - 2 JAN');
});
