import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';
import Input from 'components/input/input';
import Button from 'components/button/button';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  submitHandler = () => {
    return this.state;
  };

  formReset = () => {
    this.setState({ name: '', number: '' });
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.handler(this.submitHandler());
          this.formReset();
        }}
        className={css.form}
      >
        <Input
          label="Name"
          type="text"
          dataName="name"
          validation="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          funcChange={this.changeHandler}
          stateField={this.state.name}
        />
        <Input
          label="Number"
          type="tel"
          dataName="number"
          validation="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          funcChange={this.changeHandler}
          stateField={this.state.number}
        />
        <Button label="Add contact" typeOfBtn="submit" />
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  handler: PropTypes.func.isRequired,
};
