const News = () => {
  return (
    <section >
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900 text-center mt-10" >Lastest Art News</h1>
        <div className="container px-6 py-10 mx-auto">
            <div className="lg:flex lg:-mx-6">
                <div className="lg:w-3/4 lg:px-6">
                    <img className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl" src="https://images.pexels.com/photos/3779191/pexels-photo-3779191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                   <div>
                        <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-black-800 ">
                            What do you want to know about art
                        </h1>
                    </div>
                </div>

                <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
                    <div>
                        <h3 className="text-blue-800 capitalize">Design instument</h3>

                        <a href="#" className="block mt-2 font-medium text-black-700 hover:underline hover:text-gray-500  ">
                            How to raise $100k+ by using blox ui kit on your design
                        </a>
                    </div>

                    

                    <div>
                        <h3 className="text-blue-800 capitalize">UI Resource</h3>

                        <a href="#" className="block mt-2 font-medium text-black-700 hover:underline hover:text-gray-500  ">
                            Should you creat UI Product by using Blox?
                        </a>
                    </div>

                    

                    <div>
                        <h3 className="text-blue-800 capitalize">Premium Collection</h3>

                        <a href="#" className="block mt-2 font-medium text-black-700 hover:underline hover:text-gray-500">
                            Top 10 Blocks you can get on Blox&apos;s collection.
                        </a>
                    </div>

            

                    <div>
                        <h3 className="text-blue-800 capitalize">Premium kits</h3>

                        <a href="#" className="block mt-2 font-medium text-black-700 hover:underline hover:text-gray-500 ">
                            Top 10 Ui kit you can get on Blox&apos;s collection.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default News