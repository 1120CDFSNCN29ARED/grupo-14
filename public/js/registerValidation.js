
window.onload = () =>{
const error = document.getElementById("error");
const password = document.getElementById("password");
const lastName = document.getElementById("user-lastname");
const email = document.getElementById("user-email");
const submit = document.getElementById("submit-button");
const form = document.getElementById("form");
const file = document.getElementById("imagen-user");

    let hasErrors = false;
    const userName = document.getElementById("user-name");
    userName.addEventListener("input",()=>{
        if(!validator.isLength(userName.value,{min:2,max:255})){
            tieneError("El nombre debe tener entre 2 y 255 caracteres");
        }else{
            sinError("el nombre es valido");
        }
        
    });
    lastName.addEventListener("input",()=>{
        console.log(lastName.value);
        if(!validator.isLength(lastName.value,{min:2,max:255})){
            tieneError("El Lastname debe tener entre 2 y 255 caracteres");
        }else{
            sinError("el apellido es valido");
        }
    });
    password.addEventListener("input",()=>{
        console.log(password.value);
        regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
        if(validator.isLength(password.value,{min:8,max:255}) && regex.exec(password.value)){
            sinError("la contraseña es valida");
        }else{
            tieneError("La contraseña debe ser de minimo 8 caracteres, con al menos 1 mayuscula, 1 miniscula y 1 digito");
        }
    });
    file.addEventListener("change",()=>{// funciona bien
        const selectedFile = file.files[0];
        var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
        if (!re.exec(selectedFile.name)) {
            tieneError("el archivo debe tener extension aprobada por el sistema");
        }else{
            sinError("el archivo es valido");
        }
    });
    email.addEventListener("input",()=>{
        if(validator.contains(email.value,"@") && validator.contains(email.value,".com")){
            sinError("el email es valido");
        }else{
            tieneError("El email debe ser un email valido");
        }
    });
    
    function tieneError(errorString){
            error.classList.replace("alert-success", "alert-danger");
            error.innerHTML = errorString;
            userName.classList.add("is-invalid");
            userName.classList.remove("is-valid");
            submit.setAttribute("disabled", "");

    };
    function sinError(validString){
        error.classList.replace("alert-danger", "alert-success");
            userName.classList.add("is-valid");
            userName.classList.remove("is-invalid");
            error.innerHTML = validString;
            submit.removeAttribute("disabled");
    };

    form.addEventListener("submit",(evt)=>{//funciona bien
        console.log(evt);
        if (hasErrors) {
            evt.preventDefault();
        }
    });
}