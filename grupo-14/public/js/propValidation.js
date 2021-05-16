//error box
window.onload = () =>{
    const description = document.getElementById("descripcion");
    const name = document.getElementById("name");
    const file = document.getElementById("archivo");
    const error = document.getElementById("error");
    const submit = document.getElementById("submit");
    
    name.addEventListener("input",()=>{
        if(!validator.isLength(name.value,{min:5,max:255})){
            tieneError("El nombre debe tener entre 2 y 255 caracteres");
        }else{
            sinError("el nombre es valido");
        }
        
    });

    description.addEventListener("input",()=>{
        if(!validator.isLength(description.value,{min:20,max:255})){
            tieneError("La descripcion debe tener entre 20 y 255 caracteres");
        }else{
            sinError("la descripcion es valida");
        }
        
    });
    file.addEventListener("change",()=>{// funciona bien
        const selectedFile = file.files[0];
        var regex = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
        if (!regex.exec(selectedFile.name)) {
            tieneError("el archivo debe tener extension aprobada por el sistema");
        }else{
            sinError("el archivo es valido");
        }
    });

    function tieneError(errorString){
        error.classList.replace("alert-success", "alert-danger");
        error.innerHTML = errorString;
        submit.setAttribute("disabled", "");
    };
    function sinError(validString){
        error.classList.replace("alert-danger", "alert-success");
            error.innerHTML = validString;
            submit.removeAttribute("disabled");
    };
    }