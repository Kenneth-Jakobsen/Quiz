import decode from './functions/decode';
export default function Quiz(props){
    const questions =decode(props.question)
    const choiesElem = props.choices.map((elem,index) =>{
      const isChecked = props.value === elem;
      const showResult = props.quizComplete && elem === props.correctAnswer ? "correct": ''
      const style = {backgroundColor: isChecked ? "#D6DBF5" : '' }
        return (
            <label key={index} className={showResult} style={style}>
              <input
                type="radio"
                id={props.id}
                onChange={props.handleClick}
                value={elem}
                checked={isChecked}
                name={props.id}
              />
              {decode(elem)}
            </label>
          )
    })
      return (
        <div className='quiz-div'>
          <h2 className='question'>{questions}</h2>
          <div className='choices-div'>{choiesElem}</div>
        </div>
      );
}