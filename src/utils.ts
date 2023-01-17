import { OLDEST_OUTAGE_BEGINNING_LIMIT } from './constants'
import { ServiceCaller } from './service-caller'
import { Outage, SiteInfo, SiteOutage } from './types'

export function prepareSiteOutages (siteInfo: SiteInfo, outages: Outage[]): SiteOutage[] {
  return outages.reduce((acc: SiteOutage[], outage: Outage) => {
    const foundDevice = siteInfo.devices.find((device) => device.id === outage.id)
    if (
      (foundDevice != null) &&
      new Date(outage.begin).getTime() >= new Date(OLDEST_OUTAGE_BEGINNING_LIMIT).getTime()) {
      acc.push({
        id: outage.id,
        name: foundDevice.name,
        begin: outage.begin,
        end: outage.end
      } as unknown as SiteOutage)
    }

    return acc
  }, [])
}

export async function run (serviceCaller: ServiceCaller): Promise<void> {
  const [outages, siteInfo] = await Promise.all([
    serviceCaller.getOutages(),
    serviceCaller.getSiteInfo()
  ])
  console.log('Found Outages:', outages)
  console.log('Found SiteInfo:', siteInfo)

  const siteOutages = prepareSiteOutages(siteInfo, outages)
  console.log('Prepared SiteOutages:', siteOutages)

  if (siteOutages.length > 0) {
    await serviceCaller.sendSiteOutage(siteOutages)
    console.log('Detected site outages sent successfully.')
  } else {
    console.log('Matched site outage could not be found.')
  }
  console.log('Script run successfully.')
}
