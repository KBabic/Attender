import { APIkey } from './APIKey'

export const modes = {
   "fly": {
      vehicle: "plane",
      icon: "flight"
   },
   "bus": {
      vehicle: "bus",
      icon: "directions-bus"
   },
   "drive": {
      vehicle: "car",
      icon: "directions-car"
   },
   "train": {
      vehicle: "train",
      icon: "directions-railway"
   },
   "taxi": {
      vehicle: "taxi",
      icon: "local-taxi"
   },
   "shuttle": {
      vehicle: "shuttle",
      icon: "directions-bus"
   },
   "towncar": {
      vehicle: "towncar",
      icon: "directions-car"
   },
   "subway": {
      vehicle: "subway",
      icon: "subway"
   }
}

export async function getTransportData(modes, oName, dName) {
   const url = `http://free.rome2rio.com/api/1.4/json/Search?key=${APIkey}&oName=${oName}&dName=${dName}`
   try {
      let response = await fetch(url)
      let responseJson = await response.json()
      const routes = await responseJson.routes
      const places = await responseJson.places
      const vehicles = await responseJson.vehicles
     
      let transpList = []
      transpList = routes.map((route, index) => {
         
         //transpItem = { id, distance, modes, icons, totalTime, minPrice, maxPrice, price, currency, segments }
         const transpItem = {}
         // get transpItem.id
         transpItem.id = index
         // get transpItem.distance
         transpItem.distance = `${route.distance} km`
         // get transpItem.modes from route name (route name is e.g. "Fly to Berlin Tegel" or "Bus, night train")
         const nameArr = route.name.split(/[ ,]+/)
         const routeModes = []
         nameArr.forEach(n => {
            if (Object.keys(modes).includes(n.toLowerCase())) {
               routeModes.push(n.toLowerCase())
            }
            return routeModes
         })
         transpItem.modes = routeModes
         // get transpItem.icons
         transpItem.icons = transpItem.modes.map(m => {
            return modes[m].icon
         })
         // get transpItem.totalTime
         transpItem.totalTime = getTime(route.totalDuration)
         // get transpItem.minPrice, transpItem.maxPrice, transpItem.price and transpItem.currency for NON DRIVE routes:
         if (!route.name.includes("Drive") && !route.name.includes("drive")) {
            if (route.indicativePrices) {
               route.indicativePrices[0].priceLow ? transpItem.minPrice = `${route.indicativePrices[0].priceLow}` : transpItem.minPrice =""
               route.indicativePrices[0].priceHigh ? transpItem.maxPrice =`${route.indicativePrices[0].priceHigh}` : transpItem.maxPrice = ""
               transpItem.price = route.indicativePrices[0].price
               transpItem.currency = `${route.indicativePrices[0].currency}`
            } else {
               transpItem.minPrice = transpItem.maxPrice = transpItem.price = transpItem.currency = ""
            }
         // get transpItem.minPrice, transpItem.maxPrice and transpItem.currency for DRIVE routes:
         } else {
            if (route.indicativePrices) {
               const prices = route.indicativePrices.map(el => el.price)
               transpItem.minPrice = Math.min(...prices)
               transpItem.maxPrice = Math.max(...prices)
               transpItem.price = Math.floor((prices[0] + prices[1] + prices[2]) / 3)
               transpItem.currency = route.indicativePrices[0].currency
            }
         }
         
         // get transpItem.segments
         transpItem.segments = route.segments

         return transpItem
      })
      console.log(transpList)
      return [places, vehicles, transpList]
      
   } catch(e) {
      console.log(e)
   }
}

export function getRouteSegments(segments, places, vehicles, modes) {
   let routeSegments = []
   routeSegments = segments.map((segment, index) => {
      // routeSegment: {id, depPlace, arrPlace, vehicle, icon, transitTime, transferTime, price, minPrice, maxPrice, currency, lines}
      const routeSegment = {}
      routeSegment.id = index
      routeSegment.depPlace = places[segment.depPlace].shortName
      routeSegment.arrPlace = places[segment.arrPlace].shortName
      // latitude and longitude required to display map later
      routeSegment.depLat = places[segment.depPlace].lat
      routeSegment.depLng = places[segment.depPlace].lng
      routeSegment.arrLat = places[segment.arrPlace].lat
      routeSegment.arrLng = places[segment.arrPlace].lng
      
      routeSegment.vehicle = vehicles[segment.vehicle].kind
       // get routeSegment.icon
       Object.keys(modes).forEach(key => {
         if (modes[key].vehicle === routeSegment.vehicle) {
            routeSegment.icon = modes[key].icon
            return routeSegment.icon
         }
      })
      routeSegment.transitTime = getTime(segment.transitDuration)
      routeSegment.transferTime = getTime(segment.transferDuration)
      // get prices and currency for NON DRIVE segments:
      if (vehicles[segment.vehicle].kind !== "car") {
         if (segment.indicativePrices) {
            routeSegment.minPrice = segment.indicativePrices[0].priceLow
            routeSegment.maxPrice = segment.indicativePrices[0].priceHigh
            routeSegment.currency = segment.indicativePrices[0].currency
         } else {
            routeSegment.price = routeSegment.minPrice = routeSegment.maxPrice = routeSegment.currency = ""
         }
      // get prices and currency from DRIVE segments:
      } else {
         if (segment.indicativePrices) {
            const prices = segment.indicativePrices.map(el => el.price)
               routeSegment.minPrice = Math.min(...prices)
               routeSegment.maxPrice = Math.max(...prices)
               routeSegment.currency = segment.indicativePrices[0].currency
         } else {
            routeSegment.price = routeSegment.minPrice = routeSegment.maxPrice = routeSegment.currency = ""
         }
      }
      if (segment.agencies) {
         routeSegment.lines = segment.agencies[0].lineNames
      }
      return routeSegment
   })
   return routeSegments
}

const getTime = item => {
   const hours = Math.floor(item / 60)
   const minutes = item % 60
   if (hours === 0) {
      const time = `${minutes}m`
      return time
   } else if (minutes === 0) {
      const time = `${hours}h`
      return time
   } else {
      const time = `${hours}h ${minutes}m`
      return time
   }
}