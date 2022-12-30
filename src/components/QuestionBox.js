import React, { useEffect, useState } from "react";
import questions from "../questions";
import "./QuestionBox.css";

export default function QuestionBox(props) {
    let [currentQuestion, changeQuestion] = useState(0);

    let updateScore = props.updateScore;
    let changeEndStatus = props.end;
    let [responseData, updateResponse] = props.response;

    let qData = {
        ...questions[currentQuestion],
        id: currentQuestion + 1,
    };

    let responseDetail=responseData[currentQuestion];
    let checkAnswer = (userAnswer) => {
        let result = qData.options[userAnswer].isCorrect;
        updateScore((prev) => {
            if (result === true) {
                prev.correct++;
                changeResponse({isCorrect:true})
            } else {
                prev.wrong++;
                changeResponse({ isWrong: true });
            }
            return prev;
        });
        if (currentQuestion >= questions.length - 1) {
            changeEndStatus(true);
        } else {
            changeQuestion(currentQuestion + 1);
        }
    };

    let changeResponse=(update)=>{
        updateResponse(prev=>{
            let newRes=[...prev]
            newRes[currentQuestion] = {
                ...prev[currentQuestion],
                ...update,
            };
            return newRes
        })
    }

    let highlightStyle = {
        backgroundColor: responseDetail.isHighlight ? "#ffffff" : "inherit",
        color: responseDetail.isHighlight ? "#8b0000" : "inherit",
    };

    useEffect(() => {
        console.log("reset resposne")
        updateResponse(
            questions.map((elt, i) => ({
                id: i + 1,
                isCorrect: false,
                isWrong: false,
                isHighlight: false,
            }))
        );
    }, [updateResponse]);

    return (
        <div className="QuestionBox">
            <div className="counter">
                Question {qData.id} of {questions.length}
            </div>
            <div className="question" style={highlightStyle}>{qData.text}</div>
            <div className="options">
                {qData.options.map((opt) => {
                    return (
                        <div
                            className="opt btn"
                            onClick={() => checkAnswer(opt.id)}
                            key={opt.id}
                        >
                            {opt.text}
                        </div>
                    );
                })}
            </div>
            <div
                className="blue-btn btn"
                onClick={() =>
                    changeResponse({
                        isHighlight: !responseDetail.isHighlight,
                    })
                }
            >
                {responseDetail.isHighlight ? "UnHighlight" : "Highlight"}
            </div>
        </div>
    );
}
