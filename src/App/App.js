import React, { Component } from 'react';
import './App.css';
import CommentForm from "../comment/comment";
import firebase from "../../firebase/firebase";

class App extends Component {
  state = {
    form: {
      name: "",
      comment: ""
    }
  };
  render() {
    const { name, comment } = this.state.form;
    return (
      <div className="App">
        <CommentForm
          name={name}
          comment={comment}
          onChangeName={this.onChangeName}
          onChangeComment={this.onChangeComment}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
  onChangeName = event => {
    const { value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        name: value
      }
    });
  };
  
  onChangeComment = event => {
    const { value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        comment: value
      }
    });
  };
}

onSubmit = async event => {
  event.preventDefault(); // previne que o browser atualize a página
  // armazenamos um objeto com os dados do state + a data atual
  const comment = {
    ...this.state.form,
    createdAt: new Date().getTime()
  };
  // mandamos o firebase armazenar no ref "comments", nosso comentário atual
  await firebase
    .database()
    .ref("comments")
    .push(comment);
  // após o comentário ser adicionado, vamos limpar o formulário
  this.setState({
    form: {
      name: "",
      comment: ""
    }
  });
};

export default App;
