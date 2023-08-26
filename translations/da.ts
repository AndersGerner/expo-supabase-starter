import { Translations } from '@/types/translationKeys';

export const da: Translations = {
  general: {
    welcome: 'Velkommen',
    greeting: 'Hej',
  },
  signOut: {
    buttonLabel: 'Log ud',
  },
  verify: {
    title: 'Verifikation',
    token: {
      label: '6-cifret kode',
      errors: {
        minLength: 'Indtast en 6-cifret kode.',
      },
    },
    buttonLabel: 'Bekræft',
  },
  login: {
    title: 'Log ind',
    email: {
      label: 'E-mail',
      placeholder: 'E-mail',
      errors: {
        invalid: 'Indtast en gyldig e-mailadresse.',
      },
    },
    password: {
      label: 'Adgangskode',
      placeholder: 'Adgangskode',
      errors: {
        minLength: 'Indtast mindst 8 tegn.',
        maxLength: 'Indtast færre end 64 tegn.',
      },
    },
    buttonLabel: 'Log ind',
    noAccount: 'Har du ikke en konto?',
  },
  signUp: {
    email: {
      label: 'E-mail',
      placeholder: 'E-mail',
      errors: {
        invalid: 'Indtast en gyldig e-mailadresse.',
      },
    },
    password: {
      label: 'Adgangskode',
      placeholder: 'Adgangskode',
      errors: {
        minLength: 'Indtast mindst 8 tegn.',
        maxLength: 'Indtast færre end 64 tegn.',
        lowerCase: 'Din adgangskode skal indeholde mindst ét lille bogstav.',
        upperCase: 'Din adgangskode skal indeholde mindst ét stort bogstav.',
        number: 'Din adgangskode skal indeholde mindst ét tal.',
        specialChar: 'Din adgangskode skal indeholde mindst ét specialtegn.',
      },
    },
    confirmPassword: {
      label: 'Bekræft adgangskode',
      placeholder: 'Bekræft adgangskode',
      errors: {
        notMatch: 'Dine adgangskoder stemmer ikke overens.',
      },
    },
    buttonLabel: 'Opret konto',
    alreadyHaveAccount: 'Har du allerede en konto?',
  },
};
