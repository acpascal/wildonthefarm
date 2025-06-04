import * as React from 'react';
import { Alert } from '../../atoms/Alert/alert';
import { useState } from 'react';
// import classNames from 'classnames';

// import { getComponent } from '../../components-registry';
// import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
// import SubmitButtonFormControl from './SubmitButtonFormControl';

export default function FormBlock(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const formName = form.getAttribute('name');
    data.set('form-name', formName);

    try {
      const response = await fetch('/__forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Array.from(data.entries()).map(([k, v]) => [k, typeof v === 'string' ? v : ''])
        ).toString()
      });

      if (response.ok) {
        // window.location.href = '/success';
        props.closeModal();
        props.toast("Thanks for the message, we will be in contact soon!");
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>

   
    <form
      name="contact-form"
      method="POST"
      data-netlify="true"
      className="w-full space-y-6 relative block"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact-form" />
      <p hidden>
        <label>
          Don’t fill this out if you're human: <input name="bot-field" />
        </label>
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="name">
          Name
        </label>
        <input
          className="p-4 bg-gray-100 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>



      <div className="mb-4">
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
          Email
        </label>
        <input
          className="p-4 bg-gray-100 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="message">
          Message
        </label>
        <textarea
          className="p-4 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="message"
          name="message"
          required
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-[#036EA8] px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-[#036EA8]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white align-center transform transition-all duration-300 hover:scale-105"
          style={{ alignItems: 'center' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
            <path d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
          </svg>
          <span style={{ marginLeft: '5px' }}>Send</span>
        </button>
      </div>
    </form>
    </>
  );
}
