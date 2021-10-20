import React, { useState, useEffect, useRef } from 'react'
import './TableUserEdit.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import axios from 'axios'
import ReactLoading from 'react-loading'

const getToken =()=>{
    return `Bearer ${localStorage.getItem('token')}`
}

const TableUserEdit = () => {
    //Estado
    const [data, setData] = useState([])

    //mostrartabla
    const [modalInsertar, setModalInsertar] = useState(true)

    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function datosAc() {
            toast.info("Cargando registros de usuarios")
            const options = {
                method: 'GET',
                url: `http://localhost:5000/usuarios`,
                headers: {'Content-Type': 'application/json', Authorization: getToken() },
            };

            setLoading(true)
            await axios.request(options).then(function (response) {
                setData(response.data);
            }).catch(function (error) {
                console.error(error);
                toast.error("Error cargando registros de usuarios")
            });
            setLoading(false)
        }

        if (ejecutarConsulta) {
            datosAc();
            setEjecutarConsulta(false);
        }

    }, [ejecutarConsulta])

    useEffect(() => {
        if (modalInsertar) {
            setEjecutarConsulta(true);
        }

    }, [modalInsertar])

    useEffect(() => {

    }, [])



    return (
        <>
            <ToastContainer position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            {modalInsertar ?
                (loading ? (
                    <ReactLoading type={'cylon'} color={'#252440'} height={'20%'} width={'40%'} />)
                    : (
                        <TablaModules
                        setEjecutarConsulta={setEjecutarConsulta}
                        setModalInsertar={setModalInsertar}
                        modalInsertar={modalInsertar} data={data}
                        ejecutarConsulta={ejecutarConsulta}
                    />   
                    )
                )
                : (<InsertarNuevoUsuario
                    setModalInsertar={setModalInsertar}
                    modalInsertar={modalInsertar}
                    data={data}
                    ejecutarConsulta={ejecutarConsulta}
                    setEjecutarConsulta={setEjecutarConsulta}
                />)
            }
        </>
    )
}


const FilaUsuarios = ({ setEjecutarConsulta, dato, ejecutarConsulta }) => {
    const [edit, setEdit] = useState(false)
    const [infoNuevaUsuario, setInfoNuevaUsuario] = useState({
        _id: dato._id,
        id: dato.id,
        nombre: dato.nombre,
        email: dato.email,
        nickname: dato.nickname,
        rol: dato.rol,
        estado: dato.estado
    })
    const [openDialog, setOpenDialog] = useState(false)

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const actualizarUsuario = async () => {


        const options = {
            method: 'PATCH',
            url: `http://localhost:5000/usuarios/editar`,
            headers: { 'Content-Type': 'application/json',Authorization: getToken() },
            data: { ...infoNuevaUsuario },
        };

        await axios.request(options).then(function (response) {
            console.log("actualizando")
            console.log(infoNuevaUsuario)
            console.log(response.data)
            toast.success("Registro de usuario editado con exito")
            setEdit(false);
            setEjecutarConsulta(true);
        }).catch(function (error) {
            console.log(error);
            toast.error('error modificando usuario')
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const EliminarUsuario = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/usuarios/eliminar',
            headers: {'Content-Type': 'application/json', Authorization: getToken() },
            data: { id: dato._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data)

                toast.success("Usuario eliminado")
                setEjecutarConsulta(!ejecutarConsulta);


            }).catch(function (error) {
                console.log(error);
                toast.error("Usuario no borrado")
            });
    }

    return (
        <tr >
            {edit ? (
                <>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, id: e.target.value })}
                            type='number'
                            value={infoNuevaUsuario.id}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, nombre: e.target.value })}
                            type='text'
                            value={infoNuevaUsuario.nombre}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, email: e.target.value })}
                            type='email'
                            value={infoNuevaUsuario.email}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, nickname: e.target.value })}
                            type='text'
                            value={infoNuevaUsuario.nickname}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, rol: e.target.value })}
                            type='text'
                            value={infoNuevaUsuario.rol}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, estado: e.target.value })}
                            type='text'
                            value={infoNuevaUsuario.estado}>
                        </input>
                    </td>

                </>)
                : (
                    <>
                        <td>{dato.id}</td>
                        <td>{dato.nombre}</td>
                        <td>{dato.email}</td>
                        <td>{dato.nickname}</td>
                        <td>{dato.rol}</td>
                        <td>{dato.estado}</td>
                    </>)
            }
            <td>
                <div>

                    {edit ?
                        (<Tooltip title="Confirmar" arrow>
                            <i className="fas fa-check"
                                onClick={() => actualizarUsuario()}>
                            </i>
                        </Tooltip>)
                        : (<Tooltip title="Editar" arrow >
                            <i id="pencil"
                                className="fas fa-pencil-alt"
                                onClick={() => setEdit(!edit)}></i>
                        </Tooltip>)
                    }
                    <Tooltip title="Eliminar" arrow >
                        <i id="trash"

                            onClick={() => setOpenDialog(true)}
                            className="fas fa-trash-alt">
                        </i>

                    </Tooltip>
                    <Dialog open={openDialog} >
                        <div>
                            <h4>¿Esta seguro de eliminar el registro de la usuario?</h4>
                            <hr></hr>
                            <br></br>
                            <div className="row justify-content-center">
                                <div className="btn-group" role="group" aria-label="Basic example" id="Dialog_button_center">
                                    <button type="button" className="btn btn-secondary" onClick={() => { EliminarUsuario(); setOpenDialog(false) }}>Confirmar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => setOpenDialog(false)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </td>
        </tr>

    )
}

const TablaModules = ({ setEjecutarConsulta, setModalInsertar, modalInsertar, data, ejecutarConsulta }) => {

    return (
        <table id="table_users_int" className="table">
            <thead className="table-active">
                <tr>
                    <th>ID Usuario</th>
                    <th>Usuario</th>
                    <th>E-mail</th>
                    <th>Nickname</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th id="header_accion">
                        Acción
                        <Tooltip title="Crear registro" arrow placement="top">
                            <button
                                id="button_crear"
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={() => setModalInsertar(!modalInsertar)}

                            >Crear</button>
                        </Tooltip>
                    </th>
                </tr>
            </thead>

            <tbody>
                {data.map((dato) => {
                    return (
                        <FilaUsuarios
                            key={nanoid()}
                            dato={dato}
                            setEjecutarConsulta={setEjecutarConsulta}
                            ejecutarConsulta={ejecutarConsulta}
                        ></FilaUsuarios>
                    )
                })}
            </tbody>
        </table>
    )
}
const InsertarNuevoUsuario = ({ setModalInsertar, modalInsertar, data, setEjecutarConsulta, ejecutarConsulta }) => {

    const form = useRef(null)

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaUsuario = {};
        fd.forEach((value, key) => {
            nuevaUsuario[key] = value;
        });
        const datas = {
            id: nuevaUsuario.id,
            nombre: nuevaUsuario.nombre,
            email: nuevaUsuario.email,
            nickname: nuevaUsuario.nickname,
            rol: nuevaUsuario.rol,
            estado: nuevaUsuario.estado
        }
        var value_boll = false;
        const duplicated = data.map((ids) => {
            if (Number(datas.id) === Number(ids.id)) { //si es falso pasa a else  pero falso
                value_boll = true;
                console.log(value_boll)
                console.log("qwewqe")
            }
            return value_boll;
        });
        console.log(duplicated)
        ////////////////////
        if (!value_boll) {
            value_boll = false;
            const options = {
                method: 'POST',
                url: 'http://localhost:5000/usuarios/nuevo',
                headers: {'Content-Type': 'application/json', Authorization: getToken() },
                data: datas
            }
            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    toast.success('Usuario agregado con exito')
                    setModalInsertar(!modalInsertar)
                    setEjecutarConsulta(!ejecutarConsulta)

                }).catch(function (error) {
                    console.error(error);
                    toast.error('Error creando un usuario');

                });
                setEjecutarConsulta(true);
        } else {
            toast.error('Id de Usuario duplicado')
        }
    }
    const id_register = (data) => {
        let ultimoElementoJson = 0;
        let ultimoElemento = 0;
        try {
            ultimoElementoJson = data[Object.keys(data).sort().reverse()[0]];
            console.log(ultimoElementoJson[Object.keys(ultimoElementoJson).sort()[3]])
            ultimoElemento = Number(ultimoElementoJson[Object.keys(ultimoElementoJson).sort()[3]]) + 1;
            return ultimoElemento
        } catch (error) {
            ultimoElemento = 1000;
            console.log(error)
            return ultimoElemento
        }
    }
    return (
        <form ref={form} onSubmit={submitForm} id="añadir_modal">
            <div>
                <div><h2>Insertar Usuario</h2></div>
            </div>
            <hr/>
            
            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <label>
                        ID Usuario:
                    </label>
                    <input
                        className="form-control"
                        name="id"
                        type="number"
                        defaultValue={id_register(data)}
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Nombre:
                    </label>
                    <input
                        className="form-control"
                        name="nombre"
                        type="text"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        E-mail:
                    </label>
                    <input
                        className="form-control"
                        name="email"
                        type="email"
                        required
                    />
                </div>
            </div>
            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <label>
                        Nickname:
                    </label>
                    <input
                        className="form-control"
                        name="nickname"
                        type="text"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Rol:
                    </label>
                    <input
                        className="form-control"
                        name="rol"
                        type="text"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Estado:
                    </label>
                    <input
                        className="form-control"
                        name="estado"
                        type="text"
                        required />
                </div>
            </div>

            <div className="row justify-content-center">
                <div class="btn-group" role="group" aria-label="Basic example" id="buttons_nuevo">
                    <button
                        type="submit"
                        className="btn btn-success"

                    >
                        Insertar
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {setModalInsertar(!modalInsertar);
                                        setEjecutarConsulta(true);}}
                    >
                        Cancelar
                    </button>
                </div>
            </div>

        </form>



    )
}
export default TableUserEdit