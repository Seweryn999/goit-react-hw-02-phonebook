import React, { Component } from 'react';
import { Form } from './form/form';
import Input from './input/input';
import ContactList from './contact-list/contact-list';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase()),
    );

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
    }));
  };

  isName = (contacts = this.state.contacts) =>
    contacts.name.toLowerCase() === this.filter.toLowerCase();

  submitForm = callback => {
    if (
      this.state.contacts.filter(contact => contact.name === callback.name)
        .length !== 1
    ) {
      let formState = { id: this.idCreate(), ...callback };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, formState],
      }));
    } else {
      alert(`${callback.name} is already in contacts.`);
    }
  };

  idCreate = () => nanoid();

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form handler={this.submitForm} />
        <h2>Contacts</h2>
        <Input
          label="Find contacts by name"
          type="text"
          dataName="filter"
          validation="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Search is not case sensitive"
          funcChange={this.changeHandler}
          stateField={this.state.filter}
        />
        <ContactList
          arr={this.filterContacts()}
          btnHandler={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
