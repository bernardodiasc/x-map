import { normalizeLocationsApiData } from '@lib/locations'

export const normalizeBountyApiData = bounty => {
  const locations = normalizeLocationsApiData(bounty.attributes.locations)
  const normalizedBounty = {
    id: bounty.id,
    description: bounty.attributes.description,
    locations,
  }
  return normalizedBounty
}

export const normalizeBountiesApiData = apiData => apiData?.data
  ? apiData.data.map(normalizeBountyApiData)
  : undefined
