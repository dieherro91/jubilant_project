import React from 'react'
import './TableUserEdit.css'
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


class TableUserEdit extends React.Component {
    //Estado
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            email: "",
            nickname: "",
            rol: "",
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
            if (dato.id === registro.id) {
                arreglo[contador].nombre = dato.nombre;
                arreglo[contador].email = dato.email;
                arreglo[contador].nickname = dato.nickname;
                arreglo[contador].rol = dato.rol;
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
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };
    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
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
                <div className="shadow bg-white rounded">
                    <Container>

                        <table id="table_users_int" className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>email</th>
                                    <th>nickname</th>
                                    <th>rol</th>
                                    <th>estado</th>
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
                                    <tr key={dato.id}>
                                        <td>{dato.id}</td>
                                        <td>{dato.nombre}</td>
                                        <td>{dato.email}</td>
                                        <td>{dato.nickname}</td>
                                        <td>{dato.rol}</td>
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
                                    value={this.state.form.id}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nombre:
                                </label>
                                <input
                                    className="form-control"
                                    name="nombre"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.nombre}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    E-mail:
                                </label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    onChange={this.handleChange}
                                    value={this.state.form.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nickname:
                                </label>
                                <input
                                    className="form-control"
                                    name="nickname"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.nickname}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Rol:
                                </label>
                                <input
                                    className="form-control"
                                    name="rol"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.form.rol}
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
                            <div><h3>Insertar Usuario</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    Id:
                                </label>

                                <input
                                    className="form-control"
                                    type="text"
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nombre:
                                </label>
                                <input
                                    className="form-control"
                                    name="nombre"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    E-mail:
                                </label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nickname:
                                </label>
                                <input
                                    className="form-control"
                                    name="nickname"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Rol:
                                </label>
                                <input
                                    className="form-control"
                                    name="rol"
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
export default TableUserEdit