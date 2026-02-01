//fetch countries
//fetch provinces by country name
//fetch districts by province name
//fetch sectors by district name
function getCountries(continent,callback){
    setTimeout(() => {
        const countries =[
        {continent:continent,code:250,name:"Rwanda"},
        {continent:continent,code:254,name:"Kenya"},
    ]
    callback(null,countries)
    }, 3000);
    
}
function getProvinces(country,callback){
    setTimeout(()=>{
    const provinces = [
        {country:country,id:1,name:"West"},
        {country:country,id:2,name:"Kigali"},
    ]
    callback(null,provinces)
    },3000)
}

function getDistricts(province,callback){
    setTimeout(() => {
        const districts = [
            {province,id:1,name:"Nyabihu"},
            {province,id:2,name:"Rubavu"},
            
        ]
        callback(null,districts)
    }, 3000);
}

let rwanda
getCountries("Africa",(error,countries)=>{
    if(error)
        console.log(error)
    console.log(countries)
    rwanda = countries[0].name

    getProvinces(rwanda,(error,provinces)=>{
    if(error)
        console.log(error)
    console.log(provinces)
    getDistricts(provinces[0].name,(err,districts)=>{
        if(err)
            console.error(err)
        console.log(districts)
    })
})
})


function getCountriesPromise(continent){
    return new Promise((resolve,reject)=>{
setTimeout(() => {
        const countries =[
        {continent:continent,code:250,name:"Rwanda"},
        {continent:continent,code:254,name:"Kenya"},
    ]
    resolve(countries)
    }, 3000);
    })
}

async function displayMyPromise(){
    let countries = await getCountriesPromise("Africa")
    console.log("new approach:",countries)
}
displayMyPromise()

