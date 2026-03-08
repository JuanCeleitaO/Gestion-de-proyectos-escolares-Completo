import React from 'react';
import { Button, Checkbox, Form, Input, Card, Typography, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { iniciarSesion, errorSesion } from './authSlice';
import './LoginForm.css';
const { Title } = Typography;

export const LoginForm = () => {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.auth);
    const onFinish = (values) => {
        // console.log('Datos del formulario:', values);


        if (values.password === '123456' && values.email === 'admin@ad.com') {
            dispatch(iniciarSesion({
                user: { name: 'Admin', email: values.email, rol: 'coordinador' },
                token: 'token-demo-123',

            }));
        } else {

            dispatch(errorSesion('La contraseña o el correo son incorrectos'));
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Falló la validación:', errorInfo);
    };

    return (
        <div className='container'>
            <Card className='cardLogin'
            // style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            // variant={false}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Title level={3}>Gestión Escolar</Title>
                    <Typography.Text type="secondary">Inicia sesión para continuar</Typography.Text>

                </div>
                {error && (
                    <Alert
                        title={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: 24 }}
                    />
                )}
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Correo Electrónico"
                        name="email"
                        rules={[
                            { required: true, message: '¡Por favor ingresa tu correo!' },
                            { type: 'email', message: 'El correo no es válido' }
                        ]}
                    >
                        <Input placeholder="admin@escuela.com" />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }

                        ]}
                    >
                        <Input.Password placeholder="******" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Recordarme</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={isLoading}
                        >
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </Card></div>

    );
};

export default LoginForm;