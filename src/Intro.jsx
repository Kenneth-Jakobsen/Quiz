export default function Intro(props){
    return(
        <main>
        <h1 className="intro--header">Quiz made with React</h1>
        <button className="submit--btn" onClick={props.handleClick}>Start Quiz</button>
        </main>

    )
}