import React, { useState } from "react";

export default function Contact() {
    const inputValues = {
        fName: "",
        lName: "",
        email: "",
        number: "",
        subject: ""
    }
    const [inputs, setInputs] = useState(inputValues);
    const [textarea, setTextarea] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
    };
    const handleChangeTextArea = (e) => {
        setTextarea(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs, textarea);
        const { name, value } = e.target;
    }
    return (
        <main className="py-8">
            <div className="container">
                <div className="w-full max-w-[1000px] mx-auto bg-white shadow-normal border border-teal-400 rounded-[25px] p-8 md:py-14 md:px-20">
                    <h1 className="font-bold text-2xl mb-4">
                    Get in touch
                    </h1>
                    <p className="text-[#646464] mb-8">We're here to help you with all your recruitment needs!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="contactFName" className="font-medium mb-2 leading-none inline-block">First Name</label>
                              <input id="contactFName" type="text" name="fName" value={inputs.fName || ""} onChange={handleChange} className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="contactLName" className="font-medium mb-2 leading-none inline-block">Last Name</label>
                              <input id="contactLName" type="text" name="lName" value={inputs.lName || ""} onChange={handleChange} className="w-full rounded-full border-slate-300" />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="contactEmail" className="font-medium mb-2 leading-none inline-block">Email</label>
                              <input id="contactEmail" type="email" name="email" value={inputs.email || ""} onChange={handleChange} className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="contactPNumber" className="font-medium mb-2 leading-none inline-block">Phone Number</label>
                              <input id="contactPNumber" type="number" name="number" value={inputs.number || ""} onChange={handleChange} className="w-full rounded-full border-slate-300" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="contactSubject" className="font-medium mb-2 leading-none inline-block">Subject</label>
                            <input id="contactSubject" type="text" name="subject" value={inputs.subject || ""} onChange={handleChange} className="w-full rounded-full border-slate-300" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="contactMessage" className="font-medium mb-2 leading-none inline-block">Message</label>
                            <textarea id="contactMessage" value={textarea} onChange={handleChangeTextArea}  className="w-full rounded-[25px] h-[150px] resize-none border-slate-300"></textarea>
                        </div>
                        <div className="text-left">
                            <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}