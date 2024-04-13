import BST from './BST';
import Empleado from './Empleado';

describe('Binary Search Tree', () => {
  let bst: BST<Empleado>;

  beforeEach(() => {
    bst = new BST<Empleado>();
  });

  it('should insert and retrieve employees correctly', () => {
    const e1 = new Empleado(43, "Walter Cordova", "IT", "A-255");
    const e2 = new Empleado(10, "Roxana Escobar", "RRHH", "A-255");

    bst.insertar(e1);
    bst.insertar(e2);

    expect(bst.existe(43)).toBeTruthy();
    expect(bst.existe(10)).toBeTruthy();
    expect(bst.existe(100)).toBeFalsy();

    expect(bst.obtener(43)).toEqual(e1);
    expect(bst.obtener(10)).toEqual(e2);
    expect(bst.obtener(100)).toBeNull();
  });

  it('should delete employee correctly', () => {
    const e1 = new Empleado(43, "Walter Cordova", "IT", "A-255");
    const e2 = new Empleado(10, "Roxana Escobar", "RRHH", "A-255");

    bst.insertar(e1);
    bst.insertar(e2);

    bst.eliminar(43);
    expect(bst.existe(43)).toBeFalsy();
    expect(bst.obtener(43)).toBeNull();
  });
});
