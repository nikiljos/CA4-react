import { useState } from "react";
import './Quiz.css'
import questions from "../questions";
import Result from "./Result";
import QuestionBox from "./QuestionBox";

const Quiz = () => {

    let [score, updateScore] = useState({
        correct: 0,
        wrong: 0,
        total: questions.length,
    });
    let [gameEnd, changeEndStatus] = useState(false);
    let [responseData, updateResponse] = useState(
        questions.map((elt, i) => ({
            id: i+1,
            isCorrect: false,
            isWrong: false,
            isHighlight: false,
        }))
    );
    return (
        <div className="Quiz">
            {!gameEnd ? (
                <QuestionBox
                    updateScore={updateScore}
                    end={changeEndStatus}
                    response={[responseData, updateResponse]}
                />
            ) : (
                <Result
                    score={[score, updateScore]}
                    end={changeEndStatus}
                    response={responseData}
                />
            )}
        </div>
    );
};

export default Quiz;
