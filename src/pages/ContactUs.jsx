import ContactForm from "../components/contact/ContactForm"
import ContactInfo from "../components/contact/ContactInfo"


const ContactUs = () => {
  return (
    <section className="mt-12 w-7/12 flex flex-col h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <ContactForm/>
      <ContactInfo/>
    </section>
    
  )
}

export default ContactUs