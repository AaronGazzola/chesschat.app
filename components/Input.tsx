import React, { FormEventHandler } from 'react';
import SVG from './SVG';

interface InputProps {
	type:
		| 'text'
		| 'textarea'
		| 'password'
		| 'select'
		| 'date'
		| 'number'
		| 'checkbox'
		| 'radio';
	placeholder?: string;
	labelClasses?: string;
	value: string | number | undefined;
	onChange?:
		| React.ChangeEventHandler<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		  >
		| FormEventHandler;
	label: string;
	id: string;
	isValid?: boolean;
	isTouched?: boolean;
	helperText?: string;
	touchHandler?: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	>;
	passwordIsHidden?: boolean;
	endIcon?: React.ReactNode;
	fullWidth?: boolean;
	options?: string[];
	inputClasses?: string;
	containerClasses?: string;
	labelTop?: boolean;
	validation?: boolean;
	autoFocus?: boolean;
	rows?: number;
	maxLength?: number;
	checkboxClasses?: string;
	checkClasses?: string;
}

const Input = (props: InputProps) => {
	const {
		placeholder = '',
		type,
		value,
		onChange = () => {},
		id,
		isValid = true,
		helperText = '',
		isTouched = true,
		touchHandler = () => {},
		label,
		passwordIsHidden = true,
		endIcon,
		fullWidth = true,
		options = [],
		inputClasses = '',
		containerClasses = '',
		labelTop = true,
		validation = true,
		autoFocus = false,
		maxLength = 10000,
		rows = 3,
		checkboxClasses = '',
		checkClasses = '',
		labelClasses = ''
	} = props;

	return (
		<div
			className={`relative flex
			${labelTop ? 'flex-col-reverse' : 'flex-col'}
			${fullWidth ? 'w-full' : ''}
			${containerClasses}`}
		>
			{endIcon && (
				<div className={`absolute right-7`} style={{ top: labelTop ? 30 : 9 }}>
					{endIcon}
				</div>
			)}
			{type === 'select' ? (
				<>
					<select
						onChange={onChange}
						className={`z-10 select w-full border-2 rounded p-2 text-blue-dark font-medium focus:outline-none focus:border-blue-dark cursor-pointer
					${inputClasses}
					`}
						name={label}
						id={id}
						value={value}
					>
						{options.map(option => (
							<option value={option} key={option}>
								{option}
							</option>
						))}
					</select>
					<label
						className={`transition-transform duration-300 ease-in-out text-xs p-1 pt-0.5 font-bold text-blue-dark form-label ${labelClasses}`}
						htmlFor={id}
						style={{ minHeight: 18 }}
					>
						{!isValid && isTouched ? helperText : label}
					</label>
					<SVG
						name='chevronLeft'
						classes='fill-current text-gray-500 absolute right-3 top-1/2 transform -rotate-90 w-4 h-4'
					/>
				</>
			) : type === 'checkbox' || type === 'radio' ? (
				<div className='flex relative items-center w-min flex-nowrap'>
					<input
						type={type}
						id={id}
						className={`checkbox w-5 h-5 z-20 cursor-pointer`}
						onChange={onChange}
						checked={!!value}
					/>
					{type === 'checkbox' ? (
						<SVG
							name='checkMark'
							classes={`checkbox-control absolute top-1/2 transform -translate-y-1/2 left-0 w-5 h-5 z-10 fill-current text-blue-dark ${checkClasses}`}
						></SVG>
					) : (
						<div
							className={`checkbox-control absolute top-1/2 left-1 transform -translate-y-1/2  w-3 h-3 z-10 rounded-full bg-blue-dark ${checkClasses}`}
						></div>
					)}
					<div
						className={`border-2 border-blue-dark ${
							type === 'radio' ? 'rounded-full' : 'rounded-md'
						} absolute top-1/2 transform -translate-y-1/2 left-0 w-5 h-5 ${checkboxClasses}`}
					></div>
					<label
						htmlFor={id}
						className={`select-none cursor-pointer pl-6 text-sm font-medium whitespace-nowrap ${labelClasses} ${
							!isValid && isTouched && validation
								? 'text-red-700 form-label'
								: isValid && validation
								? 'text-green form-label'
								: 'text-blue-dark form-label'
						}`}
					>
						{label}
					</label>
				</div>
			) : (
				<>
					<p
						className={`text-xs font-bold pl-1 pt-0.5  ${
							!isValid && isTouched && validation
								? 'text-red-700'
								: isValid && validation
								? 'text-green form-label'
								: 'text-blue-dark form-label'
						}`}
						style={{ minHeight: 18 }}
					>
						{helperText}
					</p>

					{type === 'textarea' ? (
						<textarea
							autoFocus={autoFocus}
							className={`form-input ${
								labelTop ? 'form-input-label-top' : 'form-input-label-bottom'
							} w-full border rounded-md font-medium focus:outline-none p-2 px-3 text-blue-dark 
						${
							!isValid && isTouched && validation
								? 'border-red-700 placeholder-red-700'
								: isValid && validation
								? 'border-green'
								: 'border-gray-500 focus:border-blue-dark placeholder-gray-400'
						}
						${inputClasses}`}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							id={id}
							onBlur={touchHandler}
							rows={rows}
							maxLength={maxLength}
						/>
					) : (
						<input
							autoFocus={autoFocus}
							className={`form-input${
								labelTop ? '-label-top' : '-label-bottom'
							} w-full border rounded-md font-medium focus:outline-none p-2 px-3 text-blue-dark highlight-blue 
						${
							!isValid && isTouched && validation
								? 'border-red-700 placeholder-red-700'
								: isValid && validation
								? 'border-green'
								: 'border-gray-500 focus:border-blue-dark placeholder-gray-400'
						}
						${inputClasses}
						${
							type === 'password' &&
							passwordIsHidden &&
							typeof value === 'string' &&
							value?.length
								? 'tracking-widest'
								: ''
						}`}
							type={type}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							id={id}
							onBlur={touchHandler}
						/>
					)}
					<label
						className={`transition-transform duration-300 ease-in-out text-xs p-1 pl-1.5 pt-0.5 font-bold ${labelClasses} ${
							!isValid && isTouched && validation
								? 'text-red-700 form-label'
								: isValid && validation
								? 'text-green form-label'
								: 'text-blue-dark form-label'
						}`}
						htmlFor={id}
					>
						{label}
					</label>
				</>
			)}
		</div>
	);
};

export default Input;
