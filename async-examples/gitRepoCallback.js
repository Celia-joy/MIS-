//get user by username from git
// fetch users repos
//fetch repo's commits
function getUserByUsername(username,callback){
    setTimeout(() => {
        callback(null,{id:1,username:username,name:"Joe doe"})
    }, 2000);
}
function getRepos(id,callback){
    setTimeout(() => {
        const repos = [
            {userId:id,repoId:1,repo:"repo1"},
            {userId:id,repoId:2,repo:"repo2"}
        ]
        callback(null,repos)
    }, 3000);
}
function getCommits(repo,callback){
    setTimeout(() => {
        const commits =[
            {id:1,commit:"commit1"},
            {id:2,commit:"commit2"},
        ]
        callback(null,commits)
    }, 1000);
}
let userId
getUserByUsername("Galen",(error,user)=>{
if(error){
    console.log("error occured")
}
console.log(user)
userId = user.id
let repoId
getRepos(userId,(error,repos)=>{
    if(error) {console.log(error)}
    console.log(repos)
    repoId = repos[0].id
})
})

