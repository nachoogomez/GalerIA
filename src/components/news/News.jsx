import NewsCard from "./NewsCard"

/**
 * Componente que muestra la seccion de ultimas noticias de arte
 * 
 * Incluye:
 * - título 
 * - imagen destacada con texto 
 * - una lista de noticias en tarjetas
 * 
 * @returns {JSX.Element} Seccion visual con noticias y contenido relacionado al arte
 */
const News = () => {
      
  return (
    <section >
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900 text-center mt-10" >
            Latest Art News
        </h1>
        <div className="container px-6 py-10 mx-auto">
            <div className="lg:flex lg:-mx-6">
                {/*Imagen destacada*/}
                <div className="lg:w-3/4 lg:px-6">
                    <img 
                        className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl" 
                        src="https://images.pexels.com/photos/3779191/pexels-photo-3779191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt=""
                    />
                   <div>
                        <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-black-800 ">
                            {/*What do you want to know about art*/}
                        </h1>
                    </div>
                </div>

                {/* Lista de tarjetas de noticias */}
                <div className="mt-8 lg:w-1/4 lg:mt-4 lg:px-6 flex gap-10 flex-col" >
                    <NewsCard/>
                </div>
               
            </div>
        </div>
    </section>
  );
};

export default News;