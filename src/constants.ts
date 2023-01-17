import { config } from 'dotenv'

config()

const SITE_ID = 'norwich-pear-tree'

export const API = {
  KEY: process.env.API_KEY,
  BASE_URL: process.env.API_BASE_URL,
  TIMEOUT: Number(process.env.API_TIMEOUT ?? 10000),
  PATHS: {
    GET_OUTAGES: '/interview-tests-mock-api/v1/outages',
    GET_SITE_INFO: `/interview-tests-mock-api/v1/site-info/${SITE_ID}`,
    POST_SITE_OUTAGE: `/interview-tests-mock-api/v1/site-outages/${SITE_ID}`
  }
}

export const OLDEST_OUTAGE_BEGINNING_LIMIT = '2022-01-01T00:00:00.000Z'
