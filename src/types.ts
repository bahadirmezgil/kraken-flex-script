export interface Outage {
  id: string
  begin: string
  end: string
}

export interface SiteInfo {
  id: string
  name: string
  devices: Array<{
    id: string
    name: string
  }>
}
export interface SiteOutage {
  name: string &
  Outage
}
