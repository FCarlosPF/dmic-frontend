import axios, { AxiosResponse } from "axios";

interface RegisterAuthDto {
  email: string;
  password: string;
  nombre?: string;
}

interface LoginAuthDto {
  email: string;
  password: string;
}

class LoginGateway {
  private baseURL: string;


  constructor(baseURL: string = "http://localhost:3000/auth") {
    this.baseURL = baseURL;
  }

  public async register(user: RegisterAuthDto): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/register`, user);
      return response;
    } catch (error) {
      console.error("Error durante el logeo:", error);
      throw new Error("Hubo un problema durante la autenticación.");
    }
  }

  public async login(user: LoginAuthDto): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/login`, user);
      return response;
    } catch (error) {
      console.error("Error durante el registro:", error);
      throw new Error("Hubo un problema durante la autenticación.");
    }
  }
}

export default LoginGateway;
