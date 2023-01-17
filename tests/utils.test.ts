import { faker } from '@faker-js/faker';
import { ServiceCaller } from '../src/service-caller';

import { prepareSiteOutages, run } from '../src/utils';

describe('prepareSiteOutages test cases', () => {
  it('should return an empty array when there is no match between outage ids and site info device ids', () => {
    const siteInfo = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      devices: [
        {
          id: faker.datatype.uuid(),
          name: faker.random.word(),
        }
      ]
    }

    const outages = [
      {
        id: faker.datatype.uuid(),
        begin: faker.date.past().toISOString(),
        end: faker.date.recent().toISOString()
      }
    ]

    expect(prepareSiteOutages(siteInfo, outages)).toEqual([])
  });

  it('should return a proper site outage array when there is match between outage ids and site info device ids', () => {
    const device0 = {
      id: 'matched-id-0',
      name: faker.random.word(),
    }
    const device1 = {
      id: 'matched-id-1',
      name: faker.random.word(),
    }
    const siteInfo = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      devices: [device0,device1]
    }

    const outages = [
      {
        id: 'matched-id-0',
        begin: faker.date.past().toISOString(),
        end: faker.date.recent().toISOString()
      },
      {
        id: 'matched-id-1',
        begin: faker.date.past().toISOString(),
        end: faker.date.recent().toISOString()
      }
    ]

    expect(prepareSiteOutages(siteInfo, outages)).toEqual([
      {
        ...outages[0],
        name: device0.name
      },
      {
        ...outages[1],
        name: device1.name
      }
    ])
  });
});

describe('run test cases', () => {
  let serviceCallerMock: any
  beforeEach(() => {
    serviceCallerMock = {
      getOutages: jest.fn(),
      getSiteInfo: jest.fn(),
      sendSiteOutage: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call ServiceCaller getOutages, getSiteInfo functions but not sendSiteOutage', async () => {
    const siteInfo = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      devices: [
        {
          id: faker.datatype.uuid(),
          name: faker.random.word(),
        }
      ]
    }

    const outages = [
      {
        id: faker.datatype.uuid(),
        begin: faker.date.past().toISOString(),
        end: faker.date.recent().toISOString()
      }
    ]

    serviceCallerMock.getOutages.mockResolvedValue(outages)
    serviceCallerMock.getSiteInfo.mockResolvedValue(siteInfo)
    serviceCallerMock.sendSiteOutage.mockResolvedValue(true)

    await run(serviceCallerMock as any)

    expect(serviceCallerMock.getOutages).toHaveBeenCalledTimes(1)
    expect(serviceCallerMock.getSiteInfo).toHaveBeenCalledTimes(1)
    expect(serviceCallerMock.sendSiteOutage).toHaveBeenCalledTimes(0)
  });

  it('should call all ServiceCaller functions properly', async () => {
    const device0 = {
      id: 'matched-id-0',
      name: faker.random.word(),
    }
    const device1 = {
      id: 'matched-id-1',
      name: faker.random.word(),
    }
    const siteInfo = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      devices: [device0,device1]
    }

    const outages = [
      {
        id: 'matched-id-0',
        begin: faker.date.past().toISOString(),
        end: faker.date.recent().toISOString()
      },
      {
        id: 'matched-id-1',
        begin: faker.date.past().toISOString(),
        end: faker.date.recent().toISOString()
      }
    ]

    serviceCallerMock.getOutages.mockResolvedValue(outages)
    serviceCallerMock.getSiteInfo.mockResolvedValue(siteInfo)
    serviceCallerMock.sendSiteOutage.mockResolvedValue(true)

    await run(serviceCallerMock as any)

    expect(serviceCallerMock.getOutages).toHaveBeenCalledTimes(1)
    expect(serviceCallerMock.getSiteInfo).toHaveBeenCalledTimes(1)
    expect(serviceCallerMock.sendSiteOutage).toHaveBeenCalledWith([
      {
        ...outages[0],
        name: device0.name
      },
      {
        ...outages[1],
        name: device1.name
      }
    ])
  });
})
