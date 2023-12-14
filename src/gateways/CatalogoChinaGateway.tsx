import axios, { AxiosError, AxiosResponse } from 'axios';

interface CatalogoItem {
  iqms: number;
  familia: string;
  molde: string;
  imagen: string;
}

class CatalogoChinaGateway {
  private baseURL: string;

  constructor(baseURL: string = "http://localhost:3000/catalogoChina") {
    this.baseURL = baseURL;
  }

  // Obtener todos los elementos
  async getAll(): Promise<CatalogoItem[]> {
    try {
      const response = await axios.get<CatalogoItem[]>(this.baseURL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un elemento por su ID
  async getById(iqms: number): Promise<CatalogoItem> {
    try {
      const response = await axios.get<CatalogoItem>(`${this.baseURL}/iqms/${iqms}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getByMolde(molde: string): Promise<CatalogoItem> {
    try {
      const response = await axios.get<CatalogoItem>(`${this.baseURL}/molde/${molde}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Agregar un nuevo elemento
  async create(data: CatalogoItem): Promise<CatalogoItem> {
    try {
      const response: AxiosResponse<CatalogoItem> = await axios.post(this.baseURL, data);
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
  // Actualizar un elemento por su ID
  async update(iqms: number, data: CatalogoItem): Promise<CatalogoItem> {
    try {
      const response = await axios.put<CatalogoItem>(`${this.baseURL}/${iqms}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un elemento por su ID
  async delete(iqms: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${iqms}`);
    } catch (error) {
      throw error;
    }
  }
}

export default CatalogoChinaGateway;