import React from 'react';
import axios from 'axios';
import './App.css';

const testData = [
  {name: "Ayobami Fadeni", avatar_url: "https://avatars.githubusercontent.com/u/53301381?v=4", company: "Decagon"},
  {name: "Sophia Okito", avatar_url: "https://avatars.githubusercontent.com/u/63434504?v=4", company: "Quabbly"},
  {name: "Victor Umeh", avatar_url: "https://avatars.githubusercontent.com/u/41862157?v=4", company: "Decagon"},
{name: "Fabian Emmanuel", avatar_url: "https://avatars.githubusercontent.com/u/40477488?v=4", company: "Decagon"}
];

const CardList = (props) => (
<div>
  {props.profiles.map(profile => <Card {...profile}/>)}
</div>
);

class Card extends React.Component {
render() {
  const profile = this.props;
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} alt={"profile-pic"}/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}
}

class Form extends React.Component {
state = { userName: '' };
handleSubmit = async (event) => {
  event.preventDefault();
  const res = await axios.get(`https://api.github.com/users/${this.state.userName}`)
  this.props.onSubmit(res.data);
  this.setState({userName: ''});
};
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <input 
        type="text" 
        value={this.state.userName}
        onChange={event => this.setState({ userName: event.target.value })}
        placeholder="GitHub username" 
        required 
      />
      <button>Add card</button>
    </form>
  );
}
}

class App extends React.Component {
state = {
  profiles: testData,
};
addNewProfile = (profileData) => {
  this.setState(prevState => ({
    profiles: [...prevState.profiles, profileData]
  }));
}

render() {
  return (
    <div>
      <div className="header">{this.props.title}</div>
      <Form onSubmit={this.addNewProfile} />
      <CardList profiles={this.state.profiles} />
    </div>
  );
}	
}

export default App;
