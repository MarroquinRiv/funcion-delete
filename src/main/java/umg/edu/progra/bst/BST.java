package umg.edu.progra.bst;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Walter Cordova
 */
public class BST implements IBST<Empleado> {

    private static final Logger LOGGER = LoggerFactory.getLogger(BST.class);

    private Empleado valor;
    private BST izdo, dcho;
    private BST padre;

//    @Override
//    public void insertar(Empleado emp) {
//        if (valor == null) {
//            this.valor = emp;
//        } else {
//            if (emp.compareTo(valor) < 0) {
//                if (izdo == null) {
//                    izdo = new BST();
//                }
//                izdo.insertar(emp);
//            } else if (emp.compareTo(valor) > 0) {
//                if (dcho == null) {
//                    dcho = new BST();
//                }
//                dcho.insertar(emp);
//            } else {
//                throw new RuntimeException("Insertando elemento duplicado");
//            }
//        }
//    }
    private void insertarImp(Empleado emp, BST padre) {
        if (valor == null) {
            this.valor = emp;
            this.padre = padre;
        } else {
            if (emp.compareTo(valor) < 0) {
                if (izdo == null) {
                    izdo = new BST();
                }
                izdo.insertarImp(emp, this);
            } else if (emp.compareTo(valor) > 0) {
                if (dcho == null) {
                    dcho = new BST();
                }
                dcho.insertarImp(emp, this);
            } else {
                throw new RuntimeException("Insertando elemento duplicado");
            }
        }
    }

    @Override
    public void insertar(Empleado emp) {
        insertarImp(emp, null);
    }

    @Override
    public boolean existe(int id) {
        if (valor != null) {
            if (id == valor.getId()) {
                return true;
            } else if (izdo != null && id < valor.getId()) {
                return izdo.existe(id);
            } else if (dcho != null && id > valor.getId()) {
                return dcho.existe(id);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public Empleado obtener(int id) {
        if (valor != null) {
            if (id == valor.getId()) {
                return valor;
            } else if (izdo != null && id < valor.getId()) {
                return izdo.obtener(id);
            } else if (dcho != null && id > valor.getId()) {
                return dcho.obtener(id);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public boolean esHoja() {
        return valor != null && izdo == null && dcho == null;
    }

    @Override
    public boolean esVacio() {
        return valor == null;
    }

    @Override
    public void preOrden() {
        preordenImpl("");
    }

    @Override
    public void postOrden() {
        postordenImpl("");
    }

    @Override
    public void inOrden() {
        inordenImpl("");
    }

    private void inordenImpl(String prefijo) {
        if (izdo != null) {
            izdo.inordenImpl(prefijo + "  ");
        }
        LOGGER.info("{}", prefijo + valor);
        if (dcho != null) {
            dcho.inordenImpl(prefijo + "  ");
        }
    }

    private void postordenImpl(String prefijo) {
        if (izdo != null) {
            izdo.postordenImpl(prefijo + "  ");
        }
        if (dcho != null) {
            dcho.postordenImpl(prefijo + "  ");
        }
        LOGGER.info("{}", prefijo + valor);
    }

    private void preordenImpl(String prefijo) {
        if (valor != null) {
            LOGGER.info("{}", prefijo + valor);
            if (izdo != null) {
                izdo.preordenImpl(prefijo + "  ");
            }
            if (dcho != null) {
                dcho.preordenImpl(prefijo + "  ");
            }
        }
    }

    private void eliminarImpl(int id) {
        if (izdo != null && dcho != null) {
            // Caso 1: el nodo tiene dos hijos
            // Encontrar el sucesor inmediato en el subárbol derecho
            BST sucesor = dcho;
            while (sucesor.izdo != null) {
                sucesor = sucesor.izdo;
            }
            // Copiar el valor del sucesor al nodo actual
            valor = sucesor.valor;
            // Eliminar el sucesor recursivamente
            dcho.eliminarImpl(sucesor.valor.getId());
        } else if (izdo != null || dcho != null) {
            // Caso 2: el nodo tiene un solo hijo
            BST hijo = (izdo != null) ? izdo : dcho;
            if (padre != null) {
                // Enlazar el hijo con el padre del nodo actual
                if (this == padre.izdo) {
                    padre.izdo = hijo;
                } else {
                    padre.dcho = hijo;
                }
                hijo.padre = padre;
            } else {
                // El nodo actual es la raíz
                valor = hijo.valor;
                izdo = hijo.izdo;
                dcho = hijo.dcho;
            }
        } else {
            // Caso 3: el nodo es una hoja
            if (padre != null) {
                // Eliminar el nodo según su posición respecto al padre
                if (this == padre.izdo) {
                    padre.izdo = null;
                } else {
                    padre.dcho = null;
                }
            } else {
                // El nodo es la raíz del árbol
                valor = null;
            }
        }
    }

    @Override
    public void eliminar(int id) {
        if (valor != null) {
            if (id == valor.getId()) {
                //eliminar valor
                eliminarImpl(id);
            } else if (izdo != null && id < valor.getId()) {
                izdo.eliminarImpl(id);
            } else if (dcho != null && id > valor.getId()) {
                dcho.eliminarImpl(id);
            }
        }
    }

}
