import React, { Component } from "react";
import tkdappDataService from "../services/tkdapp.services";

import "firebase/compat/storage";
import firebase from "firebase/compat/app";
export const storage = firebase.storage();

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.saveTkdapp = this.saveTkdapp.bind(this);
    this.newTkdapp = this.newTkdapp.bind(this);

    this.state = {
      title: "",
      description: "",
      published: false,
      file: null,
      submitted: false,
      likes: null,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeFile(e) {
    console.log(e.target.files[0])
    this.setState({
      file: e.target.files[0],
    });
  }

  saveTkdapp() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      file: this.state.file,
      published: false,
      likes:{0,0,0,0,0,0},
    };

    tkdappDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTkdapp() {
    this.setState({
      title: "",
      description: "",
      file: null,
      published: false,
      submitted: false,
    });
  }

  handleUpload(e, file) {
    e.preventDefault();
    console.log(file);
    alert(file.name);

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    uploadTask.on("state_changed", console.log, console.error, () =>  {
       storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((myurl) =>  { 
                    alert(myurl);
                    this.setState({
                      file: myurl,
                    });
             });

    });

  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTkdapp}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div>
               <form onSubmit={ (event) => {
                       this.handleUpload(event, this.state.file)
                       }} >
                 <input type="file" onChange={(event)=> { 
                                this.onChangeFile(event) 
              }} />
                <button disabled={!this.state.file}>upload to firebase</button>
              </form>
              <img src={this.url} alt="" />
            </div>

            <button onClick={this.saveTkdapp} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
