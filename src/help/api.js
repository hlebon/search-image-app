import _unsplash from "unsplash-js";

//last two
const API_ID =
  "b9ac01ec28ac58729130b2b8e9f659f2605aacac2161fa58f811118316d44b8c";
const APP_KEY =
  "4ec10287facbed349b69c5f946a8aeeda44dce867504eefb59ad4a523f7efd74";

const unsplash = new _unsplash({
  applicationId: API_ID,
  secret: APP_KEY,
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

export function fecthImages({ page = 1, perPage = 100, orderBy = "lastest" }) {
  return unsplash.photos
    .listPhotos(page, perPage, orderBy)
    .then(data => data.json())
    .then(data => data);
}

export function getRandomPhoto() {
  return unsplash.photos
    .getRandomPhoto({ query: "natural" })
    .then(data => data.json())
    .then(data => data);
}

export function getInitialData() {
  return Promise.all([getRandomPhoto(), fecthImages({})]).then(values => {
    return {
      getRandomPhoto: values[0],
      getRandomImages: values[1]
    };
  });
}

export function searchPhoto(photo = "") {
  photo = photo.trim().toLowerCase();
  return unsplash.search
    .photos(photo, 1)
    .catch(data => {
      console.log(data);
      return data;
    })
    .then(data => data.json())
    .then(data => data);
}

export function getPhoto(id) {
  return unsplash.photos
    .getPhoto(id)
    .then(data => data.json())
    .then(json => {
      unsplash.photos.downloadPhoto(json);
      return json;
    });
}

export function listCollection({
  page = 1,
  perPage = 26,
  orderBy = "lastest"
}) {
  return unsplash.photos
    .listCuratedPhotos(page, perPage, orderBy)
    .then(data => data.json())
    .then(json => json);
}
