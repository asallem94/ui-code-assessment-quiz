import React from 'react';

type QuestionProps = {
	proceed: any;
	options: any;
	questionItem: any;
};
type QuestionState = {
	// questionsAnswered: number;
	selectedAnswer: string;
	options: any;
};

class Question extends React.Component<QuestionProps, QuestionState> {
	constructor(props: any) {
		super(props);
		this.state = { options: this.shuffle(this.props.options), selectedAnswer: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateAnswer = this.updateAnswer.bind(this);
		this.updateShortAnswer = this.updateShortAnswer.bind(this);
	}
	componentDidUpdate(prevProps: any) {
		if (prevProps.questionItem.question !== this.props.questionItem.question) {
			this.setState({ options: this.shuffle(this.props.options), selectedAnswer: '' });
		}
	}
	shuffle(arr: any) {
		return arr; //? arr.sort(() => Math.random() - 0.5) : null;
	}
	updateAnswer(ans: string) {
		return (event: any) => {
			this.setState({ selectedAnswer: ans });
		};
	}
	updateShortAnswer(event: any) {
		event.preventDefault();
		this.setState({ selectedAnswer: event.currentTarget.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		this.props.proceed(
			this.state.selectedAnswer.trim().toLowerCase() ===
				this.props.questionItem.correct_answer.trim().toLowerCase()
		);
	}
	render() {
		const options =
			this.props.questionItem.type === 'text' ? (
				<input
					className="textbox"
					type="text"
					value={this.state.selectedAnswer}
					onChange={this.updateShortAnswer}
				/>
			) : (
				this.state.options.map((el: string) => (
					<label key={el}>
						<input
							className="options"
							type="radio"
							value={el}
							checked={el === this.state.selectedAnswer}
							onChange={this.updateAnswer(el)}
						/>
						{el}
					</label>
				))
			);
		return (
			<form className="question_container" onSubmit={this.handleSubmit}>
				<h4 className="question">
					{this.props.questionItem.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
				</h4>
				<div className="options_container">{options}</div>
				<input className="button" type="submit" value="Next" />
			</form>
		);
	}
}
export default Question;
