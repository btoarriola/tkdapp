import React, { Component } from "react";
import TkdAppDataServices from "../services/tkdapp.services";

import Coments from "./coments.component";
import Likes from "./likes.component"; 

export default class Tkdapp extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTkdapp = this.updateTkdapp.bind(this);
    this.deleteTkdapp = this.deleteTkdapp.bind(this);

    this.state = {
      currentTkdapp: {
        id: null,
        title: "",
        description: "",
        file: "",
        published: false,
        likes: null,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tkdapp } = nextProps;
    if (prevState.currentTkdapp.id !== tkdapp.id) {
      return {
        currentTkdapp: tkdapp,
        message: ""
      };
    }

    return prevState.currentTkdapp;
  }

  componentDidMount() {
    this.setState({
        currentTkdapp: this.props.tkdapp,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTkdapp: {
          ...prevState.currentTkdapp,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
        currentTkdapp: {
        ...prevState.currentTkdapp,
        description: description,
      },
    }));
  }


  updatePublished(status) {
    TkdAppDataServices.update(this.state.currentTkdapp.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
            currentTkdapp: {
            ...prevState.currentTkdapp,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTkdapp() {
    const data = {
      title: this.state.currentTkdapp.title,
      description: this.state.currentTkdapp.description,
    };

    TkdAppDataServices.update(this.state.currentTkdapp.id, data)
      .then(() => {
        this.setState({
          message: "The poomsae was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTkdapp() {
    TkdAppDataServices.delete(this.state.currentTkdapp.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { currentTkdapp } = this.state;
    const imageStyles = {
      width: "150%",
      height: "auto",
      objectFit: "cover",
      borderRadius: "7px",
    };
    return (
      <div>
        <h4>{currentTkdapp.title}</h4>
        <button onClick={() => this.setState({ showEdit: true })}>
              Editar publicación
            </button>
            <button onClick={() => this.setState({ showEdit: false })}>
              Ver publicación
            </button>
        {currentTkdapp ? (
          <div className="edit-form">
            {currentTkdapp.file.includes("mp4") || currentTkdapp.file.includes("ogg") || currentTkdapp.file.includes("webm") ? (
              <video
                src={currentTkdapp.file}
                alt={currentTkdapp.title}
                style={imageStyles}
                autoPlay
              />
            ) : (
              <img
                src={currentTkdapp.file}
                alt={currentTkdapp.title}
                style={imageStyles}
              />
            )}
    
            {this.state.showEdit ? (
              <div className="editPublicacion">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={currentTkdapp.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentTkdapp.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
    
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentTkdapp.published ? "Published" : "Pending"}
                  </div>
                </form>
    
                {currentTkdapp.published ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.updatePublished(true)}
                  >
                    Publish
                  </button>
                )}
    
                <button className="btn btn-danger" onClick={this.deleteTkdapp}>
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={this.updateTkdapp}
                >
                  Update
                </button>
    
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div className="verPublicacion">
                <p>{currentTkdapp.description}</p>
                <div className="tkdapp-item" style={{}}>
                    <Likes likes={currentTkdapp.likes} refreshList={this.refreshList} />
                    <Coments />
                  </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Poomsae...</p>
          </div>
        )}
      </div>
    );
    
  }
}