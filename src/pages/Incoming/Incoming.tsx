import Header from "../../components/Header/Header"
import { IncomingStage } from "../../components/Stages/Incoming/IncomingStage"
import Title from "../../components/Title/Title"

function Incoming() {
    return (
        <>
            <Header />
            <Title text="INCOMING" />
            <IncomingStage />
        </>
    )
}

Incoming.propTypes = {}

export default Incoming
