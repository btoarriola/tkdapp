import React, { Component } from 'react';
import KafkaService from "../services/kafka.service";
import axios from 'axios';


class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arraycomments: []
    };
  }

  componentDidMount() {
    this.fetchComments();
  }
  
  fetchComments = async () => {
    const id = this.props.id;
    console.log("comentario ", id)
    const uri = "https://mongoapi-service-btoarriola.cloud.okteto.net/api/comments";
    
    try {
      const response = await axios.get(`${uri}/${id}`);
      const comentarios = response.data ? response.data : [];
  
      this.setState({ arraycomments: comentarios });
      console.log()
    } catch (error) {
      console.log('Error al obtener los comentarios:', error);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const comment = this.refs.comment.value.trim();
    if (!comment) {
      return;
    }
    this.setState((prevState) => {
      return {
        arraycomments: prevState.arraycomments.concat(comment)
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
    const { arraycomments } = this.state;

    return (
      <div>
        <form ref="commentForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Agregar comentario:</label>
            <textarea className="form-control" id="comment" rows="3" ref="comment"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        {arraycomments.length > 0 ?
          <div className="list-group list-group-flush">
            {arraycomments.map((comentario) => (
          <div className="commentbox" key={comentario._id} style={{backgroundColor:'#cacaca', marginBottom:4, marginTop:4, padding:3, borderRadius: '0px 15px 15px 15px'}}>
            <p style={{fontSize:13, fontWeight:'bold', marginBottom:0}}>{comentario.userid}</p>
            <p style={{fontSize:14, marginLeft:4,marginBottom:0}}>{comentario.message}</p>
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