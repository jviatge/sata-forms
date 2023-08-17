import React,{useRef} from 'react'

export default function Input({name,placeholder,type,required,label,width,title}) {

  const imputClass = "relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  const ref = useRef();

  return (
    <>
      {type === "title" ? 
        (<h3 className="px-2 my-2 text-xl w-full">{title}</h3>) : 
        (<div className={'px-2 my-2 input-form w-full ' + (width && 'md:w-'+width)}>
        {label ? <label for="name">{label}</label> : null}
        {type === 'textarea' ? 
          <textarea 
            ref={ref}
            rows={5}
            name={name}
            placeholder={placeholder + (required ? "*" : "")} 
            required={required}
            className={imputClass}>
          </textarea> : null}
        {type !== 'textarea' && type !== 'select' ? (
          <input 
            ref={ref}
            onFocus={() => {if(type === 'date') ref.current.type = "date"}}
            onChange={(e) => {if(type === 'date' && !e.target.value) ref.current.type = "text"}}
            onfocus={type === 'date' && "(this.type='date')"}
            type={type === 'date' ? "text" : type }
            name={name} 
            placeholder={placeholder + (required ? "*" : "")} 
            required={required} 
            className={imputClass} />
        ) : null}
        </div>
      )}
    </>
  )
}
