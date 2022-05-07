/** Crear interfaces y clases para definir esta situación:

Tenemos una ciudad con varias CASAS , estas pueden ser compradas por distintas PERSONAS.
 De las casas necesitamos guardar la información de su superficie, precio, número de habitaciones, número de baños, tipo de casa (chalet, piso o duplex),
 si la casa está en venta, y su propietario/s en caso de que los tenga.
 De las personas necesitamos conocer su nombre, su edad, el dinero del que disponen, su DNI y su estado civil,
 en caso de que las personas estén casadas además necesitamos conocer su pareja.

Habrá 2 acciones que sea posible realizar:

- Comprar una casa: En caso de que una casa sea adquirida deberá dejar de estar en venta y se deberá registrar su propietario o propietarios.
- Casarse: 2 personas podrán casarse si no están ya casados con otra persona. Se deberá registrar su nueva pareja y cambiar su estado civil.

Se deberán crear las clases e interfaces necesarias para poder definir las distintas personas y casas.
Además las clases deberán contener los métodos necesarios para que se puedan realizar las acciones descritas.
Se deberá intentar utilizar tipos personalizados y herencia de clases. */
/** Enumeración con los tipos de casa, completar */
var TipoCasa;
(function (TipoCasa) {
    TipoCasa["CHALET"] = "chalet";
    TipoCasa["PISO"] = "piso";
    TipoCasa["DUPLEX"] = "duplex";
})(TipoCasa || (TipoCasa = {}));
/** Enumeración con los tipos de estado civil, completar */
var EstadoCivil;
(function (EstadoCivil) {
    EstadoCivil["CASADO"] = "casado";
    EstadoCivil["SOLTERO"] = "soltero";
})(EstadoCivil || (EstadoCivil = {}));
/** Clase casa, completar con atributos que faltan */
var Casa = /** @class */ (function () {
    function Casa(superficien, precio, habitaciones, baños, tipoCasa) {
        this.superficien = superficien;
        this.precio = precio;
        this.habitaciones = habitaciones;
        this.baños = baños;
        this.tipoCasa = tipoCasa;
        // La casa empieza sin propietarios
        this.propietarios = [];
        // La casa al principio está en venta
        this.enVenta = true;
    }
    /** Función para comprar una casa, añadir lógica para que no se compre una casa si los compradores no disponen del dinero suficiente */
    Casa.prototype.comprar = function (compradores) {
        var dinero = 0;
        compradores.forEach(function (comprador) {
            dinero += comprador.dinero;
        });
        // Si está en venta se permite comprarla (añadir condición para que los compradores tengan el dinero)
        if (!this.enVenta) {
            return console.log("ERROR: La casa no está en venta");
        }
        if (dinero < this.precio) {
            return console.log("ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa.");
        }
        // Se actualizan propietarios
        this.propietarios = compradores;
        // La casa deja de estar en venta.
        this.enVenta = false;
        // y restar de su dinero el precio de la casa si la compran.
        var partes = this.precio / compradores.length;
        compradores.forEach(function (comprador) {
            comprador.dinero -= partes;
        });
        console.log("compradores compraron esta casa.");
    };
    return Casa;
}());
/** Clase persona, completar con atributos y constructor */
var Persona = /** @class */ (function () {
    function Persona(nombre, edad, dinero, dni, estadoCivil) {
        this.nombre = nombre;
        this.edad = edad;
        this.dinero = dinero;
        this.dni = dni;
        this.estadoCivil = estadoCivil;
    }
    /** Implementar lógica para actualizar el estado civil de ambas personas y su pareja
     * Se deberá comprobar que las 2 personas estén solteras antes de casarlos.
     */
    Persona.prototype.casarse = function (persona) {
        if (persona.estadoCivil === EstadoCivil.SOLTERO &&
            this.estadoCivil === EstadoCivil.SOLTERO) {
            this.estadoCivil = EstadoCivil.CASADO;
            persona.estadoCivil = EstadoCivil.CASADO;
            this.pareja = persona;
            persona.pareja = this;
        }
        else {
            console.log("ERROR: La persona ya está casada");
        }
    };
    return Persona;
}());
/** Crear las personas y casas que se desee y hacer pruebas (se valorará que se creen nuevas pruebas inventadas) */
//  Este es un ejemplo de como debería funcionar el programa una vez haya sido terminado, los comentarios a la derecha de cada línea de código describen el resultado que se debe
//  mostrar al usuario por consola:
var juan = new Persona("Juan", 32, 50000, "54672398L", EstadoCivil.SOLTERO);
var maria = new Persona("María", 34, 125000, "34568910T", EstadoCivil.SOLTERO);
var paula = new Persona("Paula", 27, 195000, "34589921D", EstadoCivil.SOLTERO);
var chalet1 = new Casa(152, 160000, 3, 2, TipoCasa.CHALET);
var piso1 = new Casa(68, 60000, 2, 1, TipoCasa.PISO);
maria.casarse(juan); // Debería funcionar correctamente.
maria.casarse(paula); // Debería imprimir en consola el error "ERROR: La persona ya está casada".
chalet1.comprar([juan, maria]); // Debería comprar el chalet correctamente al tener entre los dos suficiente dinero
console.log(juan.dinero, maria.dinero);
piso1.comprar([juan]); // ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa.
console.log(juan.dinero, maria.dinero);
console.log(juan.estadoCivil); // casado
console.log(paula.estadoCivil); // soltero
console.log(chalet1.enVenta); // false
console.log(piso1.enVenta); //true
