package umg.edu.progra.bst;

/**
 *
 * @author Walter Cordova
 */
class Empleado {
    private id: number;
    private nombre: string;
    private puesto: string;
    private despacho: string;

    constructor(id: number, nombre: string, puesto: string, despacho: string) {
        this.id = id;
        this.nombre = nombre;
        this.puesto = puesto;
        this.despacho = despacho;
    }

    toString(): string {
        return `Empleado{id=${this.id}, nombre=${this.nombre}, puesto=${this.puesto}, despacho=${this.despacho}}`;
    }

    getId(): number {
        return this.id;
    }

    compareTo(emp: Empleado): number {
        if (this.id === emp.getId()) {
            return 0;
        } else if (this.id < emp.getId()) {
            return -1;
        } else {
            return 1;
        }
    }
}

const e1 = new Empleado(43, "Walter Cordova", "IT", "A-255");
const e2 = new Empleado(10, "Roxana Escobar", "RRHH", "A-255");
const e3 = new Empleado(8, "Bryan Orellana", "Ventas", "A-255");
const e4 = new Empleado(53, "Mario Ruano", "Logistica", "A-255");
const e5 = new Empleado(15, "Salazar Bitsco", "IT", "A-255");
const e6 = new Empleado(50, "Jonny Bravo", "RRHH", "A-255");
const e7 = new Empleado(54, "Sergio Espinoza", "Marketing", "A-255");
const e8 = new Empleado(25, "Belter Hernandez", "Contabilidad", "A-255");

const bst = new BST<Empleado>();
bst.insertar(e1);
bst.insertar(e2);
bst.insertar(e3);
bst.insertar(e8);

console.log("Existe el empleado con id 10:", bst.existe(10)); // true
console.log("Existe el empleado con id 100:", bst.existe(100)); // false

console.log("Empleado con id 43:", bst.obtener(43)); // Empleado{id=43, nombre=Walter Cordova, puesto=IT, despacho=A-255}
console.log("Empleado con id 100:", bst.obtener(100)); // null

bst.eliminar(10);
console.log("Existe el empleado con id 10 después de eliminarlo:", bst.existe(10)); // false