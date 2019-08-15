import { Foto } from './Foto';

export interface User {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
    fechaCreacion: Date;
    ultimaConexion: Date;
    fotoUrl: string;
    ciudad: string;
    pais: string;
    edad: Number;
    // propiedades opcionales
    intereses?: string;
    buscando?: string;
    fotos?: Foto[];
}
