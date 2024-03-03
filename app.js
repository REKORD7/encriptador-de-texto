let textoInsertado = document.getElementById("texto-insertado");
let mensajeEncriptado = document.getElementById("texto-a-copiar");

const llavesDeEncriptacion = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];


/*Botonoes*/
function btnEncriptar(){
    if(validarTexto(textoInsertado)){
        cambioVisualizacion("seccion-imagen","none");
        cambioVisualizacion("seccion-copiar","block");
        llenarTextarea(encriptar(textoInsertado.value));
    }else{
        cambioVisualizacion("seccion-imagen","block");
        cambioVisualizacion("seccion-copiar","none");
        alert("Favor de ingresar solo letras minusculas sin caracteres especiales.");
    }
}

function btnDesencriptar(){
    if(validarTexto(textoInsertado)){
        cambioVisualizacion("seccion-imagen","none");
        cambioVisualizacion("seccion-copiar","block");
        llenarTextarea(desencriptar(textoInsertado.value));
    }else{
        cambioVisualizacion("seccion-imagen","block");
        cambioVisualizacion("seccion-copiar","none");
        alert("Favor de ingresar solo letras minusculas sin caracteres especiales.");
    }
}

//boton para copiar texto en segunda seccion asincrono
async function btnCopiar(){
    try{
        await navigator.clipboard.writeText(mensajeEncriptado.value);
        console.log("Texto copiado con exito");
        textoInsertado.focus();
    }catch(error){
        console.error(`Ha ocurrido un error al copiar: ${error}`)
    }
}

/*Funciones de los botones*/
function encriptar(textoInsertado){
    for(let i=0; i < llavesDeEncriptacion.length; i++){
        if(textoInsertado.includes(llavesDeEncriptacion[i][0])){
            textoInsertado = textoInsertado.replaceAll(
                llavesDeEncriptacion[i][0],
                llavesDeEncriptacion[i][1]
            );
        }
    }
    return textoInsertado;
}


function desencriptar(textoInsertado){
    for(let i=0; i < llavesDeEncriptacion.length; i++){
        if(textoInsertado.includes(llavesDeEncriptacion[i][1])){
            textoInsertado = textoInsertado.replaceAll(
                llavesDeEncriptacion[i][1],
                llavesDeEncriptacion[i][0]
            );
        }
    }
    return textoInsertado;
}

function validarTexto(textoInsertado){
    return /^(?=[a-z!@#$%^&*()_+\-=\[\]{}])[a-z!@#$%^&*()_+\-=\[\]{}\s]+$/.test(
        textoInsertado.value.trim()
      )
        ? true
        : false || textoInsertado.focus();
}

/*Funciones para visualizacion en pagina*/
function cambioVisualizacion(attribute, display){
    document.getElementById(attribute).style.display = display;
}

function llenarTextarea(texto){
    mensajeEncriptado.value = texto;
    textoInsertado.value = "";
}