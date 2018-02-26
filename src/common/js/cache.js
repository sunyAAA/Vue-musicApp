//本地缓存 存取相关逻辑
import storage from 'good-storage'

const SEARCH_KEY = '__seach__'
const SEARCH_MAX_LENGTH = 15

export const saveSearch = function(query) {
  let searches = storage.get(SEARCH_KEY,[])
  insertArray(searches,query,(item)=>{
    return item === query
  },SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY,[])
}

function insertArray(arr,val,compare,maxLen) {
  let index = arr.findIndex(compare)
  if(index === 0) {
    return
  }
  if(index > 0){
    arr.splice(index,1)
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen) {
    arr.pop()
  }
}