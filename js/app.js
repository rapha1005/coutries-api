const $resultDiv = document.querySelector('.results')
const $form = document.querySelector('form')
const $filter =    document.querySelector('.select-input')
const $search = document.querySelector('.search-input')
const $countryCard = document.querySelector('.country-card')
const $modalCountry = document.querySelector('.modal-country')
let countries

async function fetchCountries() {
    await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags')
        .then(res => res.json())
        .then(data => countries = data) 

    displayData(countries) 
}


function displayData(array) {
    
    $resultDiv.innerHTML = ''
    array.forEach(country => {
        const countryData = [
            `<span>Population:</span> ${country.population.toLocaleString()}`,
            `<span>Region:</span> ${country.region}`, 
            `<span>Capital:</span> ${country.capital}`,
        ]

        const $countryCard = document.createElement('div')
        $countryCard.classList.add('country-card')

        const $cardImg = document.createElement('img')
        $cardImg.src = country.flags.png

        const $countryDetails = document.createElement('div')
        $countryDetails.classList.add('country-details')

        const $countryName = document.createElement('h2')
        $countryName.textContent = country.name.common

        const $cardUl = document.createElement('ul')

        $resultDiv.appendChild($countryCard)
        $countryCard.appendChild($cardImg)
        $countryCard.appendChild($countryDetails)
        $countryDetails.appendChild($countryName)
        $countryDetails.appendChild($cardUl)

        
            $countryCard.addEventListener('click', function () {
                $resultDiv.classList.add('hidden')
                $form.classList.add('hidden')
                
               countryDetails($countryCard.querySelector('h2').textContent)
            })

        countryData.forEach(dataItem => {
            const $cardLi = document.createElement('li')
            $cardLi.innerHTML = dataItem
            $cardUl.appendChild($cardLi)
        })
    }); 
}


async function countryDetails(search){
    let country
    await fetch(`https://restcountries.com/v3.1/name/${search}?fields=name,nativeName,population,region,subregion,capital,tld,currencies,languages,flags`)
    .then(res => res.json())
    .then(data => country = data)
//
    const countryData = [
        `<span>Native Name:</span> ${country[0].name.nativeName}`,
        `<span>Population:</span> ${country[0].population.toLocaleString()}`,
        `<span>Region:</span> ${country[0].region}`,
        `<span>Sub Region:</span> ${country[0].subregion}`,
        `<span>Capital:</span> ${country[0].capital}`,
        `<span>Top Level Domain:</span> ${country[0].tld}`,
        `<span>Currencies:</span> ${Object.values(country[0].currencies)[0].name}`,
        `<span>Languages:</span> ${country[0].languages}`
    ]

    const $img = document.createElement('img')
    $img.src = country[0].flags.png

    const $countryDetails = document.createElement('div')
    $countryDetails.classList.add('modal-country-details')

    $modalCountry.appendChild($img)
    $modalCountry.appendChild($countryDetails)


    countryData.forEach(data =>{
        const $p =  document.createElement('p')
        $p.innerHTML = data

        $countryDetails.appendChild($p)
    })
    
}

fetchCountries()


$filter.addEventListener('change', function(){
    const newTab = countries.filter(country => country.region === $filter.value)
    if(newTab != ""){
        displayData(newTab)
    }else{ 
        displayData(countries)
    }
    
})

addEventListener("keypress", function(e){
    if (e.code === "Enter") {
        e.preventDefault()
        const country = countries.filter(country => country.name.common.includes($search.value))
        displayData(country) 
    }
})

