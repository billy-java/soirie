
const Contact = () => {
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Contactez-nous</h1>
    <p className="mb-4">
      Si vous avez des questions, des suggestions ou des problèmes, n'hésitez pas à nous contacter via le formulaire ci-dessous.
    </p>
    <form className="flex flex-col gap-4">
      <label>
        Nom :
        <input type="text" placeholder="Votre nom" className="border p-2 rounded-md" />
      </label>
      <label>
        Email :
        <input type="email" placeholder="Votre email" className="border p-2 rounded-md" />
      </label>
      <label>
        Message :
        <textarea placeholder="Votre message" className="border p-2 rounded-md" rows={5}></textarea>
      </label>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Envoyer</button>
    </form>
  </div>
  )
}

export default Contact