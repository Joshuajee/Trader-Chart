import MovingAverages from "./MovingAverages"

const Modal = (props) => {

    const { setModal, addIndicator, indicators } = props

    return (
        <div>

            <MovingAverages 
                addIndicator={addIndicator}
                indicators={indicators}
                setModal={setModal}/>


        </div>
    )

}

export default Modal