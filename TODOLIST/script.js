let header = document.getElementById("header");
let footer = document.getElementById("footer");
let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let section3 = document.getElementById("section3");
let section4 = document.getElementById("section4");
let saludo = document.getElementById("saludo");
let masBtn = document.getElementById("masBtn");
let volver2 = document.getElementById("volver2");
let tmBtn = document.getElementById("tmBtn");
let addTarea = document.getElementById("addTarea");
let clases = document.getElementById("clases");
let desc = document.getElementById("desc");
let listContainer = document.getElementById("listContainer");
let checkedBox = document.getElementById("checkedBox");
let uncheckedBox = document.getElementById("uncheckedBox");
let tituloTarea = document.getElementById(" tituloTarea");
let txtDesc = document.getElementById("txtDesc");
let divImgTarea = document.getElementById("div__tarea__img");

let tareas = [];
let cantidad = 0;

let historial = JSON.parse(localStorage.getItem("tareasLocales"));

if (historial.length > 0) {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "flex";
  section4.style.display = "none";

  tareas = historial;
  cantidad = localStorage.getItem("cantidad");

  render();
}

if (tareas.length > 0) {
  const frases = [
    '"El único modo de hacer un gran trabajo es amar lo que haces." ',
    '"La vida es lo que pasa mientras estás ocupado haciendo otros planes." ',
    '"El éxito es la suma de pequeños esfuerzos repetidos día tras día." ',
    '"No importa lo lento que vayas, siempre y cuando no te detengas." ',
    '"El secreto del cambio es enfocar toda tu energía no en luchar contra lo viejo, sino en construir lo nuevo." ',
    '"El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." ',
    '"La mejor manera de predecir el futuro es crearlo." ',
    '"El único lugar donde el éxito viene antes que el trabajo es en el diccionario." ',
    '"No te preocupes por los fracasos, preocúpate por las posibilidades que pierdes cuando ni siquiera lo intentas." ',
    '"Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden." ',
    '"No cuentes los días, haz que los días cuenten." ',
    '"El que nunca ha cometido un error nunca ha intentado nada nuevo." ',
    '"No busques errores, busca soluciones." ',
    '"Tu tiempo es limitado, así que no lo desperdicies viviendo la vida de alguien más." ',
  ];

  const random = Math.floor(Math.random() * 13);
  let nombre = prompt("Ingresá tu nombre");
  const saludito = () => {
    saludo.innerHTML += `Hola <span id="name"> ${nombre}: </span> <br><br> ${frases[random]}`;
  };
  if (nombre == "") {
    alert("Ingresa tu nombre porfa");
  } else {
    saludito(nombre);
  }
}

const crearTarea = () => {
  let emojiclase;

  if (clases.value == "Hogar") {
    emojiclase = "https://img.icons8.com/plasticine/40/futurama-bender.png";
  }
  if (clases.value == "Trabajo") {
    emojiclase = "https://img.icons8.com/plasticine/40/rick-sanchez.png";
  }
  if (clases.value == "Entretenimiento") {
    emojiclase = "https://img.icons8.com/plasticine/40/homer-simpson.png";
  }
  if (clases.value == "Otros") {
    emojiclase = "https://img.icons8.com/plasticine/40/jake.png";
  }

  cantidad++;

  let tarea = {
    n: tareas.length,
    nombre: addTarea.value,
    clase: emojiclase,
    descripcion: desc.value,
    estado: false,
  };

  tareas.push(tarea);
};

function render() {
  listContainer.innerHTML = "";

  tareas.map((tarea) => {
    let templateTarea = "";

    if (tarea.estado == false) {
      templateTarea = `<li id="tarea-${tarea.n}" class="unchecked" ><span class="span" onclick="verTarea(${tarea.n})">
                        <img class="iconosTareas" src="${tarea.clase}" />
                        <h4 class="txtTareas"> ${tarea.nombre} </h4>
                        <p class="txtTareas"> ${tarea.descripcion} </p></span><img class="checkBox" 
                            src="https://img.icons8.com/plasticine/100/unchecked-checkbox.png"
                            alt="unchecked-checkbox" onclick="tachar(${tarea.n},${tarea.estado})" /><img class="deleteBox"
                            src="https://img.icons8.com/plasticine/100/delete.png" alt="delete" onclick="borrarTarea(${tarea.n})"/>
                    </li>`;
    } else {
      templateTarea = `<li id="tarea-${tarea.n}" class="checked"><span class="span" onclick="verTarea(${tarea.n})">
                        <img class="iconosTareas" src="${tarea.clase}" />
                        <h4 class="txtTareas"> ${tarea.nombre} </h4>
                        <p class="txtTareas"> ${tarea.descripcion} </p></span><img class="checkBox" 
                            src="https://img.icons8.com/plasticine/100/checked-checkbox.png"
                            alt="unchecked-checkbox" onclick="tachar(${tarea.n},${tarea.estado})" /><img class="deleteBox"
                            src="https://img.icons8.com/plasticine/100/delete.png" alt="delete" onclick="borrarTarea(${tarea.n})"/>
                    </li>`;
    }

    listContainer.innerHTML += templateTarea;
  });

  addTarea.value = "";
  clases.value = "Hogar";
  desc.value = "";
}

const renderTareaDetalle = (tarea) => {
  section4.innerHTML = `<div id="" class="div__tareas"> 
    <img id="closeIcon" src="https://img.icons8.com/plasticine/100/cancel.png"
                  alt="cancel" onclick="cerrarTarea()" />
              <h4 id="tarea-${tarea.n}" class="tituloTarea">${tarea.nombre}</h4>

              <div id="div__tarea__img" class="txtTareas"> <img src=${
                tarea.clase
              }></div>

              <div id="div__desc--tarea" class="tareita">
                  <p id="txtDesc" class="txtTareas"> ${tarea.descripcion}</p>
              </div>
              <div class="div__tareas--icon">
                  <img id="uncheckSect4" src=${
                    tarea.estado == false
                      ? "https://img.icons8.com/plasticine/100/unchecked-checkbox.png"
                      : "https://img.icons8.com/plasticine/100/checked-checkbox.png"
                  }
                      alt="unchecked-checkbox" onclick="tachar(${tarea.n},${
    tarea.estado
  })" />
                  <img id="deleteSect4" src="https://img.icons8.com/plasticine/100/delete.png" alt="delete"
                      onclick="eliminarTarea()" />
              </div>
              </div>`;
};

let tachar = (id) => {
  tarea = tareas[encontrar(id)];
  tareas[encontrar(id)].estado = !tareas[encontrar(id)].estado;

  render();
  renderTareaDetalle(tarea);

  localStorage.setItem("tareasLocales", JSON.stringify(tareas));
  localStorage.setItem("conteo", cantidad);
};

let encontrar = (id) => {
  let posicion = tareas.findIndex((tarea) => tarea.n === id);
  return posicion;
};

const borrarTarea = (posicion) => {
  tareas.splice(posicion, 1);
  listContainer.innerHTML = "";

  render();

  if (tareas.length == 0) {
    section1.style.display = "flex";
    section2.style.display = "none";
    section3.style.display = "none";
    section4.style.display = "none";
  }

  localStorage.setItem("tareasLocales", JSON.stringify(tareas));
  localStorage.setItem("conteo", cantidad);
};

const verTarea = (tarea) => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "flex";

  tarea = tareas[encontrar(tarea)];

  renderTareaDetalle(tarea);
};

const cerrarTarea = () => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "flex";
  section4.style.display = "none";
};

const eliminarTarea = (posicion) => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "flex";
  section4.style.display = "none";
  borrarTarea();
};

masBtn.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "flex";
  section3.style.display = "none";
});

volver2.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "flex";
  section3.style.display = "none";
});

const agregarTarea = () => {
  if (addTarea.value == "" || clases.value == "" || desc.value == "") {
    alert("Por favor rellena los campos");
  } else {
    crearTarea();
    render();
    section1.style.display = "none";
    section2.style.display = "none";
    section3.style.display = "flex";
  }
  localStorage.setItem("tareasLocales", JSON.stringify(tareas));
  localStorage.setItem("conteo", cantidad);
};
