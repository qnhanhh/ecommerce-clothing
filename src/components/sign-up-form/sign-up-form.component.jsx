import { useState } from "react"

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields)
    const {displayName, email, password, confirmPassword}=formFields

    const handleChange=(e)=>{
        const {name, value}=e.target
        setFormFields({
            ...formFields,
            [name]:value
        })
    }

    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={()=>{}}>
                <label>Display Name</label>
                <input value={displayName} type='text' required onChange={handleChange} name='displayName'/>

                <label>Email</label>
                <input value={email} type='email' required onChange={handleChange} name='email'/>

                <label>Password</label>
                <input value={password} type='password' required onChange={handleChange} name='password'/>

                <label>Confirm Password</label>
                <input value={confirmPassword} type='password' required onChange={handleChange} name='confirmPassword'/>

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm