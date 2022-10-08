import { useTranslation as UseTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { regexEmail } from './validate.util'

export const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .nullable()
      .trim()
      .required('Email required')
      .email('Your email address is invalid. Try Again.')
      .matches(regexEmail, 'Your email address is invalid. Try Again.'),
    password: Yup.string()
      .nullable()
      .required('Password required')
      .min(8, 'Your password must be at least 8 characters long. Try Again.')
      .max(32, 'Max length password'),
  })
}

export const registerSchema = () => {
  // ts-ignored
  const { t } = UseTranslation()
  return Yup.object().shape({
    newPassword: Yup.string()
      .nullable()
      .required(t('password_require'))
      .min(8, t('error_min_password'))
      .max(32, t('error_max_password')),
    confirmPassword: Yup.string()
      .nullable()
      .required(t('password_require'))
      .min(8, t('error_min_password'))
      .max(32, t('error_max_password'))
      .oneOf([Yup.ref('newPassword'), null], t('not_match_password')),
  })
}

export const changePasswordSchema = () => {
  const { t } = UseTranslation()
  return Yup.object().shape({
    password: Yup.string()
    .nullable()
    .required(t('password_require'))
    .min(8, t('error_min_password'))
    .max(32, t('error_max_password')),
    newPassword: Yup.string()
      .nullable()
      .required(t('password_require'))
      .min(8, t('error_min_password'))
      .max(32, t('error_max_password')),
    confirmPassword: Yup.string()
      .nullable()
      .required(t('password_require'))
      .min(8, t('error_min_password'))
      .max(32, t('error_max_password'))
      .oneOf([Yup.ref('newPassword'), null], t('not_match_password')),
  })
}

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

