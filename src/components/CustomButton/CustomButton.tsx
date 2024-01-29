import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CustomButton = (props: { text: string, path: string , storage? : string , storageKey? : string }) => {

    const navigate = useNavigate();

    function handleClick() {
        navigate(props.path)
        props.storage && localStorage.setItem(`${props.storageKey}`, `${props.storage}`)
    }

    return (

        <Button
            variant="dark"
            className="btn-catalogo"
            onClick={handleClick}
        >
            {props.text}
        </Button>

    )
}




