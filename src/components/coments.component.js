import React, { Component } from 'react';
import KafkaService from "../services/kafka.service";
import axios from 'axios';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentText: ""
    };
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    const id = this.props.id;
    console.log("try ",id);
    const uri = "https://mongoapi-service-btoarriola.cloud.okteto.net/api/comments";
    
    try {
      const response = await axios.get(`${uri}/${id}`);
      const comentarios = response.data ? response.data : [];
  
      this.setState({ comments: comentarios });
    } catch (error) {
      console.log('Error al obtener los comentarios:', error);
    }
  };

  saveComment = (status, comment) => {
    let data = {
      id: 0,
      status: status
    };
 
    console.log(JSON.stringify(data));
 
    KafkaService.comment(this.props.email, this.props.id, comment);
  }

  handleCommentChange = (e) => {
    this.setState({ commentText: e.target.value });
  };

  render() {
    const { comments, commentText } = this.state;

    return (
      <div>
        <form ref="commentForm" onSubmit={this.saveComment}>
          <div className="form-group">
            <label htmlFor="comment">Agregar comentario:</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              ref="comment"
              value={commentText}
              onChange={this.handleCommentChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        {comments.length > 0 ?
          <div className="comments-list">
            {comments.map((comentario) => (
              <div className="comment" key={comentario._id}>
                <h5>{comentario.userId}</h5>
                <p>{comentario.comment}</p>
              </div>
            ))}
          </div>
          :
          <p>Aun no hay comentarios</p>
        }
      </div>
    );
  }
}

export default CommentBox;
