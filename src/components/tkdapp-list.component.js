import React, { Component } from "react";
import TkdAppDataServices from "../services/tkdapp.services"
import Coments from "./coments.component";
import Likes from "./likes.component"; 
import Tkdapp from "./tkdapp.component"

export default class TkdappList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTkdapp = this.setActiveTkdapp.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      tkdapps: [],
      currentTkdapp: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = TkdAppDataServices.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let tkdapp = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      tkdapp.push({
        id: id,
        title: data.title,
        description: data.description,
        file: data.file,
        published: data.published,
        likes: data.likes,
      });
    });

    this.setState({
      tkdapps: tkdapp,
    });
  }

  refreshList() {
    this.setState({
      currentTkdapp: null,
      currentIndex: -1,
    });
  }

  setActiveTkdapp(tkdapp, index) {
    this.setState({
      currentTkdapp: tkdapp,
      currentIndex: index,
    });
  }
  render() {
    const { tkdapps: tkdapp, currentTkdapp } = this.state;

    // Define el número de columnas y filas para el grid
    const columns = 3;

    // Establece los estilos para el grid y las imágenes
    const gridStyles = {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: "10px",
    };
    const imageStyles = {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      borderRadius: "7px",
      aspectRatio: "1/1",
    };
    

    return (
      <div style={{margin: 15}}>
        <h4>Poomsae feed</h4>
        <div className="row" style={{ display: "flex", justifyContent: "space-between"}}>
          <div className="col" style={{minWidth: '60%'}}>
            <div style={gridStyles}>
              {tkdapp.map((tkdapp, index) => (
                <div
                  className="tkdapp-item"
                  style={{ gridColumn: `span ${1}`, gridRow: `span ${1}` }}
                  key={index}
                >
                  {tkdapp.file.includes("mp4") || tkdapp.file.includes("ogg") || tkdapp.file.includes("webm") ? (
                    <video
                      src={tkdapp.file}
                      alt={tkdapp.title}
                      style={imageStyles}
                      onClick={() => this.setActiveTkdapp(tkdapp, index)}
                    />
      
                  ) : (
                    <img
                      src={tkdapp.file}
                      alt={tkdapp.title}
                      style={imageStyles}
                      onClick={() => this.setActiveTkdapp(tkdapp, index)}
                    />
                  )}<br/><br/>
                  <div key={index} className="tkdapp-item" style={{}}>
                    <Likes likes={tkdapp.likes} id={tkdapp.id} email={this.props.email} refreshList={this.refreshList} />
                    <Coments id={tkdapp.id} email={this.props.email} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col" style={{backgroundColor: '#f0f0f0', padding:20, borderRadius: '20px'}}>
            <div className="col-md-6" >
              <div>
                {currentTkdapp ? (
                  <Tkdapp
                    tkdapp={currentTkdapp}
                    refreshList={this.refreshList}
                  />
                ) : (
                    <div>
                      <br />
                      <p>Please click on a Poomsae...</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
    
  }
}
