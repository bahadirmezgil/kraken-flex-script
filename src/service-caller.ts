import axios from 'axios'

import { API } from './constants'
import { Outage, SiteInfo, SiteOutage } from './types'

interface CommonRequestConfig {
  headers: Record<string, any>
  timeout: number
  validateStatus: () => boolean
}

export class ServiceCaller {
  readonly commonRequestConfigs: CommonRequestConfig
  constructor () {
    this.commonRequestConfigs = {
      headers: {
        'x-api-key': API.KEY
      },
      timeout: API.TIMEOUT,
      validateStatus: () => true
    }
  }

  public async getOutages (): Promise<Outage[]> {
    const url = new URL(API.PATHS.GET_OUTAGES, API.BASE_URL).href
    const method = 'GET'

    const { status, data: outages } = await axios({
      ...this.commonRequestConfigs,
      method,
      url
    })

    if (status === 200) {
      return outages
    }

    throw new Error(`${method} ${url} request failed with status ${status}`)
  }

  public async getSiteInfo (): Promise<SiteInfo> {
    const url = new URL(API.PATHS.GET_SITE_INFO, API.BASE_URL).href
    const method = 'GET'

    const { status, data: siteInfo } = await axios({
      ...this.commonRequestConfigs,
      method,
      url
    })

    if (status === 200) {
      return siteInfo
    }

    throw new Error(`${method} ${url} request failed with status ${status}`)
  }

  public async sendSiteOutage (siteOutages: SiteOutage[]): Promise<any> {
    const url = new URL(API.PATHS.POST_SITE_OUTAGE, API.BASE_URL).href
    const method = 'POST'

    const { status, data: result } = await axios({
      ...this.commonRequestConfigs,
      method,
      url,
      data: siteOutages
    })

    if (status === 200) {
      return result
    }

    throw new Error(`${method} ${url} request failed with status ${status}`)
  }
}
