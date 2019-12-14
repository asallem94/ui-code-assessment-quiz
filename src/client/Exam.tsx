import React from 'react';
import Question from './Question';
import Summary from './Summary';

type ExamState = {
	questionIndex: number;
	correct: number;
	wrong: number;
	questionsAnswered: number;
	exam: any;
	loaded: boolean;
};
class Exam extends React.Component<{}, ExamState> {
	constructor(props: object) {
		super(props);
		this.state = { loaded: false, questionIndex: 0, correct: 0, wrong: 0, questionsAnswered: 0, exam: [] };
		this.displayQuestions = this.displayQuestions.bind(this);
		this.proceed = this.proceed.bind(this);
		this.getExam = this.getExam.bind(this);
	}
	componentDidMount() {
		this.getExam();
	}
	getExam() {
		fetch('http://localhost:4000/api/questions', { method: 'GET' })
			.then((res) => res.json())
			.then((res) => this.initExam(res));
	}
	initExam(res: any) {
		// debugger;
		if (res.results) {
			const exam = this.shuffle(res.results); //shuffle questions
			this.setState({ loaded: true, questionIndex: 0, correct: 0, wrong: 0, questionsAnswered: 0, exam });
		}
	}
	shuffle(arr: any) {
		return arr.sort(() => Math.random() - 0.5);
	}
	proceed(correct: boolean) {
		this.setState({
			questionIndex: this.state.questionIndex + 1,
			questionsAnswered: this.state.questionsAnswered + 1,
			correct: correct ? this.state.correct + 1 : this.state.correct,
			wrong: correct ? this.state.wrong : this.state.wrong + 1
		});
	}

	displayQuestions() {
		if (this.state.exam && this.state.exam[this.state.questionIndex]) {
			const questionItem = this.state.exam[this.state.questionIndex];
			switch (questionItem.type) {
				case 'multiple':
					return (
						<Question
							questionItem={questionItem}
							options={this.shuffle(
								this.shuffle([ questionItem.correct_answer ].concat(questionItem.incorrect_answers))
							)}
							proceed={this.proceed}
						/>
					);
				case 'boolean':
					return (
						<Question questionItem={questionItem} options={[ 'True', 'False' ]} proceed={this.proceed} />
					);
				case 'text':
					return <Question options={[]} questionItem={questionItem} proceed={this.proceed} />;
				default:
					return <h1>the end</h1>;
			}
		}
	}
	render() {
		if (this.state.exam && this.state.exam[this.state.questionIndex]) {
			return <div className="app">{this.displayQuestions()}</div>;
		} else {
			return this.state.loaded ? (
				<Summary
					correct={this.state.correct}
					wrong={this.state.wrong}
					questionsAnswered={this.state.questionsAnswered}
					score={Math.floor(this.state.correct / this.state.questionsAnswered * 100)}
					restartQuiz={this.getExam}
				/>
			) : null;
		}
	}
}

export default Exam;
