import React, {useState} from "react"
import ReactDOM from "react-dom"
import Input from "./components/Input.jsx"

const divsToUpdate = document.querySelectorAll(".sata-forms-update-pre")

divsToUpdate.forEach(div => {
    const data = JSON.parse(div.querySelector("pre").innerText)
    ReactDOM.render(<OurComponent {...data}/>, div)
    div
        .classList
        .remove("sata-forms-update-pre")
})

function OurComponent(props) {

    const forms = [
        {
            type: "title",
            title: "Informations"
        }, {
            name: "group_name",
            width: "1/3",
            type: "text",
            placeholder: "Nom du groupe",
            required: true
        }, {
            name: "first_name",
            width: "1/3",
            type: "text",
            placeholder: "Prénom",
            required: true
        }, {
            name: "last_name",
            width: "1/3",
            type: "text",
            placeholder: "Nom",
            required: true
        }, {
            name: "email",
            width: "1/3",
            type: "email",
            placeholder: "Email",
            required: true
        }, {
            name: "phone",
            width: "1/3",
            type: "tel",
            placeholder: "Téléphone",
            required: true
        }, {
            name: "other_phone",
            width: "1/3",
            type: "tel",
            placeholder: "Autre téléphone",
            required: false
        }, {
            type: "title",
            title: "Informations séjour"
        }, {
            name: "departure_place",
            width: "1/2",
            type: "text",
            placeholder: "Lieu de départ",
            required: true
        }, {
            name: "destination",
            width: "1/2",
            type: "text",
            placeholder: "Destination",
            required: true
        }, {
            name: "number_of_participants",
            width: "1/2",
            type: "number",
            placeholder: "Nombre de participants",
            required: true
        }, {
            name: "budget",
            width: "1/2",
            type: "number",
            placeholder: "Budget par participant (€)",
            required: true
        }, {
            name: "departure_date",
            width: "1/2",
            type: "date",
            placeholder: "Date de départ",
            required: true
        },{
            name: "number_of_night",
            width: "1/2",
            type: "number",
            placeholder: "Nombre de nuit",
            required: true
        }, {
            type: "title",
            title: "Informations complémentaires"
        }, {
            name: "comments",
            type: "textarea",
            placeholder: "Votre message",
            required: false
        }
    ]

    const currentUrl = window.location.href;

    return (
        <div className="sata-forms-container">
            <form method="post" action={currentUrl} className="p-4 my-3 sata-form">
                <h2 className="px-2 text-2xl font-bold mb-8">{props.title}</h2>
                <div className="flex w-full flex-wrap content-center mb-4 field-container">

                    {props.form_send === "success"
                        ? (
                            <div className="w-full px-2">
                                <div
                                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                                    role="alert">
                                    <strong className="font-bold">Succès !</strong>
                                    <span className="block sm:inline">Votre demande a bien été envoyée.</span>
                                </div>
                            </div>
                        )
                        : null
                    }

                    {props.form_send === "error"
                        ? (
                            <div className="w-full px-2">
                                <div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                    role="alert">
                                    <strong className="font-bold">Erreur !</strong>
                                    <span className="block sm:inline">Une erreur est survenue lors de l'envoi de votre demande.</span>
                                </div>
                            </div>
                        )
                        : null
                    } 
                    
                    {props.form_send === "notsend"
                        ? (
                            <> 
                                {forms.map((form) => (
                                    <Input
                                        title={form.title}
                                        key={form.name}
                                        name={form.name}
                                        type={form.type}
                                        label={form.label}
                                        required={form.required}
                                        placeholder={form.placeholder}
                                        width={form.width}/>
                                    ))
                                } 
                                
                                {/* Honey pot */} 
                                <Input 
                                    name={"age"}
                                    type={"text"}
                                    placeholder={"Quel est votre âge ?"}
                                    width={"w-full"} /> 
                                
                                <input
                                    type="hidden"
                                    name="conf-key"
                                    value={`${props.token_auth}-${props.api_url}`}/>

                                <div className="w-full px-2 mt-4">
                                    <button
                                        type="submit"
                                        name="cf-submitted"
                                        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Envoyer</button>
                                </div>
                            </>
                        )
                        : null
                    }</div>

            </form>
        </div>
    )
}
