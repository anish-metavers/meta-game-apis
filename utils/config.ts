export const AccessConfig = {
    READ_ACCESS: 'Read User',
    CREATE_ACCESS: 'Create User',
    UPDATE_ACCESS: 'Update User',
    DELETE_ACCESS: 'Delete User',
};

export const ErrorConfig = {
    INTERNAL_SERVER_ERROR: {
        errorCode: 'E-0001',
        message: 'Something went wrong on our End',
    },

    EMAIL_NOT_FOUND: {
        errorCode: 'E-0010',
        message: 'No User found with this Email!!',
    },

    INVALID_EMAIL_PASSWORD: {
        errorCode: 'E-0011',
        message: 'Incorrect Email Address OR Password!!',
    },

    PASSWORD_VALIDATION_FAILED: { errorCode: 'E-0012' },

    USER_ALREADY_EXISTS: {
        errorCode: 'E-0013',
        message: 'User Already Exist with this Email!!',
    },

    CONFIRM_PASS_NOT_MATCH: {
        errorCode: 'E-0014',
        message: 'New Password and Confirm Password does not match',
    },

    INVALID_OLD_PASS: {
        errorCode: 'E-0015',
        message: 'Invalid Old Password',
    },

    BET_GREATER_THAN_ZERO: {
        errorCode: 'E-0020',
        message: 'Bet Amount must be greater than Zero.',
    },

    GAME_NOT_FOUND_OR_BETTING_CLOSED: {
        errorCode: 'E-0021',
        message: 'No Game Found Or Betting Closed.',
    },

    NOT_ENOUGH_BALANCE: {
        errorCode: 'E-0022',
        message: 'Not Enough Balance',
    },

    NO_TOKEN_FOUND: {
        errorCode: 'E-0030',
        message: 'Unauthenticated, no token found',
    },

    NO_USER_FOUND: {
        errorCode: 'E-0031',
        message: 'No User Found!!',
    },

    INVALID_TOKEN: {
        errorCode: 'E-0032',
        message: 'Invalid Token or Token Expired!!',
    },
};
