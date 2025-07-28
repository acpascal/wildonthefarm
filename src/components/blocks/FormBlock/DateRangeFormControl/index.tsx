import * as React from 'react';
import classNames from 'classnames';

export default function DateRangeFormControl(props) {
    const {
        name = '',
        label = '',
        fromLabel = 'From',
        toLabel = 'To',
        hideLabel = false,
        hideFromLabel = false,
        hideToLabel = false,
        isRequired = false,
        fromPlaceholder = '',
        toPlaceholder = '',
        width = 'full',
        'data-sb-field-path': fieldPath
    } = props;
    const fromName = `${name}_from`;
    const toName = `${name}_to`;
    const fromLabelId = `${fromName}-label`;
    const toLabelId = `${toName}-label`;

    return (
        <div
            className={classNames('sb-form-control', 'w-full', {
                'sm:w-formField': width === '1/2'
            })}
            data-sb-field-path={fieldPath}
        >
            {label && (
                <span className={classNames('sb-label', 'inline-block', 'sm:mb-1.5', { 'sr-only': hideLabel })}>
                    {label}
                </span>
            )}
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <label
                        id={fromLabelId}
                        className={classNames('sb-label', 'inline-block', 'sm:mb-1.5', { 'sr-only': hideFromLabel })}
                        htmlFor={fromName}
                    >
                        {fromLabel}
                    </label>
                    <input
                        id={fromName}
                        className="sb-input text-inherit bg-transparent border-b border-current w-full py-2 focus:outline-none"
                        type="date"
                        name={fromName}
                        required={isRequired}
                        placeholder={fromPlaceholder}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label
                        id={toLabelId}
                        className={classNames('sb-label', 'inline-block', 'sm:mb-1.5', { 'sr-only': hideToLabel })}
                        htmlFor={toName}
                    >
                        {toLabel}
                    </label>
                    <input
                        id={toName}
                        className="sb-input text-inherit bg-transparent border-b border-current w-full py-2 focus:outline-none"
                        type="date"
                        name={toName}
                        required={isRequired}
                        placeholder={toPlaceholder}
                    />
                </div>
            </div>
        </div>
    );
}
