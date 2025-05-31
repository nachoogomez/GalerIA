/**
 * Componente 'Team' que representa la sección de miembros del equipo 
 * 
 * Renderiza una lista de miembros con su nombre y rol en un 
 * diseño responsivo en forma de tarjeta
 * 
 * @returns {JSX.Element} Sección visual con los miembros del equipo
 */
const Team = () => {

    const teamMembers = [
        { name: ' Eugenia Mora', role: 'Developer', image: '../src/assets/mujer.jpg'  },
        { name: 'Gomez Ignacio', role: 'Developer', image: '../src/assets/hombre.jpg'},
        { name: 'Jessica Conejero', role: 'Developer', image: '../src/assets/mujer.jpg' },
      ]

  return (
    <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
                Our  Team
            </h1>

            <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
                We are a team of developers passionate about technology, creativity, and innovation. 
                Combining our technical expertise with a love for art, we work together to build immersive 
                digital experiences that make art more accessible and engaging for everyone.
            </p>

            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                            </div>
                            <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Team;