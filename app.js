// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.


//Debe permitir agregar nombres a travez de un campo de texto y un boton añadir
//los nombre registrados se deben guardar en un array y se debe listar en pantalla
//Validar los datos vacios, y mostrarlo en pantalla mostrando el mensaje "Debe ingresar un nombre valido" - utilizar SwetAlert
//Al dar clic en el boton sortear amigos, deberá escoger un nombre aleatorio


// Array para almacenar los nombres de los participantes
let amigos = [];

// Función para agregar nombres a la lista
function agregarAmigo() {
    const inputNombre = document.getElementById("amigo");
    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe ingresar un nombre válido",
        });
        return;
    }

    if (amigos.includes(nombre)) {
        Swal.fire({
            icon: "warning",
            title: "Nombre duplicado",
            text: "Este nombre ya ha sido agregado.",
        });
        return;
    }

    amigos.push(nombre);
    amigos.sort(); // Ordena la lista alfabéticamente
    inputNombre.value = ""; // Limpiar el campo de entrada
    mostrarLista();
}

// Función para mostrar la lista de amigos en pantalla con alineación correcta
function mostrarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        // Contenedor con flexbox para alinear elementos
        const divAmigo = document.createElement("div");
        divAmigo.style.display = "flex";
        divAmigo.style.alignItems = "center";
        divAmigo.style.justifyContent = "space-between";
        divAmigo.style.marginBottom = "5px";
        divAmigo.style.width = "250px";

        const spanNombre = document.createElement("span");
        spanNombre.textContent = amigo;
        spanNombre.style.flexGrow = "1";

        // Botón para eliminar un nombre individualmente
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.style.border = "none";
        btnEliminar.style.backgroundColor = "transparent";
        btnEliminar.style.cursor = "pointer";
        btnEliminar.style.fontSize = "18px";

        // Se corrige la referencia a eliminarAmigo
        btnEliminar.addEventListener("click", () => eliminarAmigo(index));

        divAmigo.appendChild(spanNombre);
        divAmigo.appendChild(btnEliminar);
        lista.appendChild(divAmigo);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    mostrarLista();
}

// Función para sortear un amigo aleatoriamente y eliminarlo de la lista
function sortearAmigo() {
    let resultadoContainer = document.getElementById("resultado");
    resultadoContainer.innerHTML = ""; // Limpia los mensajes previos

    if (amigos.length < 2) {
        Swal.fire({
            icon: "warning",
            title: "Juego terminado",
            text: "No hay suficientes participantes para continuar. La lista se limpiará.",
        }).then(() => {
            amigos = []; // Vaciar la lista
            resultadoContainer.innerHTML = ""; // Limpiar mensaje de resultado
            mostrarLista();
        });
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];

    // Eliminar el nombre sorteado antes de validar si quedan nombres
    amigos.splice(indiceAleatorio, 1);

    // Mostrar el nombre del amigo secreto antes de la validación final
    Swal.fire({
        icon: "success",
        title: "¡Amigo Secreto Sorteado!",
        text: `El amigo secreto es: ${amigoSorteado}`,
    }).then(() => {
        resultadoContainer.innerHTML = `<p style="color:green; font-weight:bold;">El amigo secreto es: ${amigoSorteado}</p>`;

        if (amigos.length < 2) {
            Swal.fire({
                icon: "info",
                title: "Juego completado",
                text: "No quedan suficientes amigos para seguir sorteando. La lista se limpiará.",
            }).then(() => {
                amigos = []; // Vaciar la lista
                resultadoContainer.innerHTML = ""; // Limpiar mensaje del amigo secreto
                mostrarLista();
            });
        }
    });

    mostrarLista();
}