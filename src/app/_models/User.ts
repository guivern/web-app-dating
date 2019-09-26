import { Foto } from './Foto';

export interface User {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
    introduccion: string;
    fechaCreacion: Date;
    ultimaConexion: Date;
    fotoUrl: string;
    ciudad: string;
    pais: string;
    edad: Number;
    genero: string;
    // propiedades opcionales
    intereses?: string;
    buscando?: string;
    fotos?: Foto[];
}
