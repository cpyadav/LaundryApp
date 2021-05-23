export default {

    config : {headers: {
        "Client-Type":'SAAS-ADMIN',
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': "Bearer " + (JSON.parse(window.localStorage.getItem("auth_user")) === null ? undefined : JSON.parse(window.localStorage.getItem("auth_user")).token)
    }},

    // main : "https://saasproduct.herokuapp.com/admin/",
    // admin : "https://saasproduct.herokuapp.com/",
    main : "http://3.139.70.149:1338/admin/",
    admin : "http://3.139.70.149:1338/",

}

