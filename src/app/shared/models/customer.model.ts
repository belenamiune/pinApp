export interface Customer {
  id?: string;
  nombre: string;
  apellido: string;
  edad: number;
  fechaNacimiento: Date;
  createdAt?: Date;
}