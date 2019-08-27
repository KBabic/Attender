import { headers } from './APIKey'
const endpoints = {
   req1: "locations/auto-complete",
   req2: "properties/list",
   req3: "properties/get-description",
   req4: "properties/get-hotel-photos",
   req5: "properties/get-facilities",
   //req6: "properties/get-static-map"
}
const getUrl = req => {
   let baseUrl = `https://apidojo-booking-v1.p.rapidapi.com/${endpoints[req]}?languagecode=en-us&`
   return baseUrl
}

//req1: locations/auto-complete?languagecode=en-us&text=berlin
export async function getLocations(destination) {
   let baseUrl = getUrl("req1")
      let url = `${baseUrl}text=${destination}`
      let req1 = new Request(url, { headers })
      let resp1 = await fetch(req1)
      let resp1Json = await resp1.json()
      return resp1Json
}
export const getDestId = (resp) => {
   // get dest_id for dest_type "city"
   if (resp) {
      let dest_id = 0
      for (let i=0; i < resp.length; i++) {
         if (resp[i].dest_type === "city") {
            dest_id = resp[i].dest_id
            break
         }
      }
      return dest_id
   }
}
// req2: properties/list?languagecode=en-us&price_filter_currencycode=USD&search_type=city&offset=0&dest_ids=-1746443&guest_qty=1&arrival_date=2019-06-01&departure_date=2019-06-20&room_qty=1
const currencyCode = "USD"
const search_type = "city"
const room_qty = 1 
export async function getPropertiesList(id, offset, search_id, guest_qty, arr_date, dep_date) {
   if (id) {
      let baseUrl = getUrl("req2")
         let url
         if(search_id !== "") {
            url = `${baseUrl}order_by=price&price_filter_currencycode=${currencyCode}&search_type=${search_type}&offset=${offset}&dest_ids=${id}&guest_qty=${guest_qty}&arrival_date=${arr_date}&departure_date=${dep_date}&room_qty=${room_qty}&search_id=${search_id}`
         } else {
            url = `${baseUrl}order_by=price&price_filter_currencycode=${currencyCode}&search_type=${search_type}&offset=${offset}&dest_ids=${id}&guest_qty=${guest_qty}&arrival_date=${arr_date}&departure_date=${dep_date}&room_qty=${room_qty}`
         }
         let req2 = new Request(url, { headers })
         let resp2 = await fetch(req2)
         let resp2Json = await resp2.json()
         return resp2Json
   }
}
export const getSearchId = (respJson) => {
   let search_id = respJson.search_id
   return search_id
}
export const getHotelsList = (respJson) => {
   if (respJson) {
      let hotelsList = []
      hotelsList = respJson.result.filter(e => e.soldout === 0).map(e => {
         const hotelItem = {}
         hotelItem.id = e.hotel_id
         hotelItem.name = e.hotel_name
         hotelItem.minPrice = Math.floor(e.min_total_price)
         hotelItem.currency = e.currencycode
         return hotelItem
      })
      return hotelsList
   }
}
export const getHotelDetails = (item, response) => {
   if (response) {
      for (i=0; i < response.length; i++) {
         let h = response[i]
         if (h.hotel_id === item.id) {
            item.latitude = h.latitude
            item.longitude = h.longitude
            item.checkin = h.checkin
            item.checkout = h.checkout
            item.reviewScore = h.reviewScore
            item.url = h.url
         }
         break
      }
      return item
   } else {
      console.log("No hotelsList")
   }
}     

export async function getHotelDescription(hotel) {
   if (hotel) {
      //req3: "properties/get-description"
      let baseUrl = getUrl("req3")
      let url = `${baseUrl}hotel_ids=${hotel.id}`
      let req3 = new Request(url, { headers })
      let resp3 = await fetch(req3)
      let resp3Json = await resp3.json()
      const descriptions = await resp3Json.map(res => {
         return res.description
      })
      hotel.description = descriptions.join(" ")
      return hotel
   }
}
export async function getPhotoData(hotel) {
   // response = { data: { id: [ [], [], ...]}, url_prefix: "http://r-ec.bstatic.com"}
   // most inner array: position 4 => url
   if (hotel) {
      let baseUrl = getUrl("req4")
      let url = `${baseUrl}hotel_ids=${hotel.id}`
      let req4 = new Request(url, { headers })
      let resp4 = await fetch(req4)
      let resp4Json = await resp4.json()
      let url_prefix = resp4Json.url_prefix
      let photoData = resp4Json.data[hotel.id]
      return [url_prefix, photoData]
   }
}
function extractNthElement(arr, n) {
   let newArr = []
   for (let i=0; i < arr.length; i = i + n) {
     newArr.push(arr[i])
   }
   return newArr
}
function getProportion(obj, x) {
   // example obj: { 20: 1, 30: 2, 60: 3, 90: 4 }
   // if x is <= 20, return 1
   // if x is <=30, return 2 etc.
   const arr = Object.keys(obj)
   for (let i=0; i < arr.length; i++) {
      if (x <= arr[i]) {
         return obj[arr[i]]
      }
   }
}
export const getPhotosList = (prefix, data) => {
   let initList = data.map(item => {
      return { source: { uri: `${prefix}${item[4]}` }}
   })
   // if there are <=20 photos, return all;
   // if there are 20-30 photos, return every 2nd photo
   // if there are 30-60 photos, return every 3rd photo
   // if there are 60-90 photos return every 4th photo
   // if there are >90 photos return every 6th photo
   const proportions = { 20: 1, 30: 2, 60: 3, 90: 4 }
   let l = initList.length
   let n = getProportion(proportions, l)
   if (!n) { 
      n = 6
   }
   let photosList = extractNthElement(initList, n)
   return photosList
}
export async function getFacilities(hotel) {
   // response: [ { "facilitytype_name", "facility_name", "kind", "value" }, {}, ...]
   if (hotel) {
      let baseUrl = getUrl("req5")
      let url = `${baseUrl}hotel_ids=${hotel.id}`
      let req5 = new Request(url, { headers })
      let resp5 = await fetch(req5)
      let resp5Json = await resp5.json()
      let facilities = resp5Json.map(item => {
         return item.facility_name
      })
      hotel.facilities = facilities
      return hotel.facilities
   }
}