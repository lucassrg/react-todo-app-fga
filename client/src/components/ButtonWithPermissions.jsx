import { Button } from "flowbite-react";
import { useState } from "react";

const ButtonWithPermission = ({label, operation, role}) => {
    const [permission, setPermission] = useState(operation);

    const allowedBtnStyle='';
    const notAllowedBtnStyle='';


    return (
        <>
        <Button size='sm' className={allowedBtnStyle} color="blue" onClick={() => handleOpenModal(operation)}>{label}</Button>
        </>
    )
}

export default ButtonWithPermission;