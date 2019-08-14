import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  url = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}
  getContacts() {
   return  this.http.get(this.url);
  }

  addContact(value: any) {
    // tslint:disable-next-line:prefer-const
    let body = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      company: value.company,
      // tslint:disable-next-line:radix
      phone: parseInt(value.phone),
    };
    return this.http.post(this.url, body);
  }
}
