import './Title.css';



const Title = (props: {text:string}) => {
  return (
    <section className="title">
        <h1>{props.text}</h1>
    </section>
  )
}

export default Title;
