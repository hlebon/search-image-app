import unsplash from 'unsplash-js'

const API_ID = "b9ac01ec28ac58729130b2b8e9f659f2605aacac2161fa58f811118316d44b8c"
const APP_KEY= "4ec10287facbed349b69c5f946a8aeeda44dce867504eefb59ad4a523f7efd74"

const nunsplash = new unsplash({
    applicationId: API_ID,
    secret: APP_KEY,
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
})

export function fecthImages(){
    return nunsplash.photos.listPhotos(2,10, "lastest")
    .then(data => data.json())
    .catch(data => data.json())
}

export function searchPhoto(photo = ""){
    console.log(photo);
    photo = photo.trim().toLowerCase();
    return nunsplash.search.photos(photo, 1)
    .then(data => data.json())
    .catch(data => data)
}