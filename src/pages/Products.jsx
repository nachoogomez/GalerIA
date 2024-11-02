import { useSelector } from "react-redux"
import CardProduct from "../components/card-product/CardProduct"

const Products = () => {

 let products = useSelector(state => state.products.products)

  return (
    <section className="max-w-screen-xl flex flex-wrap gap-5 justify-items-center mt-6">
        {
          Object.entries(products).map(([,productos]) => {
            return productos.map((producto) => {       
                return <CardProduct {...producto} key={producto.id} />  
            })
          })
        }
        
    </section >
  )
}

export default Products