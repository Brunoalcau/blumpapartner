import {enhancer} from './ResetPassword.enhancer';
import {ResetPassword as View} from './ResetPassword';

import {ResetPasswordSuccess} from './ResetPasswordSuccess';
const ResetPassword = enhancer(View);

export {ResetPassword, ResetPasswordSuccess};
