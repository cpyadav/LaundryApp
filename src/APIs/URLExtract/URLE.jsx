export default function alpha(param){

    console.log("hi")
    // var search1  = window.location.search
    console.log(window.location.search)

    var alpha = window.location.search.split("&&")
    alpha[0] = alpha[0].substring(1,alpha[0].length)
    console.log(alpha)
    var finalObj = {}

    alpha.map(v=>{
        var beta = v.split("=")
        finalObj[beta[0]] = beta[1]
    })

    console.log(finalObj)
    return finalObj



}


