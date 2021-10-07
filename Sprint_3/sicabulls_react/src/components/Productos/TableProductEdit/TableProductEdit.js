import React from 'react'
import './TableProductEdit.css'
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


class TableProductEdit extends React.Component {
    //Estado
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id_Servicio: "",
            servicio: "",
            fecha: "",
            descripcion: "",
            valor_unitario: "",
            estado: ""

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
            if (dato.id_Servicio === registro.id_Servicio) {
                arreglo[contador].Servicio = dato.Servicio;
                arreglo[contador].fecha = dato.fecha;
                arreglo[contador].descripcion = dato.descripcion;
                arreglo[contador].valor_unitario = dato.valor_unitario;
                arreglo[contador].estado = dato.estado;
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
                if (dato.id_Servicio === registro.id_Servicio) {
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
                                    <th>ID Servicio</th>
                                    <th>Servicio</th>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Valor Unitario</th>
                                    <th>Estado</th>
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
                                    <tr key={dato.id_Servicio}>
                                        <td>{dato.id_Servicio}</td>
                                        <td>{dato.servicio}</td>
                                        <td>{dato.fecha}</td>
                                        <td>{dato.descripcion}</td>
                                        <td>{dato.valor_unitario}</td>
                                        <td>{dato.estado}</td>

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
                            <div><h3>Editar Registro</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    Id:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={this.state.form.id_Servicio}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Servicio:
                                </label>
                                <input
                                    className="form-control"
                                    name="Servicio"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.servicio}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha:
                                </label>
                                <input
                                    className="form-control"
                                    name="Fecha"
                                    type="date"
                                    onChange={this.handleChange}
                                    value={this.state.form.fecha}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Descripción:
                                </label>
                                <input
                                    className="form-control"
                                    name="descripcion"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.descripcion}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Valor Unitario:
                                </label>
                                <input
                                    className="form-control"
                                    name="valor_unitario"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.valor_unitario}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Estado:
                                </label>
                                <input
                                    className="form-control"
                                    name="estado"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.estado}
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
                            <div><h3>Insertar Producto</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    ID Servicio:
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Servicio:
                                </label>
                                <input
                                    className="form-control"
                                    name="servicio"
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
                                    Descripción:
                                </label>
                                <input
                                    className="form-control"
                                    name="Descripción"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Valor Unitario:
                                </label>
                                <input
                                    className="form-control"
                                    name="valor_unitario"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Estado:
                                </label>
                                <input
                                    className="form-control"
                                    name="estado"
                                    type="text"
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
export default TableProductEdit