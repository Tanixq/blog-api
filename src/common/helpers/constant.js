module.exports = {
    AUTHENTICATION: {
        SUCCESS: 'Token is valid',
        INVALID_TOKEN: 'Invalid token. Please login again',
        TOKEN_EXPIRED: 'Your session has expired. Please login again',
        TOKEN_NOT_FOUND: 'Invalid request. Please login again',
        EXCEPTION:
      'You cannot do any actions now. Please contact our support team.'
    },
    LOGIN: {
        SUCCESS: 'Login is successful',
        INVALID_ACCOUNT: " This account doesn't exist. Please sign up",
        INVALID_EMAIL: 'You entered an invalid email address',
        UNVERIFIED_MAIL:
      ' Please veify your email address. Click here to resend verification code ',
        WRONG_PASS_EMAIL: 'Your username or password is wrong',
        EXCEPTION: 'Please contact our support team to help'
    },
    LOGOUT: {
        SUCCESS: 'You have successfully logged out',
        EXCEPTION: 'Oops! Something went wrong. Please contact our support team.'
    },
    SIGNUP: {
        SUCCESS: 'Your account registration is successful. Please Verify OTP sent to email',
        EMAIL_EXIST: 'This email already exists. Please login.',
        RESEND_CODE: 'Verification code successfully sent to your email',
        UNVERIFIED_MAIL:
        ' Please verify your email address. Verification code is resended. ',
        RESET_PWD: 'A OTP is successfully sent to your email for resetting Password',
        USER_NOT_EXIST: 'This user does not exist',
        EDIT_BIO_SUCCESS: 'Edited user bio successfully',
        EXCEPTION:
      'Our system is busy, kindly go back in couple hours for singing up'
    },
    PROFILE: {
        FETCH_SUCCESS: 'User profile fetched succesfully'
    },
    VERIFY_MESSAGE: {
        SUCCESS: 'Your account verificaiton is successful.',
        INVALID_PASSCODE: 'The verification code is wrong. Please try again',
        EXPIRED_PASSCODE:
      'The verification code has expired. Click here to resend one',
        EMAIL_NOT_FOUND:
      'You will receive an email in your inbox if this email is registered on Platform.',
        EXCEPTION:
      'It seems you cannot verify your code now, kindly try in a minute',
        ALREADY_VERIFIED: 'User already verified'
    },
    VERIFY_STATUS: {
        VERIFIED: 'verified',
        UNVERIFIED: 'unverified'
    },
    TYPE_LOG: {
        USER: 'USER'
    },
    BLOG: {
        CREATE_SUCCESSFUL: 'Blog created successfully!',
        CREATE_UNSUCESSFUL: 'Blog creation unsuccessful!',
        BLOG_EXISTED: 'Blog with same title already exist try different one!',
        APPROVED_SUCCESSFUL: 'Blog approved successfully',
        REJECTED_SUCCESSFUL: 'Blog rejected successfully',
        BLOG_NOT_EXISTED: 'Blog with this blog_id does not exists!',
        DELETED_SUCCESSFUL: 'Blog deleted successfully',
        FETCH_SUCCESS: 'Blog fetched Succesfully',
        EXCEPTION: 'Oops! Something went wrong. Please contact our support team.',
        TITLE_NOT_FOUND: 'Blog with this title is not found',
        CATEGORY_NOT_EXISTED: 'Blog category does not exist',
        BLOG_NOT_FOUND: 'Blog not found'
    },
    ADMIN: {
        LOGIN_SUCCESS: 'Admin logged in successfully',
        LOGOUT_SUCCESS: 'Admin logged out successfully',
        INVALID_CREDENTIAL: 'Invalid Admin credentials',
        EXCEPTION: 'Something went wrong with admin login contact support team',
        SIGNUP_SUCCESS: 'New Admin added succesfully.',
        USERNAME_EXISTED: 'New Admin username is already existed'
    }
}
