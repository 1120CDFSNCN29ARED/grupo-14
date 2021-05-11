const { format } = require("sequelize/types/lib/utils");
const { validator } = require("sequelize/types/lib/utils/validator-extras");
const error = document.getElementById("error");
const password = document.getElementById("password");
const lastName = document.getElementById("user-lastname");
const email = document.getElementById("user-email");
const submit = document.getElementById("submit-button");
const form = document.getElementById("form");
const file = document.getElementById("imagen-user");
window.onload = () =>{
    let hasErrors = false;
    const userName = document.getElementById("user-name");
    userName.addEventListener("input",()=>{
        if(validator.isLength(userName.value,{min:2,max:255})){
            error.innerHTML = "El nombre debe tener entre 3 y 255 caracteres";
            hasErrors = true;
        }
    });
    lastName.addEventListener("input",()=>{
        if(validator.isLength(lastName.value,{min:2,max:255})){
            error.innerHTML = "El Lastname debe tener entre 3 y 255 caracteres";
            hasErrors = true;
        }
    });
    password.addEventListener("input",()=>{
        regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
        if(validator.isLength(title.value,{min:8,max:255}) || regex.exec(password.value)){
            error.innerHTML = "La contraseña debe ser de minimo 8 caracteres, con al menos 1 mayuscula, 1 miniscula y 1 digito";
            hasErrors = true;
        }
    });
    email.addEventListener("input",()=>{
        if(!validator.contains(email.value,"@") || !validator.contains(email.value,".com")){
            error.innerHTML = "El email debe ser un email valido";
            hasErrors = true;
        }
    });
    if(hasErrors){
        submit.setAttribute("disabled",""); //chequear si esto funciona, porque como estamos onLoad, capaz solo se ejecuta esa vez y no por cada event listener
    }
    form.addEventListener("submit",(evt)=>{
        console.log(evt);
        if (hasErrors) {
            evt.preventDefault();
        }
    });
    file.addEventListener("change",()=>{
        const selectedFile = file.files[0];
        var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
        if (!re.exec(selectedFile.value)) {//testear esto tengo mis dudas
            error.innerHTML = "el archivo debe tener extension aprobada por el sistema";
        }
    });


};

   // const titleValidations = (evt) => {
    //     error.classList.remove("d-none");
    //     hasErrors = false;
    //     error.innerHTML = "";

    //     if (!validator.isLength(title.value, { min: 8, max: 255 })) {
    //         error.classList.replace("alert-success", "alert-danger");
    //         error.innerHTML += "<li>Debe tener entre 8 y 255 carácteres</li>";
    //         hasErrors = true;
    //     }
    //     if (validator.contains(title.value, "@")) {
    //         error.classList.replace("alert-success", "alert-danger");
    //         error.innerHTML += "<li>No puede contener @</li>";
    //         hasErrors = true;
    //     }

    //     if (!hasErrors) {
    //         error.classList.replace("alert-danger", "alert-success");
    //         title.classList.add("is-valid");
    //         title.classList.remove("is-invalid");
    //         error.innerHTML = "El titulo es válido ✔";
    //         submitButton.removeAttribute("disabled");
    //     } else {
    //         title.classList.add("is-invalid");
    //         title.classList.remove("is-valid");
    //         submitButton.setAttribute("disabled", "");
    //     }
    // };

    // title.addEventListener("input", titleValidations);