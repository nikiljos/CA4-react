import React, { useEffect, useState } from "react";
import "./Result.css";

export default function Result(props) {
    let [score, updateScore] = props.score;
    let changeEndStatus = props.end;
    let response = props.response;

    let { correct, total } = score;
    let percentage = (correct / total) * 100;

    let [detail, updateDetail] = useState({
        correct: [],
        wrong: [],
        highlight: [],
    });

    useEffect(() => {
        let newDetail = {
            correct: [],
            wrong: [],
            highlight: [],
        };
        response.forEach((elt) => {
            console.log("dsfdf", elt);
            if (elt.isCorrect) {
                newDetail.correct.push(elt.id);
            } else if (elt.isWrong) {
                newDetail.wrong.push(elt.id);
            }
            if (elt.isHighlight) {
                newDetail.highlight.push(elt.id);
            }
        });
        updateDetail(newDetail);
    }, []);
    console.log(detail);
    let newGame = () => {
        updateScore((prev) => ({
            ...prev,
            correct: 0,
            wrong: 0,
        }));
        changeEndStatus(false);
    };

    return (
        <div className="Result">
            <div className="status">
                Score: {correct} of {total}
            </div>
            <div className="percent">{percentage}%</div>

            <div className="detail">
                <QList title="Correct" data={detail.correct} />
                <QList title="Wrong" data={detail.wrong} />
                <QList title="Highlighted" data={detail.highlight} />
            </div>

            <button onClick={newGame} className="blue-btn">New Game</button>
        </div>
    );
}

let QList = (props) => (
    <div>
        <h4>{props.title}</h4>
        <div className="q-list">
            {props.data.length > 0
                ? props.data.map((elt) => <div className="QListBox">{elt}</div>)
                : "-"}
        </div>
    </div>
);
