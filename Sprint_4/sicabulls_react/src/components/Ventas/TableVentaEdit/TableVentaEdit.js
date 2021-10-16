import React, { useState, useEffect, useRef } from 'react'
import './TableVentaEdit.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import axios from 'axios'
import ReactLoading from 'react-loading'

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`
}

const TableVentaEdit = () => {
    //Estado
    const [data, setData] = useState([])

    //mostrartabla
    const [modalInsertar, setModalInsertar] = useState(true)

    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function datosAc() {
            toast.info("Cargando registros de ventas")
            const options = {
                method: 'GET',
                url: `http://localhost:5000/ventas`,
                headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            };

            setLoading(true)
            await axios.request(options).then(function (response) {
                setData(response.data);
            }).catch(function (error) {
                console.error(error);
                toast.error("Error cargando registros de ventas")
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
                : (<InsertarNuevoVenta
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


const FilaVentas = ({ setEjecutarConsulta, dato, ejecutarConsulta }) => {
    const [edit, setEdit] = useState(false)
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        _id: dato._id,
        id_venta: dato.id_venta,
        id_vendedor: dato.id_vendedor,
        nombre_cliente: dato.nombre_cliente,
        fecha: dato.fecha,
        iva: dato.iva,
        valor_venta: dato.valor_venta
    })
    const [openDialog, setOpenDialog] = useState(false)

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const actualizarVenta = async () => {


        const options = {
            method: 'PATCH',
            url: `http://localhost:5000/ventas/editar`,
            headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            data: { ...infoNuevaVenta },
        };

        await axios.request(options).then(function (response) {
            console.log("actualizando")
            console.log(infoNuevaVenta)
            console.log(response.data)
            toast.success("venta editada con exito")
            setEdit(false);
            setEjecutarConsulta(true);
        }).catch(function (error) {
            console.log(error);
            toast.error('error modificando venta')
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const EliminarVenta = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/ventas/eliminar',
            headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            data: { id: dato._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data)

                toast.success("Venta eliminada")
                setEjecutarConsulta(true);


            }).catch(function (error) {
                console.log(error);
                toast.error("Venta no borrada")
            });
    }

    return (
        <tr >
            {edit ? (
                <>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, id_venta: e.target.value })}
                            type='number'
                            value={infoNuevaVenta.id_venta}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, id_vendedor: e.target.value })}
                            type='number'
                            value={infoNuevaVenta.id_vendedor}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, nombre_cliente: e.target.value })}
                            type='text'
                            value={infoNuevaVenta.nombre_cliente}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, date: e.target.value })}
                            type='date'
                            value={infoNuevaVenta.fecha}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, iva: e.target.value })}
                            type='number'
                            value={infoNuevaVenta.iva}>
                        </input>
                    </td>
                    <td>
                        <input
                            className="input_edicion"
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, valor_venta: e.target.value })}
                            type='number'
                            value={infoNuevaVenta.valor_venta}>
                        </input>
                    </td>

                </>)
                : (
                    <>
                        <td>{dato.id_venta}</td>
                        <td>{dato.id_vendedor}</td>
                        <td>{dato.nombre_cliente}</td>
                        <td>{dato.fecha}</td>
                        <td>{dato.iva}</td>
                        <td>{dato.valor_venta}</td>
                    </>)
            }
            <td>
                <div>

                    {edit ?
                        (<Tooltip title="Confirmar" arrow>
                            <i className="fas fa-check"
                                onClick={() => {actualizarVenta();
                                    setEjecutarConsulta(true);}}>
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
                            <h4>¿Esta seguro de eliminar el registro de la venta?</h4>
                            <hr></hr>
                            <br></br>
                            <div className="row justify-content-center">
                                <div className="btn-group" role="group" aria-label="Basic example" id="Dialog_button_center">
                                    <button type="button" className="btn btn-secondary" onClick={() => { EliminarVenta(); setOpenDialog(false) }}>Confirmar</button>
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
        <table id="table_ventas_int" className="table">
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
                        <FilaVentas
                            key={nanoid()}
                            dato={dato}
                            setEjecutarConsulta={setEjecutarConsulta}
                            ejecutarConsulta={ejecutarConsulta}
                        ></FilaVentas>
                    )
                })}
            </tbody>
        </table>
    )
}
const InsertarNuevoVenta = ({ setModalInsertar, modalInsertar, data, setEjecutarConsulta, ejecutarConsulta }) => {

    const form = useRef(null)

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });
        const datas = {
            id_venta: nuevaVenta.id_venta,
            id_vendedor: nuevaVenta.id_vendedor,
            nombre_cliente: nuevaVenta.nombre_cliente,
            fecha: nuevaVenta.fecha,
            iva: nuevaVenta.iva,
            valor_venta: nuevaVenta.valor_venta
        }
        var value_boll = false;
        const duplicated = data.map((ids) => {
            if (Number(datas.id_venta) === Number(ids.id_venta)) { //si es falso pasa a else  pero falso
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
                url: 'http://localhost:5000/ventas/nuevo',
                headers: { 'Content-Type': 'application/json', Authorization: getToken() },
                data: datas
            }
            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    toast.success('Venta agragada con exito')
                    setModalInsertar(!modalInsertar)
                    setEjecutarConsulta(!ejecutarConsulta)

                }).catch(function (error) {
                    console.error(error);
                    toast.error('Error creando un venta');

                });
                setEjecutarConsulta(true);   
        } else {
            toast.error('Id de venta duplicado')
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
                <div><h2>Insertar Venta</h2></div>
            </div>
            <hr />

            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <label>
                        ID venta:
                    </label>
                    <input
                        className="form-control"
                        name="id_venta"
                        type="number"
                        defaultValue={id_register(data)}
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        ID Vendedor:
                    </label>
                    <input
                        className="form-control"
                        name="id_vendedor"
                        type="number"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Nombre Cliente:
                    </label>
                    <input
                        className="form-control"
                        name="nombre_cliente"
                        type="text"
                        required
                    />
                </div>
            </div>
            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <label>
                        Fecha:
                    </label>
                    <input
                        className="form-control"
                        name="fecha"
                        type="date"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        IVA:
                    </label>
                    <input
                        className="form-control"
                        name="iva"
                        type="number"
                        required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>
                        Valor Total:
                    </label>
                    <input
                        className="form-control"
                        name="valor_venta"
                        type="number"
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
                        onClick={() => {setModalInsertar(!modalInsertar)
                            setEjecutarConsulta(true)}}
                    >
                        Cancelar
                    </button>
                </div>
            </div>

        </form>



    )
}
export default TableVentaEdit