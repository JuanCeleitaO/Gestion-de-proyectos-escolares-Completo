import React from 'react';
import { Form, Select } from 'antd';
import datosEstudiantes from '../../data/estudiantes';

// Recibimos el colegio que el profesor eligió en el componente padre
export default function FormularioIntegrantes({ institucionSeleccionada }) {

    // El filtro revisa estudiante por estudiante
    const estudiantesFiltrados = datosEstudiantes.filter(
        (estudiante) => estudiante.institucion === institucionSeleccionada
    );

    return (
        <Form.Item label='Añadir estudiantes' name='integrantes'>
            <Select
                mode="multiple"
                disabled={!institucionSeleccionada}
                placeholder="Seleccione los estudiantes"
                options={estudiantesFiltrados}

            />


        </Form.Item>
    );
}