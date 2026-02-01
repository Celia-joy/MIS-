function greeting(name,callback){
    setTimeout(()=>{
       callback("Good morning "+name)
    },3000)
}

greeting("Gift",(error,greetMessage)=>{
   if(error){
    console.log("error occurred")
   }
    console.log(greetMessage)
})

function getUser(id,callback){
    setTimeout(()=>{
        //fetch from db
        let user={
            id:id,
            username:"Moise",
            email:"moise@yopmail.com"
        }
        callback(null,user)
    },2000)
}