import { useEffect } from 'react'
import { getSlotConfigById } from '../helper'

const usePageTargeting = () => {
  const setFromServerTargeting = () => {
    const pageTargeting = document.querySelector(
      'meta[name=\'ad-targeting\']')?.dataset || {}
    for (const [key, value] of Object.entries(pageTargeting)) {
      googletag.pubads().setTargeting(key, value)
    }
  }

  const setTargeting = (key, value) => {
    googletag.cmd.push(() => {
      googletag.pubads().setTargeting(key, value)
    })
  }

  const setUrlTargeting = () => {
    const params = new URLSearchParams(document.location.search)
    for (const key of params.keys()) {
      if (['utm_campaign', 'utm_medium', 'utm_source'].includes(key)) {
        googletag.pubads().setTargeting(key, params.get(key))
      }
    }
  }
  const setPageLevelTargeting = () => {
    googletag.cmd.push(() => {
      setFromServerTargeting()
      setUrlTargeting()
    })
  }

  const refreshAd = () => {
    googletag.cmd.push(() => {
      googletag.pubads().addEventListener('impressionViewable', (event) => {
        const { slot } = event
        const id = slot.getSlotId().getDomId()
        const slotFromConfig = getSlotConfigById(id)
        if (typeof (slotFromConfig.refreshInterval) !== 'undefined') {
          setTimeout(() => {
            googletag.pubads().refresh([slot])
          }, slotFromConfig.refreshInterval * 1000)
        }
      })
    })
  }

  useEffect(() => {
    refreshAd()
  }, [])

  useEffect(() => {
    setPageLevelTargeting()
  }, [])

  const refreshAdById = (adId) => {
    googletag.cmd.push(() => {
      const slot = window.SD.slots.find(({ id }) => id === adId)
      if (slot) { googletag.pubads().refresh([slot]) }
    })
  }

  return { setTargeting, refreshAdById }
}

export default usePageTargeting