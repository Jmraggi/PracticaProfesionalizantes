//------------------ DECLARACION DE VARIABLES -----------------------
let carrito = [];

let listaCarrito = document.getElementById("listaCarrito");
let valorFinal = document.getElementById("precio");
let valorTotal = document.getElementById("precioFinal");

const lista = document.querySelector("#listado");
let productos = [];

let cards = document.getElementById("cartaProducto");

//----------------- CARTAS DE PRODUCTOS -------------------

$(document).ready(function () {
    $('#carrito-btn').click(function () {
        $('#carrito').toggle();
    });

    fetch("./ventas.json")
        .then((res) => res.json())
        .then((data) => {
            productos = data;

            data.forEach((producto) => {
                let card = document.createElement("div");
                card.className = "col-sm-3 py-5";
                card.innerHTML = `
                <div class="card border-dark text-center">
                  <img src="${producto.img}" class="img-thumbnail" alt="..">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button id="compra" onclick="compra(${producto.id})" class="btn btn-primary">Comprar</button>
                    </div>
                </div>
                `;
                cards.append(card);
            });
        });
});

const determinarImagenMasPequena = (producto) => {
    return producto.img; 
}

const compra = (productoId) => {
    let productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        let producto = productos.find(p => p.id === productoId);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    renderizarCarrito();
}

const aumentarCantidad = (productoId) => {
    let productoExistente = carrito.find(item => item.id === productoId);
    if (productoExistente) {
        productoExistente.cantidad++;
        renderizarCarrito();
    }
}

const disminuirCantidad = (productoId) => {
    let productoExistente = carrito.find(item => item.id === productoId);
    if (productoExistente && productoExistente.cantidad > 1) {
        productoExistente.cantidad--;
        renderizarCarrito();
    }
}

const eliminarProducto = (productoId) => {
    carrito = carrito.filter(item => item.id !== productoId);
    renderizarCarrito();
}

const renderizarCarrito = () => {
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        let imagen = determinarImagenMasPequena(producto);

        let table = document.createElement("div");
        table.classList.add("carro");
        table.innerHTML = `
        <div class="card mb-0" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6">
              <div class="card-body" style="color: black;">
                <h2 class="card-title">${producto.nombre}</h2>
                <p class="card-text" style="font-size: 15px;">Calidad: ${producto.calidad}</p>
                <p class="card-text" style="font-size: 15px;">Precio: $${producto.precio}</p>
                <p class="card-text" style="font-size: 15px;">Cantidad: ${producto.cantidad}</p>
              </div>
            </div>
            <div class="col-md-3">
              <button onclick="aumentarCantidad(${producto.id})" class="btn btn-primary">+</button>
              <button onclick="disminuirCantidad(${producto.id})" class="btn btn-danger">-</button>
              <button onclick="eliminarProducto(${producto.id})" class="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
        `;
        listaCarrito.appendChild(table);
    });

    const comprarBtn = document.createElement("button");
    comprarBtn.id = "comprarBtn";
    comprarBtn.className = "btn btn-success";
    comprarBtn.textContent = "COMPRAR";
    comprarBtn.addEventListener("click", () => {
        swal.fire({
            title: 'En Mantenimiento',
            text: '¡La función de compra está en mantenimiento en este momento!',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    });
    listaCarrito.appendChild(comprarBtn);

    let total = carrito.reduce((acc, item) => {
        return acc + item.precio * item.cantidad;
    }, 0);
    valorTotal.innerHTML = `
    <h2 style="color: white;">Total de compra = $${total.toFixed(2)}</h2>
    `;
}