import React, { Component } from 'react';
import './App.css';

// the actual quiz
const questions = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Hawaii',
  'Florida',
  'Georgia',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'North Carolina',
  'North Dakota',
  'New York',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming']; 

const answers = [
  'Montgomery',
  'Juneau',
  'Phoenix',
  'Little Rock',
  'Sacramento',
  'Denver',
  'Hartford',
  'Dover',
  'Honolulu',
  'Tallahassee',
  'Atlanta',
  'Boise',
  'Springfield',
  'Indianapolis',
  'Des Moines',
  'Topeka',
  'Frankfort',
  'Baton Rouge',
  'Augusta',
  'Annapolis',
  'Boston',
  'Lansing',
  'St. Paul',
  'Jackson',
  'Jefferson City',
  'Helena',
  'Lincoln',
  'Carson City',
  'Concord',
  'Trenton',
  'Santa Fe',
  'Raleigh',
  'Bismarck',
  'Albany',
  'Columbus',
  'Oklahoma City',
  'Salem',
  'Harrisburg',
  'Providence',
  'Columbia',
  'Pierre',
  'Nashville',
  'Austin',
  'Salt Lake City',
  'Montpelier',
  'Richmond',
  'Olympia',
  'Charleston',
  'Madison',
  'Cheyenne'];

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
