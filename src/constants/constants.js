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
export const TEXTS = {
  NAV_HEADING: "New Ticket",
  DEVELOPER_LABEL: "Developer",
  STATUS_LABEL: "Ticket Status",
  PRODUCT_LABEL: "Ticket Product",
  TYPE_LABEL: "Type",
  PRIORITY_LABEL: "Priority",
  SUBJECT_HEADING: "Subject",
  SUBJECT_PLACEHOLDER: "Enter ticket subject",
  DESCRIPTION_PLACEHOLDER: "Enter ticket description",
  LOADING_MESSAGE: "Creating ticket...",
  SUCCESS_MESSAGE: "Ticket created successfully",
  ERROR_MESSAGE: "An error occurred while creating the ticket",
  SUBMIT_BUTTON: "Submit",
  SUBMITTING_BUTTON: "Submitting...",
  DEVELOPERS: [
    { value: "dev1", label: "Developer 1" },
    { value: "dev2", label: "Developer 2" }
  ],
  STATUSES: [
    { value: "RAISED", label: "RAISED" },
    { value: "UNDER DEVELOPMENT", label :"UNDER DEVELOPMENT" },
    { value: "DEV TESTING", label: "DEV TESTING" },
    { value: "QA TESTING", label: "QA TESTING" },
    { value: "IN REVIEW", label: "IN REVIEW" },
    { value: "APPROVED", label: "APPROVED" },
    { value: "MERGED", label: "MERGED" }
  ],
  PRODUCTS: [
    { value: "Ticket Tracker", label: "Ticket Tracker" },
    { value: "Kubair Home", label: "Kubair Home" },
    { value: "Kubair Onboarding", label: "Kubair Onboarding" },
    { value: "Kubair Payments", label:  "Kubair Payments" },
    { value: "Tanjiro", label: "Tanjiro" },
    { value: "Kubair Savings Account", label: "Kubair Savings Account" }
  ],
  TYPES: [
    { value: "bug", label: "Bug" },
    { value: "feature", label: "Feature" }
  ],
  PRIORITIES: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ]
};

export const ACTIVE_CLASS = 'active';