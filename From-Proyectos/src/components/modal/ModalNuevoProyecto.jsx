import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Cascader } from 'antd';
import { useDispatch } from 'react-redux';
// import { agregarProyecto } from '../features/proyectos/proyectoSlice';
import { agregarProyecto } from '../../features/proyectos/proyetoSlice'
import opcionesInstituciones from '../../data/instituciones';
import FormularioIntegrantes from '../formularioIntegrantes/FormularioIntegrantes';


const ModalNuevoProyecto = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const institucionYAreaSeleccionada = Form.useWatch('institucionYarea', form);


    const colegioElegido = institucionYAreaSeleccionada ? institucionYAreaSeleccionada[0] : null;


    const guardarDatosProyecto = (valores) => {
        const nuevoProyecto = {
            key: Date.now().toString(),
            titulo: valores.titulo,
            institucion: valores.institucionYarea[0],
            area: valores.institucionYarea[1],
            estado: 'Formulado',

        }
        dispatch(agregarProyecto(nuevoProyecto));
        form.resetFields();
        setIsModalOpen(false);
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Nuevo Proyecto
            </Button>
            <Modal
                title="Registrar Nuevo Proyecto"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => form.submit()}
                okText="Guardar"

                onCancel={handleCancel}
            >
                <Form layout='vertical'
                    form={form}
                    name='formularioProyecto'
                    onFinish={guardarDatosProyecto}
                >
                    <Form.Item label="Titulo del Proyecto" name='titulo'
                        rules={
                            [
                                { required: true, message: 'Por favor ingresa el título del proyecto!' },
                            ]
                        }>
                        <Input />
                    </Form.Item>
                    <Form.Item label='institucion y Area ' name='institucionYarea'
                        rules={[{ required: true, message: 'Seleccione institucion y area!' }]}

                    >
                        <Cascader options={opcionesInstituciones} placeholder="Seleccione"
                        />

                    </Form.Item>

                    <FormularioIntegrantes institucionSeleccionada={colegioElegido}
                    />

                </Form>

            </Modal >

        </>
    );
};
export default ModalNuevoProyecto;