import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";  //  sirve para hacer validaciones

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { user } = useUserContext()

    useEffect(() => {  //si ya existe un usuario lo envia a dashboard
        if (user) {
            navigate("/dashboard")
        }
    }, [user])


   

    const onSubmit = async ({email, password}) => {
        console.log({email, password});
        try {
            const credential = await login({ email, password })
            console.log(credential);
        } catch (error) {
            console.log(error);
        }

    }

    const validatorSchema = Yup.object().shape({   // validaciones yup
        email: Yup.string().email("Email no valido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Minimo 6 caracteres").required("Password require"),
    })


    return (
        <>
            <h1>login</h1>
            <Formik
                initialValues={{ email: "", password: "" }} 
                onSubmit={onSubmit}
                validatorSchema={validatorSchema}
            >
                {
                    ({values, handleSubmit, handleChange, errors, touched, handleBlur}) => (   // como quito los useState, values va a tomar los input
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Ingrese email"
                                value={values.email}
                               // onChange={(e) => setEmail(e.target.value)} />
                                onChange={handleChange}
                                name="email"
                                onBlur={handleBlur}
                                />

                                {
                                    errors.email && touched.email && errors.email
                                }

                            <input
                                type="password"
                                placeholder="Ingrese password"
                                value={values.password}
                               // onChange={(e) => setPassword(e.target.value)}
                               onChange={handleChange}
                               name="password"
                               onBlur={handleBlur}

                            />

                                {
                                    errors.password && touched.password && errors.password
                                } 

                            <button type="submit">Login</button>
                        </form>
                    )
                }

            </Formik>

        </>
    )
};

export default Login;
