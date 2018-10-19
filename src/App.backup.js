import React, { Component } from 'react';
import './App.css';

// the actual quiz
const questions = [
  'What are DigitalOcean Cloud Firewalls?',   //1
  'How are Cloud Firewalls different from the alternatives?', //2
  'How are Cloud Firewalls "Secure by default"?', //3
  'What makes Cloud Firewalls easy to configure?', //4
  'How does Cloud Firewalls simplify security as infrastructure grows?', //5 
  'What regions are Cloud Firewalls available?', //6
  'How much do Cloud Firewalls cost?', //7
  'Where can I find more detailed information about Cloud Firewalls?']; //8

const answers = [
 'Cloud Firewalls is a new product that improves Droplet security by reducing the surface area of attack.  Customers define what ports are visible and control which resources can access them.', //1
 'Unlike alternative solutions, customers can protect their cloud servers without installing or configuring any server software and can deploy in a matter of minutes.',  //2
 'By default, Cloud Firewalls starts from the principle of least privilege and only allows access to user defined services and ports.' , //3
 'There is no need to install software on each Droplet or manage individual configuration files. You can use the dashboard, CLI, API or client libraries to configure your firewalls', //4
 'Security rules are managed in one place and can easily be applied to new Droplets and Load Balancers. A centralized view of all rules applied across your infrastructure makes it easy to see how you are protected.  And rules get applied instantly to every tagged Droplet.', //5
 'Cloud Firewalls are available in all DigitalOcean regions.', 
 'Cloud Firewalls are free for all Droplet customers.',
 'Check out this Community article: https://www.digitalocean.com/community/tutorials/an-introduction-to-digitalocean-cloud-firewallst'];
//'On Community of course! Check out the Introduction to Cloud Firewalls.'];


function getCount() {
  return questions.length;
}
function getQuestion(i) {
  console.log("With question number:"+i);

  return <div>Question: <span style={{color: 'red'}}>{questions[i - 1]}</span></div>;

}
function getAnswer(i) {
  return answers[i - 1];
}
// the actual quiz is done, boring stuff follows...

class App extends Component {
  constructor() {
    super();
    this.state = {
      question: getQuestion(1),
      answer: getAnswer(1),
      total: getCount(),
      i: 1,
    };
  }
  
  nextQuestion() {
    this.setState({
      question: getQuestion(this.state.i + 1),
      answer: getAnswer(this.state.i + 1),
      i: this.state.i + 1,
    });
  }
  
  render() {
    return (
      <div>
        {
          this.state.total 
            ? <Count i={this.state.i} total={this.state.total} />
            : null
        }
        <Flashcard 
          question={this.state.question}
          answer={this.state.answer}
        />
        {
          (this.state.total && this.state.i >= this.state.total)
            ? null
            : <button 
                className="nextButton" 
                onClick={this.nextQuestion.bind(this)}>
                next...
              </button>
        }
      </div>
    );
  }
}

class Flashcard extends Component {

  constructor() {
    super();
    this.state = {
      reveal: false,
    };
  }


  componentWillReceiveProps() {
    this.setState({reveal: false});
  }

  flip() {
    this.setState({
      reveal: !this.state.reveal,
    });
  }

  render() {
    const className = "card flip-container" + (this.state.reveal ? ' flip' : '');
    return (
      <div><center>
        <div className={className} onClick={this.flip.bind(this)}>
          <div className="flipper">
            <div className="front" style={{display: this.state.reveal ? 'none' : ''}}>
              {this.props.question}
            </div>
            <div className="back"  style={{display: this.state.reveal ? '' : 'none'}}>
              {this.props.answer}
            </div>
          </div>
        </div>
        <button className="answerButton" onClick={this.flip.bind(this)}>flip</button>
      </center></div>
    );
  }
}

const Count = ({i, total}) =>
  <div>
    Question {i} / {total}
  </div>;

export default App;
