const API_URL = 'https://animal-api-two.vercel.app/';

const $content = document.querySelector('div.content');
let template = [];

//API
const getData = async (name) => {
    let res = await fetch(`${API_URL}${name}`);
    try {
        if (res) {
            let data = await res.json();
            data.photos.forEach((elm) => {
                template += `<img src="${elm.url}"></img>`;
            });
            $content.innerHTML = template;
        }
    } catch (err) {
        console.log(err);
    }
};

getData('penguin');
