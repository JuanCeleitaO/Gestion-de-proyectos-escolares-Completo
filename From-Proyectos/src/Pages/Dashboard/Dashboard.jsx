import { Layout, Button, Menu, Table, Tag, Drawer, Space, Form, Input, Cascader, Select } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../../features/auth/authSlice.js';
import { eliminarProyecto, editarProyecto } from '../../features/proyectos/proyetoSlice.js'; // Asegúrate de tener editarProyecto
import { useEffect, useState } from 'react';
import ModalNuevoProyecto from '../../components/Modal/ModalNuevoProyecto';
import opcionesInstituciones from '../../data/instituciones';
import datosEstudiantes from '../../data/estudiantes';

const { Header, Sider, Content, Footer } = Layout;

export default function Dashboard() {
    const dispatch = useDispatch();

    // Controladores del drawer y edición
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formEdicion] = Form.useForm();

    // Estado para el filtro de estudiantes en la edición
    const [colegioElegidoEdicion, setColegioElegidoEdicion] = useState(null);

    const abrirDrawer = (proyecto) => {
        setProyectoSeleccionado(proyecto);
        setDrawerVisible(true);
        setModoEdicion(false);
    };

    // Función para encender la edición y llenar los datos
    const activarEdicion = () => {
        setModoEdicion(true);
        formEdicion.setFieldsValue({
            titulo: proyectoSeleccionado.titulo,
            institucionYarea: [proyectoSeleccionado.institucion, proyectoSeleccionado.area],
            estado: proyectoSeleccionado.estado,
            observacion: proyectoSeleccionado.observacion,
            integrantes: proyectoSeleccionado.integrantes
        });
        setColegioElegidoEdicion(proyectoSeleccionado.institucion);
    };

    // Función para guardar los cambios
    const guardarCambios = (valores) => {
        const proyectoActualizado = {
            ...proyectoSeleccionado,
            titulo: valores.titulo,
            institucion: valores.institucionYarea[0],
            area: valores.institucionYarea[1],
            estado: valores.estado || proyectoSeleccionado.estado,
            observacion: valores.observacion,
            integrantes: valores.integrantes || [] // 👈 
        };

        dispatch(editarProyecto(proyectoActualizado));
        setDrawerVisible(false);
    };

    const menuItems = [
        { key: 'home', icon: <HomeOutlined />, label: 'Inicio' },
        { key: 'profile', icon: <UserOutlined />, label: 'Perfil' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Configuración' },
    ];

    const obtenerColor = (estado) => {
        switch (estado) {
            case 'Activo': return 'green';
            case 'Inactivo': return 'red';
            case 'Formulado': return 'blue';
            case 'Finalizado': return 'gold';
            default: return 'default';
        }
    };

    const columns = [
        { title: 'Título del Proyecto', dataIndex: 'titulo', key: 'titulo' },
        { title: 'Área', dataIndex: 'area', key: 'area' },
        { title: 'Institución', dataIndex: 'institucion', key: 'institucion' },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => <Tag color={obtenerColor(estado)}>{estado?.toUpperCase()}</Tag>
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
                    <Button type='link' onClick={() => abrirDrawer(record)}>Ver Detalles</Button>
                    <Button type='primary' danger onClick={() => dispatch(eliminarProyecto(record.key))}>Eliminar</Button>
                </Space>
            )
        }
    ];

    const dataSource = useSelector((state) => state.proyectos.proyectos);

    // Filtro de estudiantes para el Select de edición
    const estudiantesFiltrados = datosEstudiantes.filter(
        (estudiante) => estudiante.institucion === colegioElegidoEdicion
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="dark">
                <Menu theme="dark" defaultSelectedKeys={['Inicio']} mode="inline" items={menuItems} style={{ fontSize: "1rem" }} />
            </Sider>

            <Layout>
                <Header style={{ background: '#7069f6', padding: '0 2rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button type='primary' danger onClick={() => dispatch(cerrarSesion())}>Cerrar Sesión</Button>
                </Header>

                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px' }}>
                        <h2>Información sobre los proyectos escolares</h2>
                        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                            <ModalNuevoProyecto />
                        </div>
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </Content>

                <Drawer title="Detalles del Proyecto" placement="right" onClose={() => setDrawerVisible(false)} open={drawerVisible} size={400} style={{ background: '#a5d3f5' }}>
                    {modoEdicion ? (
                        <Form layout='vertical' form={formEdicion} name='formularioEdicion' onFinish={guardarCambios}>
                            <Form.Item label="Título del Proyecto" name='titulo' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label='Institución y Área' name='institucionYarea' rules={[{ required: true }]}>
                                <Cascader
                                    options={opcionesInstituciones}
                                    onChange={(valores) => setColegioElegidoEdicion(valores ? valores[0] : null)}
                                />
                            </Form.Item>

                            <Form.Item label='Integrantes del Equipo' name='integrantes'>
                                <Select mode="multiple" disabled={!colegioElegidoEdicion} options={estudiantesFiltrados} placeholder="Selecciona estudiantes" />
                            </Form.Item>

                            <Form.Item label="Observación" name='observacion'>
                                <Input.TextArea rows={3} />
                            </Form.Item>

                            <Space>
                                <Button type="primary" htmlType="submit">Guardar Cambios</Button>
                                <Button onClick={() => setModoEdicion(false)}>Cancelar</Button>
                            </Space>
                        </Form>
                    ) : (
                        <Space vertical style={{ width: '100%', fontSize: 18 }}>
                            <p><strong>Título:</strong> {proyectoSeleccionado?.titulo}</p>
                            <p><strong>Institución:</strong> {proyectoSeleccionado?.institucion}</p>
                            <p><strong>Área:</strong> {proyectoSeleccionado?.area}</p>
                            <p><strong>Estado:</strong> {proyectoSeleccionado?.estado}</p>
                            <p><strong>Integrantes:</strong> {proyectoSeleccionado?.integrantes?.length > 0 ? proyectoSeleccionado.integrantes.join(', ') : 'Ninguno'}</p>
                            <p><strong>Observación:</strong> {proyectoSeleccionado?.observacion || 'Sin observaciones'}</p>
                            <Button type='primary' style={{ background: 'green' }} onClick={activarEdicion}>Editar Proyecto</Button>
                        </Space>
                    )}
                </Drawer>

                <Footer style={{ textAlign: 'center' }}>Mi Proyecto ©2026</Footer>
            </Layout>
        </Layout>
    );
}