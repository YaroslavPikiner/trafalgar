const getImgUrl1 = 'https://boiling-refuge-66454.herokuapp.com/images';
const getImgUrl2 = 'https://boiling-refuge-66454.herkuapp.com/images';





const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

let promises = [];
for (let i = 1; i <= 5; i++) {
  promises.push(fetch(getImgUrl1));
}
Promise.all(promises)
  .then(function handleData(data) {
    return fetch("example.api") // should be returned 1 time
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      });
  })
  .catch(function handleError(error) {
    console.log("Error" + error);
  });


  console.log(handleData())