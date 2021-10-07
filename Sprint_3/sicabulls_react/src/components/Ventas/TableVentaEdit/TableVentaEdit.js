import React from 'react'
import './TableVentaEdit.css'
import MOCK_DATA from '../MOCK_DATA.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap"
import ReactModal from 'react-modal';


//estilos del modal 
const customStyles = {
    overlay: { zIndex: 1000 }
};


//constantes de clase
const data = MOCK_DATA;
//ssadsdada



class TableVentaEdit extends React.Component {
    //Estado
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id_venta: "",
            id_vendedor: "",
            nombre_cliente: "",
            fecha: "",
            iva: "",
            valor_venta: ""

        },
    };
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };
    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };
    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.forEach((registro) => {
            if (dato.id_venta === registro.id_venta) {
                arreglo[contador].id_vendedor = dato.id_vendedor;
                arreglo[contador].nombre_cliente = dato.nombre_cliente;
                arreglo[contador].fecha = dato.fecha;
                arreglo[contador].iva = dato.iva;
                arreglo[contador].valor_venta = dato.valor_venta;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };
    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.forEach((registro) => {
                if (dato.id_venta === registro.id_venta) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };
    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id_venta = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };


    render() {
        return (
            <>
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <Container>
                        <table id="table_users_int" className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>ID venta</th>
                                    <th>ID Vendedor</th>
                                    <th>Nombre Cliente</th>
                                    <th>Fecha</th>
                                    <th>IVA</th>
                                    <th>Valor Total</th>
                                    <th id="header_accion">
                                        Acción
                                        <button
                                            id="button_crear"
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={() => this.mostrarModalInsertar()}
                                        >Crear</button>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.data.map((dato) => (
                                    <tr key={dato.id_venta}>
                                        <td>{dato.id_venta}</td>
                                        <td>{dato.id_vendedor}</td>
                                        <td>{dato.nombre_cliente}</td>
                                        <td>{dato.fecha}</td>
                                        <td>{dato.iva}</td>
                                        <td>{dato.valor_venta}</td>

                                        <td>
                                            <button
                                                color="primary"
                                                onClick={() => this.mostrarModalActualizar(dato)}
                                                type="button" className="btn btn-info"
                                            >
                                                Editar
                                            </button>{" "}
                                            <button
                                                color="danger"
                                                onClick={() => this.eliminar(dato)}
                                                type="button" className="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Container>


                    <ReactModal id="actualizar_modal" isOpen={this.state.modalActualizar} ariaHideApp={false} style={customStyles}>

                        <ModalHeader>
                            <div><h3>Editar Venta</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                ID venta:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={this.state.form.id_venta}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                ID Vendedor:
                                </label>
                                <input
                                    className="form-control"
                                    name="id_vendedor"
                                    readOnly
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.form.id_vendedor}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                Nombre Cliente:
                                </label>
                                <input
                                    className="form-control"
                                    name="nombre_cliente"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.nombre_cliente}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha:
                                </label>
                                <input
                                    className="form-control"
                                    name="fecha"
                                    type="date"
                                    onChange={this.handleChange}
                                    value={this.state.form.fecha}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    IVA:
                                </label>
                                <input
                                    className="form-control"
                                    name="iva"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.form.iva}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                Valor Total:
                                </label>
                                <input
                                    className="form-control"
                                    name="valor_venta"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.form.valor_venta}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={() => this.editar(this.state.form)}
                            >Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => this.cerrarModalActualizar()}
                            > Cancelar
                            </button>
                        </ModalFooter>
                    </ReactModal>



                    <ReactModal id="añadir_modal" isOpen={this.state.modalInsertar} ariaHideApp={false} style={customStyles}>
                        <ModalHeader>
                            <div><h3>Insertar Usuario</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                ID venta:
                                </label>

                                <input
                                    className="form-control"
                                    type="number"
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                ID Vendedor:
                                </label>
                                <input
                                    className="form-control"
                                    name="id_vendedor"
                                    type="number"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                Nombre Cliente:
                                </label>
                                <input
                                    className="form-control"
                                    name="nombre_cliente"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha:
                                </label>
                                <input
                                    className="form-control"
                                    name="fecha"
                                    type="date"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    IVA:
                                </label>
                                <input
                                    className="form-control"
                                    name="iva"
                                    type="number"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                Valor Total:
                                </label>
                                <input
                                    className="form-control"
                                    name="valor_venta"
                                    type="number"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => this.insertar()}
                            >
                                Insertar
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => this.cerrarModalInsertar()}
                            >
                                Cancelar
                            </button>
                        </ModalFooter>
                    </ReactModal>
                </div>
            </>



        );
    }
}
export default TableVentaEdit