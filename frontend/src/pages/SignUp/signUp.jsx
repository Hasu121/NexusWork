import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const SignUp = (props) => {
    const navigate = useNavigate();

    const [registerField,setRegisterField] = useState({email: "", password: "", f_name: "", company: ""});

    const handleInputField = (event, key) => {
        setRegisterField({...registerField, [key]: event.target.value});
    };

    const handleRegister = async () => {
        if (
            registerField.email.trim().length===0 ||
            registerField.password.trim().length===0 ||
            registerField.f_name.trim().length===0 ||
            registerField.company.trim().length===0
        ) {
            return toast.error("All fields are required. ");
        }
        // Check company affiliation before registration
        try {
            const check = await axios.post("http://localhost:4000/api/auth/check-company", { company: registerField.company });
            if (!check.data.exists) {
                return toast.error("Company is not affiliated. Registration denied.");
            }
        } catch (err) {
            return toast.error("Error checking company affiliation.");
        }
        await axios.post("http://localhost:4000/api/auth/register", registerField).then(res=> {
            toast.success("Registration successful");
            setRegisterField({...registerField, email: "", password: "", f_name: "", company: ""});
            navigate('/login')
        }). catch(error => {
            console.log(error);
            const errorMsg = error?.response?.data?.message || error?.response?.data?.error || "Registration failed";
            toast.error(errorMsg);
        });
    };

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='text-3xl mb-5 justify-center'>Welcome to Nexus</div>
            <div className='w-[80%] md:w-[28%] rounded-sm shadow-xl box p-10'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <label htmlForm='email'>Email</label>
                        <input value={registerField.email} onChange={(e) => handleInputField(e, "email")} type="text" className='w-full text-x1 border-2 rounded-lg px-5 py-1' placeholder='Enter your email' />
                    </div>
                    <div>
                        <label htmlForm='password'>Password</label>
                        <input value={registerField.password} onChange={(e) => handleInputField(e, "password")} type="password" className='w-full text-x1 border-2 rounded-lg px-5 py-1' placeholder='Enter your password' />
                    </div>
                    <div>
                        <label htmlForm='f_name'>Full name</label>
                        <input value={registerField.f_name} onChange={(e) => handleInputField(e, "f_name")} type="text" className='w-full text-x1 border-2 rounded-lg px-5 py-1' placeholder='Enter your Full name' />
                    </div>
                    <div>
                        <label htmlFor='company'>Company</label>
                        <input value={registerField.company} onChange={(e) => handleInputField(e, "company")} type="text" className='w-full text-x1 border-2 rounded-lg px-5 py-1' placeholder='Enter your company' />
                    </div>
                    <div onClick={handleRegister} className='w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer'>
                        Register
                    </div>
                </div>
                <div className='flex items-center gap-2 justify-center my-6'>
                    <div className='border-b-1 border-gray-400 w-[45%]'/> <div>or</div> <div className='border-b-1 border-gray-400 w-[45%] my-6'/>
                </div>
                <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
            </div>

            
            <div className='mt-4 mb-10'>Already in Nexus?  <Link to={'/login'} className='text-blue-800 cursor-pointer'>Sign In</Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp
