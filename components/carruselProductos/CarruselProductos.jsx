import AliceCarousel from 'react-alice-carousel'

const handleOnDragStart = (e) => e.preventDefault()

export default class CarruselProductos extends React.Component{
    render(){
        return <div className="_CarruselProductos">
        <AliceCarousel mouseDragEnabled={true} autoPlay={false} mouseTrackingEnabled={true}>
            <div>
                Algun texto
                <img onDragStart={handleOnDragStart} src="https://firebasestorage.googleapis.com/v0/b/mi-club2ruedas.appspot.com/o/images%2Fpublicaciones%2Fcerakote.png?alt=media&token=f5e70ab2-5675-4537-9e6a-196f859352a3" />        
            </div>
            <div>
                Otro texto
                <img onDragStart={handleOnDragStart} src="https://firebasestorage.googleapis.com/v0/b/mi-club2ruedas.appspot.com/o/images%2Fpublicaciones%2Fcerakote.png?alt=media&token=f5e70ab2-5675-4537-9e6a-196f859352a3" />
            </div>
            </AliceCarousel>
        </div>
    }
}