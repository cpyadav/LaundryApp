export default function alpha(validationInputs){

   const errormsg = []

validationInputs.map((valinput,valinputInd)=>{

        var isDatacorrect = true

        if(valinput.val !== undefined & valinput.val !== null){
                    valinput.validators.map((valor, valorInd)=>{
          
                switch(valor.type){

                        case "minStrLen":{

                            if(valinput.val.length < valor.value & valinput.val.length !== 0){
                                isDatacorrect = false
                      
                            }
                           
                            break;
                           

                        }

                        case "maxStrLen":{

                            if(valinput.val.length > valor.value & valinput.val.length !== 0){
                                isDatacorrect = false
                             
                            }
                        
                            break;
                            
                        }

                        case "isRequired":{

                            if(valinput.val === "" & valor.value ){
                                isDatacorrect = false
                             
                            }
                            
                            break;
                        }

                        case "minIntVal":{

                            if(valinput.val < valor.value ){
                                isDatacorrect = false
                             
                            }
                            
                            break;
                        }

                        case "maxIntVal":{

                            if(valinput.val > valor.value ){
                                isDatacorrect = false
                             
                            }
                            
                            break;
                        }

                        case "isEmail":{

                            if(!ValidateEmail(valinput.val) & valinput.val.length !== 0){
                                isDatacorrect = false
                            }

                            break;
                            
                        }


                        case "isMobile":{

                            var phoneno = /^\d{10}$/;
                            if(!valinput.val.match(phoneno) & valinput.val.length !== 0){
                                isDatacorrect = false
                            }

                            break;
                        }

                        case "arraynotnull":{
                            console.log(valinput.val)
                            if(valinput.val.length === 0){
                                isDatacorrect = false
                            }

                            break;
                        }

                }

        })
        }else{
            isDatacorrect = false
        }



        if(!isDatacorrect){

            errormsg.push(valinput.errormsg)

        }



})

return (errormsg)



}


function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}