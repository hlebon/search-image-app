import unsplash from 'unsplash-js'

//last two
const API_ID = "b9ac01ec28ac58729130b2b8e9f659f2605aacac2161fa58f811118316d44b8c"
const APP_KEY= "4ec10287facbed349b69c5f946a8aeeda44dce867504eefb59ad4a523f7efd74"

const nunsplash = new unsplash({
    applicationId: API_ID,
    secret: APP_KEY,
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
})

export function fecthImages(){
    return nunsplash.photos.listPhotos(2,14, "lastest")
    .catch(data => data)
    .then(data => data.json())
    .then(data => data)
}

export function getRandomPhoto(){
    return nunsplash.photos.getRandomPhoto({query: 'natural'})
    .then(data => data.json())
    .then(data => data);
}

export function getInitialData(){
    return Promise.all([getRandomPhoto(), fecthImages()])
    .then((values) => {
        console.log(values)
        return {
            getRandomPhoto: values[0],
            getRandomImages: values[1]
        }
    })
    

}

export function searchPhoto(photo = ""){
    photo = photo.trim().toLowerCase();
    return nunsplash.search.photos(photo, 1)
    .catch(data => {
        console.log(data)
        return data
    })
    .then(data => data.json())
    .then(data => data)
}

export function getPhoto(id){
    return nunsplash.photos.getPhoto(id)
    .then(data => data.json())
    .then(json => {
        nunsplash.photos.downloadPhoto(json)
        return json
    })
}