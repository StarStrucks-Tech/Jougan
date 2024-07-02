import HOME_ICON from '../assets/Vector.png';
import TICKET_ICON from '../assets/ticket-confirmation-outline.png';
import LOGOUT_ICON from '../assets/Group 49.png';
import WOMEN_IMAGE from '../assets/women.png';
import LOGIN_IMAGE from '../assets/logintravel.png';
import GOOGLE_IMAGE from '../assets/g-logo.png';

export const ICONS = {
  HOME: HOME_ICON,
  TICKET: TICKET_ICON,
  LOGOUT: LOGOUT_ICON,
};

export const TOAST_MESSAGES = {
  SIGN_OUT_SUCCESS: "Successfully signed out!",
  SIGN_OUT_FAILURE: "Failed to sign out. Please try again.",
  LOGIN_SUCCESS: "User logged in Successfully!",
  LOGIN_FAILURE: "Failed to login. Please try again.",
  SIGNUP_SUCCESS: "User Registered Successfully!",
  SIGNUP_FAILURE: "Failed to signup. Please try again.",
  SIGNINWITHGOOGLE_SUCCESS: "Signed in with Google successfully!",
  SIGNINWITHGOOGLE_FAILURE: "Failed to sign in with google, Please try again"
};

export const ACTIVE_ICONS = {
  HOME: 'home',
  TICKET: 'ticket',
  USER: 'user',
};

export const IMAGES = {
  WOMEN: WOMEN_IMAGE,
  LOGIN: LOGIN_IMAGE,
  GOOGLE: GOOGLE_IMAGE,
};
export const TABLE_HEADERS = [
  'ID',
  'Subject',
  'Description',
  'Status',
  'Type',
  'Priority',
  'Developer',
  'Product'
];
export const TICKET_STATUS = {
  OVERDUE: 'overdue',
  DUE_TODAY: 'dueToday',
  OPEN: 'open',
  ON_HOLD: 'onHold'
};

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch tickets. Please try again later.',
  GENERAL_ERROR: 'An error occurred while fetching tickets.'
};

export const ACTIVE_CLASS = 'active';
