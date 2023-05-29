import React, { Component } from 'react';
import KafkaService from "../services/kafka.service";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const comment = this.refs.comment.value.trim();
    if (!comment) {
      return;
    }
    this.setState((prevState) => {
      return {
        comments: prevState.comments.concat(comment)
      };
    });
    this.refs.commentForm.reset();
    // Llamar a la función saveComment para enviar el comentario
    this.saveComment(1,comment);
  }
  
  saveComment = (status, comment) => {
    let data = {
      id: 0,
      status: status
    };
 
    console.log(JSON.stringify(data));
 
    KafkaService.comment(this.props.email, this.props.id, comment);
  }

  render() {
    const { comments } = this.state;

    return (
      <div>
        <form ref="commentForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Agregar comentario:</label>
            <textarea className="form-control" id="comment" rows="3" ref="comment"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        {comments.length > 0 ?
          <ul className="list-group list-group-flush">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item">{comment}</li>
            ))}
          </ul>
          :
          <p>Aun no hay comentarios</p>
        }
      </div>
    );
  }
}

export default CommentBox;
