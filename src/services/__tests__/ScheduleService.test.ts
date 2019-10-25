import {LoadHoraro} from '../ScheduleService';

it('parses the schedule response', async () => {
  global.fetch.mockResponseOnce(
    JSON.stringify({
      schedule: {
        name: '2019 (Stream One)',
        slug: '2019-one',
        timezone: 'Europe/Berlin',
        start: '2019-07-20T14:00:00+02:00',
        start_t: 1563624000,
        website: 'https://esamarathon.com/',
        twitter: 'esamarathon',
        twitch: 'esamarathon',
        description:
          'ESA Summer 2019 is a speedrunning centred community meet-up and marathon. The doors of the event area at the Quality Hotel View in Malmö are open from Friday the 19th of July until Sunday the 28th of July.\r\n\r\nFor quick reference, you may be most interested in the following links:   \r\n[Master Info Post](https://esamarathon.com/news/f9a15baf-3c7d-439b-ad85-148b640f45a1)  \r\n[Stream Two Schedule](https://horaro.org/esa/2019-two)\r\n\r\nSETUP Games: These are buffer blocks that give us an opportunity to tackle delays. The games will be played in their specified timeslot if the marathon is not too far behind the original schedule at that point. If we are, they will be pushed to the last day of the 2nd stream. Decisions will be made several hours before the run is scheduled. That means all SETUP Games will definitely get shown.',
        setup: 'PT10M',
        setup_t: 600,
        updated: '2019-07-27T22:03:04Z',
        url: '/esa/2019-one',
        event: {
          name: 'European Speedrunner Assembly (ESA)',
          slug: 'esa',
        },
        hidden_columns: ['Layout', 'Info', 'ID'],
        columns: ['Game', 'Player(s)', 'Platform', 'Category', 'Note', 'Layout', 'Info', 'ID'],
        items: [
          {
            length: 'PT40M',
            length_t: 2400,
            scheduled: '2019-07-20T14:00:00+02:00',
            scheduled_t: 1563624000,
            data: [
              'Marbles On Stream',
              '[360Chrism](https://www.twitch.tv/360chrism)',
              'PC',
              'Viewer Races',
              'Pre-Show',
              '16x9-1p',
              null,
              null,
            ],
            options: {
              setup: '5m',
            },
          },
          {
            length: 'PT10M',
            length_t: 600,
            scheduled: '2019-07-20T14:45:00+02:00',
            scheduled_t: 1563626700,
            data: [
              'Opening Speech',
              '[Edenal](https://www.twitch.tv/edenal), [Planks](https://www.twitch.tv/ontwoplanks)',
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            options: {
              setup: '20m',
            },
          },
        ],
      },
    }),
  );

  const response = await LoadHoraro('-');

  expect(response).toEqual([
    {
      Category: 'Viewer Races',
      Game: 'Marbles On Stream',
      ID: null,
      Info: null,
      Layout: '16x9-1p',
      Note: 'Pre-Show',
      Platform: 'PC',
      'Player(s)': '[360Chrism](https://www.twitch.tv/360chrism)',
      length: 'PT40M',
      length_t: 2400,
      options: {setup: '5m'},
      scheduled: '2019-07-20T14:00:00+02:00',
      scheduled_t: 1563624000,
    },
    {
      Category: null,
      Game: 'Opening Speech',
      ID: null,
      Info: null,
      Layout: null,
      Note: null,
      Platform: null,
      'Player(s)':
        '[Edenal](https://www.twitch.tv/edenal), [Planks](https://www.twitch.tv/ontwoplanks)',
      length: 'PT10M',
      length_t: 600,
      options: {setup: '20m'},
      scheduled: '2019-07-20T14:45:00+02:00',
      scheduled_t: 1563626700,
    },
  ]);
});
