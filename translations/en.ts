// This file is seen as the main translation file, and keys from this file will be used to validate
// the other translation files. Remember to always add keys here first.
export const en = {
  general: {
    welcome: 'Welcome',
    greeting: 'Hello',
  },
  signOut: {
    buttonLabel: 'Sign Out',
  },
  verify: {
    title: 'Verification',
    token: {
      label: '6 digit code',
      errors: {
        minLength: 'Please enter a 6-digit code.',
      },
    },
    buttonLabel: 'Verify',
  },
  signUp: {
    email: {
      label: 'Email',
      placeholder: 'Email',
      errors: {
        invalid: 'Please enter a valid email address.',
      },
    },
    password: {
      label: 'Password',
      placeholder: 'Password',
      errors: {
        minLength: 'Please enter at least 8 characters.',
        maxLength: 'Please enter fewer than 64 characters.',
        lowerCase: 'Your password must have at least one lowercase letter.',
        upperCase: 'Your password must have at least one uppercase letter.',
        number: 'Your password must have at least one number.',
        specialChar: 'Your password must have at least one special character.',
      },
    },
    confirmPassword: {
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      errors: {
        notMatch: 'Your passwords do not match.',
      },
    },
    buttonLabel: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
  },
  login: {
    title: 'Login',
    email: {
      label: 'Email',
      placeholder: 'Email',
      errors: {
        invalid: 'Please enter a valid email address.',
      },
    },
    password: {
      label: 'Password',
      placeholder: 'Password',
      errors: {
        minLength: 'Please enter at least 8 characters.',
        maxLength: 'Please enter fewer than 64 characters.',
      },
    },
    buttonLabel: 'Login',
    noAccount: "Don't have an account?",
  },
} as const;
