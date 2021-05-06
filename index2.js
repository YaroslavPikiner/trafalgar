const getImgUrl1 = 'https://boiling-refuge-66454.herokuapp.com/images';
const getImgUrl2 = 'https://boiling-refuge-66454.herkuapp.com/images';

function request(url) {
    return fetch(url)
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function doRequest(urls){
    var url = urls.shift();
  
    if( ! url){
      return Promise.resolve();
    }
  
    return request(url)
      .then(() => {
        return sleep(5000);
      })
      .then(() => {
        return doRequest(urls);
      });
  }
  
  doRequest([
   'https://boiling-refuge-66454.herkuapp.com/images',
   'https://boiling-refuge-66454.herkuapp.com/images',
   'https://boiling-refuge-66454.herkuapp.com/images',
   'https://boiling-refuge-66454.herkuapp.com/images',
   'https://boiling-refuge-66454.herokuapp.com/images',
  ])
  .then(() => {
    console.log(doRequest())
  })

  // console.log( request(getImgUrl1) ?? request(getImgUrl1) ?? request(getImgUrl1) ?? request(getImgUrl2))