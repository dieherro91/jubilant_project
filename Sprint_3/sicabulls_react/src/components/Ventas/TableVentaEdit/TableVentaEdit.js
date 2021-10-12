import React, { useState, useEffect, useRef } from 'react'
import './TableVentaEdit.css'
import VentasService from '../../../conecction/VentasService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';



const TableVentaEdit = () => {
    //Estado
    const [data, setData] = useState([])

    //mostrartabla
    const [modalInsertar, setModalInsertar] = useState(true)

    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

    useEffect(() => {
        async function datosAc() {
            toast.success("Cargando registros de ventas")
            await VentasService.getAllVentas().then(function (response) {

                setData(response.data);
            }).catch(function (error) {
                console.error(error);
                toast.error("Error cargando registros de ventas")
            });
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
            <div shadow p-3 mb-5 bg-white rounded>
                <div class="card">
                    <div class="card-body">
                        <ToastContainer position="bottom-right" />
                        {modalInsertar ?
                            (<TablaModules setEjecutarConsulta={setEjecutarConsulta} setModalInsertar={setModalInsertar} modalInsertar={modalInsertar} data={data} />)
                            : (<InsertarNuevoVenta setModalInsertar={setModalInsertar} modalInsertar={modalInsertar} />)
                        }
                    </div>
                </div>
            </div>





        </>

    )

}


const FilaVentas = ({ setEjecutarConsulta, dato }) => {
    const [edit, setEdit] = useState(false)
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
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
        console.log(infoNuevaVenta)
        const data = {
            data: { ...infoNuevaVenta, id: dato._id }

        }
        await VentasService.editando(data).then(function (response) {
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
        const id = {
            id: { id: dato._id }

        }
        await VentasService.remove(id).then(function (response) {
            console.log(response.data)
            toast.success("vehiculo eliminado")
            setEjecutarConsulta(true);

        }).catch(function (error) {
            console.log(error);
            toast.error("vehiculo no borrado")
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
                                onClick={() => actualizarVenta()}>
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
                            <h4>¿Esta seguro de eliminar el registro de vehiculo?</h4>
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

const TablaModules = ({ setEjecutarConsulta, setModalInsertar, modalInsertar, data }) => {
    return (
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
                        ></FilaVentas>
                    )
                })}
            </tbody>
        </table>
    )
}
const InsertarNuevoVenta = ({ setModalInsertar, modalInsertar }) => {
    const form = useRef(null)

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);


        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });

        const data = {
            id_venta: nuevaVenta.id_venta,
            id_vendedor: nuevaVenta.id_vendedor,
            nombre_cliente: nuevaVenta.nombre_cliente,
            fecha: nuevaVenta.fecha,
            iva: nuevaVenta.iva,
            valor_venta: nuevaVenta.valor_venta
        }
        console.log('datos formulario', data);
        await VentasService.create(data).then(function (response) {
            console.log(response.data);
            toast.success('Venta agragada con exito')
            setModalInsertar(!modalInsertar)

        }).catch(function (error) {
            console.error(error);
            toast.error('Error creando un venta');

        })
    }

    return (
        <div shadow p-3 mb-5 bg-white rounded >
                <div class="card" id="form_ingreso">
                    <div class="card-body">
            <form ref={form} onSubmit={submitForm} id="añadir_modal" >
                {console.log("Hallo")}
                <div>
                    <div><h3>Insertar Usuario</h3></div>
                    {console.log("Hallo2")}
                </div>

                <div>
                    <div className="form-group">
                        <label>
                            ID venta:
                        </label>

                        <input
                            className="form-control"
                            name="id_venta"
                            type="number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            ID Vendedor:
                        </label>
                        <input
                            className="form-control"
                            name="id_vendedor"
                            type="number"
                            required
                        />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
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

                    <div className="form-group">
                        <label>
                            IVA:
                        </label>
                        <input
                            className="form-control"
                            name="iva"
                            type="number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Valor Total:
                        </label>
                        <input
                            className="form-control"
                            name="valor_venta"
                            type="number"
                            required
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="btn btn-success"

                    >
                        Insertar
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => setModalInsertar(!modalInsertar)}
                    >
                        Cancelar
                    </button>
                </div>

            </form>

        </div >
        </div>
        </div>

    )
}
export default TableVentaEdit