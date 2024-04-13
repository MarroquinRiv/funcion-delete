package umg.edu.progra.bst;

import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Walter Cordova
 */
class Ejemplo {
    private static readonly LOGGER = console;

    public static main(): void {
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

        Ejemplo.LOGGER.log("Existe el empleado con id 10:", bst.existe(10)); // true
        Ejemplo.LOGGER.log("Existe el empleado con id 100:", bst.existe(100)); // false

        Ejemplo.LOGGER.log("Empleado con id 43:", bst.obtener(43)); // Empleado{id=43, nombre=Walter Cordova, puesto=IT, despacho=A-255}
        Ejemplo.LOGGER.log("Empleado con id 100:", bst.obtener(100)); // null

        bst.eliminar(10);
        Ejemplo.LOGGER.log("Existe el empleado con id 10 después de eliminarlo:", bst.existe(10)); // false
    }
}

Ejemplo.main();