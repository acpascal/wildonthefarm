import * as React from 'react';
import { Alert } from '../../atoms/Alert/alert';
import { useState } from 'react';
// import classNames from 'classnames';

// import { getComponent } from '../../components-registry';
// import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
// import SubmitButtonFormControl from './SubmitButtonFormControl';

export default function FormBlock(props) {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    // const formRef = React.createRef<HTMLFormElement>();
    const { fields = [] } = props; //, elementId, submitButton, className, styles = {}, 'data-sb-field-path': fieldPath } = props;

    if (fields.length === 0) {
        return null;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setStatus('pending');
            setError(null);
            const myForm = event.target;
            const formData = new FormData(myForm);
            const res = await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(
                    Array.from(formData.entries()).map(([k, v]) => [k, typeof v === 'string' ? v : v.name])
                ).toString()
            });
            if (res.status === 200) {
                setStatus('ok');
            } else {
                setStatus('error');
                setError(`${res.status} ${res.statusText}`);
            }
        } catch (e) {
            setStatus('error');
            setError(`${e}`);
        }
    }

    return (
        <form name="contact-form" onSubmit={handleFormSubmit} className="flex flex-col gap-3 align-center">
            <input type="hidden" name="form-name" value="contact-form" />
            <input name="name" type="text" placeholder="Name" required className="input" />
            <input name="email" type="email" placeholder="Email" className="input" />
            <input name="message" type="text" placeholder="Message" required className="input" />
            <button className="btn" type="submit" disabled={status === 'pending'}>
                Submit
            </button>
            {status === 'ok' && <Alert className type="success">Submitted!</Alert>}
            {status === 'error' && <Alert className type="error">{error}</Alert>}
        </form>
    );
}
