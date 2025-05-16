import ContactForm from "../components/contact/ContactForm"

/**
 * Página de contacto que muestra un formulario para que los usuarios se comuniquen con el equipo.
 * Utiliza el componente <ContactForm />.
 *
 * @returns {JSX.Element}
 */
const ContactUs = () => {
  return (
    <section className="mt-12 w-7/12 flex flex-col h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <ContactForm/>
    </section>
    
  )
}

export default ContactUs