import React, { useState, useEffect, useRef } from 'react'
import './TableProductoEdit.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import axios from 'axios'
import ReactLoading from 'react-loading'

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`
}

const TableProductoEdit = () => {
    //Estado
    const [data, setData] = useState([])

    //mostrartabla
    const [modalInsertar, setModalInsertar] = useState(true)

    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function datosAc() {
            toast.info("Cargando registros de servicios")
            const options = {
                method: 'GET',
                url: `http://localhost:5000/servicios`,
                headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            };

            setLoading(true)
            await axios.request(options).then(function (response) {
                setData(response.data);
            }).catch(function (error) {
                console.error(error);
                toast.error("Error cargando registros de servicios")
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
                : (<InsertarNuevoProducto
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


const FilaProductos = ({ setEjecutarConsulta, dato, ejecutarConsulta, setModalInsertar }) => {
    const [edit, setEdit] = useState(false)
    const [infoNuevaProducto, setInfoNuevaProducto] = useState({
        _id: dato._id,
        id_Servicio: dato.id_Servicio,
        servicio: dato.servicio,
        fecha: dato.fecha,
        descripcion: dato.descripcion,
        valor_unitario: dato.valor_unitario,
        estado: dato.estado
    })
    const [openDialog, setOpenDialog] = useState(false)

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const actualizarProducto = async () => {


        const options = {
            method: 'PATCH',
            url: `http://localhost:5000/servicios/editar`,
            headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            data: { ...infoNuevaProducto },
        };

        await axios.request(options).then(function (response) {
            console.log("actualizando")
            console.log(infoNuevaProducto)
            console.log(response.data)
            toast.success("Servicio editado con exito")
            setEdit(false);
            setEjecutarConsulta(true);
        }).catch(function (error) {
            console.log(error);
            toast.error('error modificando servicio')
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const EliminarProducto = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/servicios/eliminar',
            headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            data: { id: dato._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data)

                toast.success("Servicio eliminado")
                setEjecutarConsulta(!ejecutarConsulta);


            }).catch(function (error) {
                console.log(error);
                toast.error("Servicio no borrado")
            });
    }

    return (
        <tr >
            {edit ? (
                <>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaProducto({ ...infoNuevaProducto, id_Servicio: e.target.value })}
                            type='number'
                            value={infoNuevaProducto.id_Servicio}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaProducto({ ...infoNuevaProducto, servicio: e.target.value })}
                            type='text'
                            value={infoNuevaProducto.servicio}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaProducto({ ...infoNuevaProducto, fecha: e.target.value })}
                            type='date'
                            value={infoNuevaProducto.fecha}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaProducto({ ...infoNuevaProducto, descripcion: e.target.value })}
                            type='text'
                            value={infoNuevaProducto.descripcion}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaProducto({ ...infoNuevaProducto, valor_unitario: e.target.value })}
                            type='number'
                            value={infoNuevaProducto.valor_unitario}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaProducto({ ...infoNuevaProducto, estado: e.target.value })}
                            type='text'
                            value={infoNuevaProducto.estado}>
                        </input>
                    </td>

                </>)
                : (
                    <>
                        <td>{dato.id_Servicio}</td>
                        <td>{dato.servicio}</td>
                        <td>{dato.fecha}</td>
                        <td>{dato.descripcion}</td>
                        <td>{dato.valor_unitario}</td>
                        <td>{dato.estado}</td>
                    </>)
            }
            <td>
                <div>

                    {edit ?
                        (<Tooltip title="Confirmar" arrow>
                            <i className="fas fa-check"
                                onClick={() => { actualizarProducto(); setModalInsertar(true) }}>
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
                            <h4>¿Esta seguro de eliminar el registro del servicio?</h4>
                            <hr></hr>
                            <br></br>
                            <div className="row justify-content-center">
                                <div className="btn-group" role="group" aria-label="Basic example" id="Dialog_button_center">
                                    <button type="button" className="btn btn-secondary" onClick={() => { EliminarProducto(); setOpenDialog(false) }}>Confirmar</button>
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
        <table id="table_Productos_int" className="table">
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
                        <FilaProductos
                            key={nanoid()}
                            dato={dato}
                            setEjecutarConsulta={setEjecutarConsulta}
                            ejecutarConsulta={ejecutarConsulta}
                            setModalInsertar={setModalInsertar}
                        ></FilaProductos>
                    )
                })}
            </tbody>
        </table>
    )
}
const InsertarNuevoProducto = ({ setModalInsertar, modalInsertar, data, setEjecutarConsulta, ejecutarConsulta }) => {

    const form = useRef(null)

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaProducto = {};
        fd.forEach((value, key) => {
            nuevaProducto[key] = value;
        });
        const datas = {
            id_Servicio: nuevaProducto.id_Servicio,
            servicio: nuevaProducto.servicio,
            fecha: nuevaProducto.fecha,
            descripcion: nuevaProducto.descripcion,
            valor_unitario: nuevaProducto.valor_unitario,
            estado: nuevaProducto.estado
        }
        var value_boll = false;
        const duplicated = data.map((ids) => {
            if (Number(datas.id_Servicio) === Number(ids.id_Servicio)) { //si es falso pasa a else  pero falso
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
                url: 'http://localhost:5000/servicios/nuevo',
                headers: { 'Content-Type': 'application/json', Authorization: getToken() },
                data: datas
            }
            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    toast.success('Servicio agregada con exito')
                    setModalInsertar(!modalInsertar)
                    setEjecutarConsulta(!ejecutarConsulta)

                }).catch(function (error) {
                    console.error(error);
                    toast.error('Error creando un servicio');

                });
            setEjecutarConsulta(true)
        } else {
            toast.error('Id de servicio duplicado')
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
                <div><h2>Insertar Servicio</h2></div>
            </div>
            <hr />

            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <label>
                        ID Servicio:
                    </label>
                    <input
                        className="form-control"
                        name="id_Servicio"
                        type="number"
                        defaultValue={id_register(data)}
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Servicio:
                    </label>
                    <input
                        className="form-control"
                        name="servicio"
                        type="text"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Fecha:
                    </label>
                    <input
                        className="form-control"
                        name="fecha"
                        type="date"
                        required
                    />
                </div>
            </div>
            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <label>
                        Descripción:
                    </label>
                    <input
                        className="form-control"
                        name="descripcion"
                        type="text"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Valor Unitario:
                    </label>
                    <input
                        className="form-control"
                        name="valor_unitario"
                        type="number"
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
                        onClick={() => {
                            setModalInsertar(!modalInsertar)
                            setEjecutarConsulta(true)
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>

        </form>



    )
}
export default TableProductoEdit