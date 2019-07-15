import {
   ADD_NOTES
} from './types'
export const addNotes = text => {
   return {
      type: ADD_NOTES,
      payload: text
   }
}