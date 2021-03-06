//本地缓存 存取相关逻辑
import storage from 'good-storage'

const SEARCH_KEY = '__seach__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__PLAY__' 
const PLAY_MAX_LENGTH = 200 

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

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY,[])
  deleteFromArray(searches,(item) => {
    return item === query
  })
  storage.set(SEARCH_KEY,searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
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

function deleteFromArray(arr,compare){
  const index = arr.findIndex(compare)
  if(index > -1){
    arr.splice(index,1)
  }
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY,[])
  insertArray(songs,song,(item) => {
    return item.id === song.id
  },PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY,songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY,[])
}