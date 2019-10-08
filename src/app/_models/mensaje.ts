export interface Mensaje {
    id: number;
    emisorId: number;
    receptorId:number;
    emisorNombre: string;
    receptorNombre: string;
    fotoEmisorUrl: string;
    fotoReceptorUrl: string;
    contenido: string;
    haSidoLeido: boolean;
    fechaLectura: Date;
    fechaEnvio: Date;
}
