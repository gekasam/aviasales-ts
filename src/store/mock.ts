const obj = {
  price: 1444,
  carrier: 'U6',
  segments: [
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2024-04-09T04:09:43.847Z',
      duration: 1290,
      stops: [],
    },
    {
      origin: 'HKT',
      destination: 'MOW',
      date: '2024-07-20T10:25:13.906Z',
      duration: 861,
      stops: [],
    },
  ],
};

const obj1 = {
  price: 1444,
  carrier: 'U7',
  segments: [
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2024-04-09T04:09:43.847Z',
      duration: 1290,
      stops: [],
    },
    {
      origin: 'HKT',
      destination: 'MOW',
      date: '2024-07-20T10:25:13.906Z',
      duration: 861,
      stops: [],
    },
  ],
};

const arr = [obj, obj1, obj, obj1, obj, obj1];

export default arr;
