// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//     return result.json()
// }).then(function (data) {
//     console.log(data);
// });

// Элементы формы.. ввод суммы валюты, выбор валюты, цена валюты..
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


// Элементы для отображения курса
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementAZN = document.querySelector('[data-value="AZN"]');

// создал пустой объект
const raset = {};

getCurrencies();
setInterval(getCurrencies, 10000);

// Функция получение валют и их отображение
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    

    // создал в объекте только те валюты, которые мне нужны
    raset.USD = result.Valute.USD;
    raset.EUR = result.Valute.EUR;
    raset.AZN = result.Valute.AZN;

    

    elementUSD.textContent = raset.USD.Value.toFixed(2);
    elementEUR.textContent = raset.EUR.Value.toFixed(2);
    elementAZN.textContent = raset.AZN.Value.toFixed(2);

    if (raset.USD.Value > raset.USD.Previous) {

        elementUSD.classList.add('top');
        elementUSD.classList.remove('bottom');
    }else {

        elementUSD.classList.remove('top');
        elementUSD.classList.add('bottom');
    }

    if (raset.EUR.Value > raset.EUR.Previous) {

        elementEUR.classList.add('top');
        elementUSD.classList.remove('bottom');
    }else 
    {
        elementUSD.classList.remove('top');
        elementEUR.classList.add('bottom');
    }

    if (raset.AZN.Value > raset.AZN.Previous) {

        elementAZN.classList.add('top');
        elementAZN.classList.remove('bottom');
    }else {

        elementAZN.classList.remove('top');
        elementAZN.classList.add('bottom');
    }
};

// на 70 и 75 строке использовал разные виды "event"
// input.addEventListener('change', function () {
//     console.log("changed!");
//     result.value = (parseFloat(input.value) / raset[select.value].Value).toFixed(2);
// })

// select.oninput = function () {
//     console.log("changed!");
//     result.value = (parseFloat(input.value) / raset[select.value].Value).toFixed(2);
// }


input.oninput = convertValue;
select.oninput = convertValue;

function convertValue() {
    result.value = (parseFloat(input.value) / raset[select.value].Value).toFixed(2);
}