import axios, { AxiosError, AxiosResponse } from 'axios';

interface Trazabilidad {
  id_consulta: string;
  hora: string;
  fecha: string;
  id_user: string;
  iqms: string;
  catalogo: string;
  stage:string
}

class TrazabilidadGateway {

  private baseURL: string;


  constructor(baseURL: string = "http://localhost:3000") {
    this.baseURL = baseURL;
  }



  // Agregar un nuevo elemento
  async traza(data: FormData): Promise<Trazabilidad> {
    try {
      const response: AxiosResponse<Trazabilidad> = await axios.post(this.baseURL, data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error en la solicitud:', axiosError.message || axiosError.response?.data);
      } else {
        console.error('Error desconocido en la solicitud:', error);
      }
      throw error;
    }
  }

    // Agregar un nuevo elemento
    async getTrazaById(id_traza : string): Promise<Trazabilidad> {
      try {
        const response: AxiosResponse<Trazabilidad> = await axios.get(`${this.baseURL}/qr-consulta/qr/${id_traza}`);
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error('Error en la solicitud:', axiosError.message || axiosError.response?.data);
        } else {
          console.error('Error desconocido en la solicitud:', error);
        }
        throw error;
      }
    }

    async getByDetail(stage : string, catalogo : string): Promise<Trazabilidad> {
      try {
        const response: AxiosResponse<Trazabilidad> = await axios.get(`${this.baseURL}/qr-consulta/iqms-search/?stage=${stage}?catalogo=${catalogo}`);
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error('Error en la solicitud:', axiosError.message || axiosError.response?.data);
        } else {
          console.error('Error desconocido en la solicitud:', error);
        }
        throw error;
      }
    }


  
}

export default TrazabilidadGateway;