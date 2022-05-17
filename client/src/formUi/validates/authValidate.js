import * as Yup from 'yup';

export const loginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email is not in the expected email address standard format")
        .required("Email is missing"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 characters at minimum")
});
export const loginSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .email("Email is not in the expected email address standard format")
            .required("Email is missing"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be 6 characters at minimum")
    })
}