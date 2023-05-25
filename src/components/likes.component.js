import React, { Component } from 'react';
import './likes.css';
import KafkaService from "../services/kafka.service";

class ReactionsMenu extends Component {
  constructor(props) {
    super(props);
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

  componentDidUpdate(prevProps) {
    if (prevProps.likes !== this.props.likes) {
      const { likes } = this.props;
      this.setState({
        likes: {
          like: likes[0] || 0,
          love: likes[1] || 0,
          laugh: likes[2] || 0,
          cry: likes[3] || 0,
          wow: likes[4] || 0,
          angry: likes[5] || 0
        }
      });
    }
  }

  handleClick = (reaction) => {
    const { likes: reactions } = this.state;
    this.setState({ likes: { ...reactions, [reaction]: reactions[reaction] + 1 }, isOpen: false });
  }

  handleMenuClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  saveLike(e, status,reaction) {
  
    let data = {
      id: 0,
      status: status
    };
 
    console.log(JSON.stringify(data));
 
    KafkaService.reaction("btoarriola","objintento",reaction);
    e.preventDefault();
  }


  render() {
    const { likes } = this.state;

    return (
      <div className="reactions-menu">
        
          <div className="reactions-menu-dropdown">
            {Object.keys(likes).map((reaction) => (
              <button key={reaction} className='reaccion' onClick={(e) => {
                e.preventDefault();
                this.saveLike(e, 1,reaction);
                this.handleClick(reaction);
              }}>
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
