import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyField: false
    }
  }
  _handleFocus = text => { }

  _handleFocusOut = text => { }

  save = text => this.props.save(text, this.props.column, this.props.id)

  isvalidate = text => {

    if (text.trim() === "") {
      this.setState({
        emptyField: true
      })
      return false;
    }
    this.setState({
      emptyField: false
    })

    return true
  }

  cancel = () => { }

  render() {
    return (
      <EasyEdit
        type={this.props.type}
        onSave={this.save}
        onCancel={this.cancel}
        onFocus={this._handleFocus}
        onBlur={this._handleFocusOut}
        saveButtonLabel="Save"
        cancelButtonLabel="Cancel"
        attributes={{ name: this.props.name, id: this.props.value + '-' + this.props.id }}
        instructions=""
        value={this.props.value}
        options={this.props.options}
        allowEdit={this.props.edit === undefined ? true : this.props.edit}
        onValidate={this.isvalidate}
        validationMessage={this.state.emptyField ? "Please fill in the field" : ''}
      />
    );
  }
}
export default Editor;
