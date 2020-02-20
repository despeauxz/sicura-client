import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class TextInput extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number
        ]),
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        required: PropTypes.bool,
        placeholder: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number
        ]),
        handleChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: '',
        type: 'text',
        errors: {}
    };

    render() {
        const {
            name,
            value,
            type,
            placeholder,
            label,
            handleChange,
            className,
            list,
            error,
            selected,
            ...rest
        } = this.props;

        if (type !== 'select') {
            return (
                <label className="block">
                    <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {label}
                    </span>
                    <input
                        type={type}
                        className={classnames('form-input mt-1 block w-full', {
                            'border-red-500': error,
                            className: true
                        })}
                        placeholder={placeholder}
                        name={name}
                        max={100}
                        min={0}
                        value={value}
                        onChange={handleChange}
                        {...rest}
                    />
                    {error && (
                        <span className="text-xs text-red-500">
                            {error.msg}
                        </span>
                    )}
                </label>
            );
        }

        if (type === 'select') {
            return (
                <label className="block">
                    <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {label}
                    </span>
                    <select
                        className={classnames('form-select mt-1 block w-full', {
                            'border-red-500': error,
                            className: true
                        })}
                        placeholder={placeholder}
                        name={name}
                        onChange={handleChange}
                        value={value}
                        {...rest}>
                        {list.map((item, index) => {
                            return (
                                <option
                                    value={item.id}
                                    key={index.toString()}
                                    selected={
                                        !selected || selected.id !== item.id
                                            ? false
                                            : true
                                    }>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <Fragment>
                        {error && (
                            <span className="text-xs text-red-500">
                                {error.msg}
                            </span>
                        )}
                    </Fragment>
                </label>
            );
        }
    }
}

export default TextInput;
