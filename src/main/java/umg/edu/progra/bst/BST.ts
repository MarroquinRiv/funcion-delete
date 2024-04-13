package umg.edu.progra.bst;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Walter Cordova
 */
class BST<T extends Empleado> {
    private valor: T | null;
    private izdo: BST<T> | null;
    private dcho: BST<T> | null;
    private padre: BST<T> | null;

    constructor() {
        this.valor = null;
        this.izdo = null;
        this.dcho = null;
        this.padre = null;
    }

    insertar(emp: T, padre: BST<T> | null = null): void {
        if (this.valor === null) {
            this.valor = emp;
            this.padre = padre;
        } else {
            if (emp.compareTo(this.valor) < 0) {
                if (this.izdo === null) {
                    this.izdo = new BST<T>();
                }
                this.izdo.insertar(emp, this);
            } else if (emp.compareTo(this.valor) > 0) {
                if (this.dcho === null) {
                    this.dcho = new BST<T>();
                }
                this.dcho.insertar(emp, this);
            } else {
                throw new Error("Insertando elemento duplicado");
            }
        }
    }

    existe(id: number): boolean {
        if (this.valor !== null) {
            if (id === this.valor.getId()) {
                return true;
            } else if (this.izdo !== null && id < this.valor.getId()) {
                return this.izdo.existe(id);
            } else if (this.dcho !== null && id > this.valor.getId()) {
                return this.dcho.existe(id);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    obtener(id: number): T | null {
        if (this.valor !== null) {
            if (id === this.valor.getId()) {
                return this.valor;
            } else if (this.izdo !== null && id < this.valor.getId()) {
                return this.izdo.obtener(id);
            } else if (this.dcho !== null && id > this.valor.getId()) {
                return this.dcho.obtener(id);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    esHoja(): boolean {
        return this.valor !== null && this.izdo === null && this.dcho === null;
    }

    esVacio(): boolean {
        return this.valor === null;
    }

    preOrden(): void {
        this.preordenImpl("");
    }

    postOrden(): void {
        this.postordenImpl("");
    }

    inOrden(): void {
        this.inordenImpl("");
    }

    private inordenImpl(prefijo: string): void {
        if (this.izdo !== null) {
            this.izdo.inOrden();
        }
        console.log(prefijo + this.valor);
        if (this.dcho !== null) {
            this.dcho.inOrden();
        }
    }

    private postordenImpl(prefijo: string): void {
        if (this.izdo !== null) {
            this.izdo.postOrden();
        }
        if (this.dcho !== null) {
            this.dcho.postOrden();
        }
        console.log(prefijo + this.valor);
    }

    private preordenImpl(prefijo: string): void {
        console.log(prefijo + this.valor);
        if (this.izdo !== null) {
            this.izdo.preOrden();
        }
        if (this.dcho !== null) {
            this.dcho.preOrden();
        }
    }

    eliminar(id: number): void {
        if (this.valor !== null) {
            if (id === this.valor.getId()) {
                this.eliminarImpl(id);
            } else if (this.izdo !== null && id < this.valor.getId()) {
                this.izdo.eliminar(id);
            } else if (this.dcho !== null && id > this.valor.getId()) {
                this.dcho.eliminar(id);
            }
        }
    }

    private eliminarImpl(id: number): void {
        if (this.izdo !== null && this.dcho !== null) {
            let sucesor: BST<T> | null = this.dcho;
            while (sucesor.izdo !== null) {
                sucesor = sucesor.izdo;
            }
            this.valor = sucesor.valor;
            this.dcho.eliminar(this.valor.getId());
        } else if (this.izdo !== null || this.dcho !== null) {
            const hijo: BST<T> = (this.izdo !== null) ? this.izdo : this.dcho!;
            if (this.padre !== null) {
                if (this === this.padre.izdo) {
                    this.padre.izdo = hijo;
                } else {
                    this.padre.dcho = hijo;
                }
                hijo.padre = this.padre;
            } else {
                this.valor = hijo.valor;
                this.izdo = hijo.izdo;
                this.dcho = hijo.dcho;
            }
        } else {
            if (this.padre !== null) {
                if (this === this.padre.izdo) {
                    this.padre.izdo = null;
                } else {
                    this.padre.dcho = null;
                }
            } else {
                this.valor = null;
            }
        }
    }
}