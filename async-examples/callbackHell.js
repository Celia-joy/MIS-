//get country by code
//get provinces by country
//get districts by pronvince
//get sectors by disctrict
function getCountryByCode(code,callback){
    setTimeout(() => {
        callback(null,{code:code,name:"Rwanda"})
    }, 3000);
}
function getProvinces(country,callback){
    setTimeout(() => {
        const provinces = [
            {country:country,id:1,name:"West"},
            {country:country,id:2,name:"Kigali"},
        ]
        callback(null,provinces)
    }, 3000);
}
function getDistricts(province,callback){
    setTimeout(() => {
        const districts = [
            {province:province,id:1,name:"Nyabihu"},
             {province:province,id:2,name:"Karongi"},
        ]
        callback(null,districts)
    }, 3000);
}
function getSectors(district,callback){
    setTimeout(() => {
        const sectors = [
            {district:district,id:1,name:"mukamira"},
            {district:district,id:2,name:"rambura"},
        ]
        callback(null,sectors)
    }, 3000);
}
let myCountry
getCountryByCode(250,(error,country)=>{
    if(error) 
        console.log(error)
    console.log(country)
    myCountry = country.name 

    getProvinces(myCountry,(error,provinces)=>{
    if(error)
        console.log(error)
    console.log(provinces)

    let west = provinces[0].name
    getDistricts(west,(error,districts)=>{
        if(error)
            console.log(error)
        console.log(districts)

        let nyabihu = districts[0].name
        getSectors(nyabihu,(error,sectors)=>{
            if(error)
                console.log(error)
            console.log(sectors)
        })
    })
}) 
})



