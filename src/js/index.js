window.onload = () => {
    firebase.database().ref("publicaciones")
        .on("child_added", (newPublicacion) => {
            contenido.innerHTML = `
            <div id="publicacion-${newPublicacion.key}">
                <div class="row">
                    <div class="col-12 comment rounded">
                        <p>${newPublicacion.val().publicacionURL}</p>      
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button class="float-right" onclick="deleteText('${newPublicacion.key}')">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="menuSeparador"></div>
            </div>
   
        ` + contenido.innerHTML;
        });
};

//Para que al publicar se borre lo escrito en text área
const boton = document.getElementById('sendText');
boton.addEventListener('click', () => {
    let comments = document.getElementById('textArea').value;
    document.getElementById('textArea').value = '';
});

// Para validar texto
function validarTexto() {
    const entradaDeTexto = textArea.value;
    if (!entradaDeTexto.replace(/\s/g, '').length) {
        alert("Tu mensaje no puede estar vacío")
    } else {
        sendText()
    }
};

// Para publicar texto
function sendText() {
    const textValue = textArea.value;
    const newTextKey = firebase.database().ref().child("publicaciones").push().key;

    firebase.database().ref(`publicaciones/${newTextKey}`).set({
        publicacionURL: textValue
    });
}


// funcion borrar publicaciones
function deleteText(key) {
    firebase.database().ref(`publicaciones/${key}`).remove()
    const publi = document.getElementById("publicacion-" + key);
    publi.remove();
    alert("¡Tu comentario ha sido eliminado!", {
        icon: "success",
    });
}


