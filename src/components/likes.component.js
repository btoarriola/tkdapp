import React, { Component } from 'react';
import './likes.css';
import KafkaService from "../services/kafka.service";
import axios from 'axios';

class ReactionsMenu extends Component {
  constructor(props) {
    super(props);
    this.fetchReactions();
    this.state = {
      likes: {
        like: props.likes[0] || 0,
        love: props.likes[1] || 0,
        laugh: props.likes[2] || 0,
        cry: props.likes[3] || 0,
        wow: props.likes[4] || 0,
        angry: props.likes[5] || 0
      },
      isOpen: false
    };
  }

  componentDidMount() {
    this.fetchReactions();
  }

  fetchReactions = async () => {
    try {
      
      const id = this.props.id;
      console.log("try ",id);
      const uri = "https://mongoapi-service-btoarriola.cloud.okteto.net/api/reactions";
      const responseLike = await axios.get(`${uri}/${id}/like`);
      const likeCount = responseLike.data ? responseLike.data.n : 0;
      const responseLove = await axios.get(`${uri}/${id}/love`);
      const loveCount = responseLove.data ? responseLove.data.n : 0;
      const responseLaugh = await axios.get(`${uri}/${id}/laugh`);
      const laughCount = responseLaugh.data ? responseLaugh.data.n : 0;
      const responseSad = await axios.get(`${uri}/${id}/cry`);
      const sadCount = responseSad.data ? responseSad.data.n : 0;
      const responseWow = await axios.get(`${uri}/${id}/wow`);
      const wowCount = responseWow.data ? responseWow.data.n : 0;
      const responseAngry = await axios.get(`${uri}/${id}/angry`);
      const angryCount = responseAngry.data ? responseAngry.data.n : 0;

      this.setState({
        likes: {
          like: likeCount,
          love: loveCount,
          laugh: laughCount,
          cry: sadCount,
          wow: wowCount,
          angry: angryCount
        }
      });
    } catch (error) {
      console.log('Error al obtener las reacciones:', error);
    }
  };

  handleClick = (reaction) => {
    const { likes } = this.state;
    this.setState({ likes: { ...likes, [reaction]: likes[reaction] + 1 }, isOpen: false });
  };

  handleMenuClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  saveLike = (e, status, reaction) => {
    let data = {
      id: 0,
      status: status
    };

    console.log(JSON.stringify(data));

    KafkaService.reaction(this.props.email, this.props.id, reaction);
    e.preventDefault();
  };

  render() {
    const { likes } = this.state;

    return (
      <div className="reactions-menu">
        <div className="reactions-menu-dropdown">
          {Object.keys(likes).map((reaction) => (
            <button
              key={reaction}
              className="reaccion"
              onClick={(e) => {
                e.preventDefault();
                this.saveLike(e, 1, reaction);
                this.handleClick(reaction);
              }}
            >
              <span role="img" aria-label={reaction}>
                {reaction === 'like' ? '\u{1F44D}' :
                  reaction === 'love' ? '\u{2764}' :
                    reaction === 'laugh' ? '\u{1F602}' :
                      reaction === 'cry' ? '\u{1F62D}' :
                        reaction === 'wow' ? '\u{1F62E}' :
                          reaction === 'angry' ? '\u{1F620}' : null}
              </span>
              <span className="count">{likes[reaction]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ReactionsMenu;
