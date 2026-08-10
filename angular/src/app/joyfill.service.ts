import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JoyfillService {

  url = 'https://api-joy.joyfill.io/v1';

  headers = { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <REPLACE WITH YOUR USER ACCESS TOKEN>'
  }

  constructor() { }

  async getTemplate(identifier: string): Promise<any> {

    try {
      const data = await fetch(`${this.url}/templates/${identifier}`, {
        method: 'GET',
        headers: this.headers
      });

      if (data.status !== 200) return null; 
      
      return await data.json();
    } catch (error) {
      console.error(error);
    }


  }

  async updateTemplate(identifier: string, data: object): Promise<any> {
    
    try {
      const response = await fetch(`${this.url}/templates/${identifier}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      if (response.status !== 200) return null; 

      return await response.json();
    } catch (error) {
      console.error(error);
    }
    

  }

}
