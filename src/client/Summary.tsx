import React from 'react';
type SummaryProps = {
	correct: number;
	wrong: number;
	questionsAnswered: number;
	restartQuiz: any;
};
const Summary = (props: any) => {
	return (
		<div>
			<h1 className="title">SUMMARY</h1>
			<div className="summary_item">
				<h6 className="summary_text">{`Correct: `}</h6>
				<h4 className="summary_value">{props.correct}</h4>
			</div>
			<div className="summary_item">
				<h6 className="summary_text">{`Wrong: `}</h6>
				<h4 className="summary_value">{props.wrong}</h4>
			</div>
			<div className="summary_item">
				<h6 className="summary_text">{`Questions answered: `}</h6>
				<h4 className="summary_value">{props.questionsAnswered}</h4>
			</div>
			<div className="summary_item">
				<h6 className="summary_text">{`Final Score: `}</h6>
				<h4 className="summary_value">{props.score}%</h4>
			</div>
			<button className="button" onClick={props.restartQuiz}>
				Restart Quiz
			</button>
		</div>
	);
};

export default Summary;
