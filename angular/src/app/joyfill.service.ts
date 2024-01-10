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

  async getTemplate(identifier: string): Promise<object> {

    const data = await fetch(`${this.url}/templates/${identifier}`, {
      method: 'GET',
      headers: this.headers
    });
    
    return await data.json();

  }

  async updateTemplate(identifier: string, data: object): Promise<object> {
    
    const response = await fetch(`${this.url}/templates/${identifier}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });

    return await response.json();

  }

}
