import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('contactsAnimation', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({transform: 'translateY(-100px)', opacity: '0'}),
        animate('1000ms ease-in-out')
      ])
    ])
  ]
})

export class ContactsComponent implements OnInit {
  input = {
    width: '360px',
    background: '#fff',
    '_box-shadow': '0 6px 10px 0 rgba(0, 0, 0, .1)',
    get 'box-shadow'() {
      return this['_box-shadow'];
    },
    set 'box-shadow'(value) {
      this['_box-shadow'] = value;
    },
    border: '0',
    outline: '0',
    padding: '22px 18px'
  };

  url = 'http://localhost:3000/contact';
  public contacts;
  constructor(private ContactService: ContactsService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.ContactService.getContacts()
              .subscribe(
                data => { this.contacts = data; },
                err => console.log(err)
              );
  }
  addContact(value: any) {
    const contact = value;
    this.ContactService.addContact(contact)
    .subscribe(
      data => { this.getContacts();
                return true;
     },
      error => {
        console.error('error saving contact');
        return Observable.throw(error);
      }
    );
  }
}
