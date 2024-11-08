//API Key
const API_KEY = 'e6ae11f7c84ed484c0724c9be94c5a79';
const URL_API = ' https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const imgResult = document.getElementById("img-result");
const tempResult = document.getElementById("temp-result");
const descriptionResult = document.getElementById("description-result");
const titleResult = document.getElementById("title-result");

searchButton.addEventListener('click', () => {
    const city = cityInput.value;

    if (city) {
        buscarClima(city) //Argumento passado para a função
    } else {
        alert("Digite o nome de uma cidade para pesquisar.");
    }
})

//função assincrona
async function buscarClima(city) {  //Parâmetro da função
    console.log(city);

    try {
        //Solicitando os dados para a API
        // https://api.openweathermap.org/data/2.5/weather?q=curitiba&appid=e6ae11f7c84ed484c0724c9be94c5a79&units=metric&lang=pt_br
        // `` strings e variáveis
        // ${} variável
        const resposta = await fetch(`${URL_API}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);

        // json retorna os dados da API já convertido em objeto javaScript
        const data = await resposta.json();

        if (resposta.ok) {
            console.log("Resposta:", resposta);
            console.log("Data: ", data);
            mostrarResultado(data);
        } else {
            alert("Digite um nome valido para a cidade.");
        }
    } catch (error) {
        console.log("Erro ao obter os dados da API", error)
        alert("Dados indisponíveis, tente novamente mais tarde.")
    }
}

function mostrarResultado(data) {
    console.log(data.name);
    console.log(data.main.temp);
    console.log(data.weather[0].description);
    console.log(data.weather[0].icon);

    titleResult.textContent = `Previsão ${data.name}`;
    descriptionResult.textContent = `${data.weather[0].description}`;
    tempResult.textContent = `${data.main.temp}ºC`;

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    imgResult.src = icon;
}