//error box
window.onload = async () =>{
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const error = document.getElementById("error");
    const submit = document.getElementById("submit");
    

    const response = await fetch("http://localhost:3001/user/api" );
    const  emails = (await response.json()).data;
    console.log(emails);


    password.addEventListener("input",()=>{
        console.log(password.value);
        regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
        if(validator.isLength(password.value,{min:8,max:255}) && regex.exec(password.value)){
            sinError("la contraseña es valida");
        }else{
            tieneError("La contraseña debe ser de minimo 8 caracteres, con al menos 1 mayuscula, 1 miniscula y 1 digito");
        }
    });
    email.addEventListener("input",()=>{
        if(validator.contains(email.value,"@") && validator.contains(email.value,".com")){
            if(!emails.includes(email.value)){
                tieneError("El email no existe en nuestra DB");
            }else{
                sinError("El email es valido");
            }
        }else{
            tieneError("El email debe ser un email valido");
        }
    });// chequear ademas si el email es valido con un fetch.

    function tieneError(errorString){
        error.classList.remove("success-box");
        error.classList.add("error-box");
        error.innerHTML = errorString;
        submit.setAttribute("disabled", "");
    };
    function sinError(validString){
        error.classList.remove("error-box");
        error.classList.add("success-box");
        error.innerHTML = validString;
        submit.removeAttribute("disabled");
    };
}