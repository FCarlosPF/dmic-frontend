import Header from "../../components/Header/Header"
import { Stage } from "../../components/Stages/Stage"
import Title from "../../components/Title/Title"

function Incoming() {
    return (
        <>
            <Header />
            <Title text="INCOMING" />
            <Stage stage="Incoming" />
        </>
    )
}

export default Incoming
