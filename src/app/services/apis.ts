export const ApiUrls = {
    Identity: {
        Register: 'api/Identity/register',
        Login: 'api/Identity/login',
        ForgetPasswordRequest: 'api/Identity/forgot-password',
        ResetPassword: 'api/Identity/reset-password',
        ChangePassword: 'api/Identity/change-password',
        TwoStepVerification: 'api/Identity/two-step-verification',
        ResendOTP: 'api/Identity/resend-otp',
        AddInternalUser: 'api/Identity/register-internal',
        UpdateInternalUserInfo: 'api/Identity/update-internal-user-info',
        DisableInternalUser: 'api/Identity/toggle-user-status',
        ChangeUserGroup: 'api/Identity/change-user-group',
        ValidateInternalUserToken: 'auth/verify-token',
        ChangeEmail: 'api/Identity/change-email',
        ChangeEmailVerification: 'api/Identity/change-email-Verification',
    },
    Invitation: {
        InviteExpert: "api/Invitation/invite-expert",
        GetAllExpertsInvitations: "api/Invitation/get-all"
    },
    Users: {
      GetAllUsers: "Users/list",
        UserInfo: "api/Users/user-info",
        GetInternalUsers: "api/Users/internal-users",
    },
    Roles: {
        AddRole: "api/Roles/add-role",
        UpdateRole: "api/Roles/update-role",
        SearchRoles: "api/Roles/search-role",
        GetRoleById: "api/Roles/get-by-id",
        AddRoleGroups: "api/Roles/add-role-groups",
        AddRolePages: "api/Roles/add-role-pages",
        DeleteRole: "api/Roles/delete-role",
        ActivateRole: "api/Roles/activate-role",
        GetPermissions: "api/Roles/get-permissions"
    },
    Pages: {
        AddPage: "api/Pages/add",
        UpdatePage: "api/Pages/update",
        SearchPages: "api/Pages/get-all",
        GetPageById: "api/Pages/get",
        GetCurrentUserPages: "api/Pages/user-pages",
    },
    Groups: {
        AddGroup: "api/Groups/add-Group",
        UpdateGroup: "api/Groups/update-Group",
        SearchGroups: "api/Groups/search-Group",
        GetGroupById: "api/Groups/get-by-id",
        DeleteGroup: "api/Groups/delete-group",
        ActivateGroup: "api/Groups/activate-group",
    },
      Bookings: {
        GetAllBookings: "Meetings/users",
        bookBooking: "Meetings/book",
        getBookingById: "Meetings",
        GetBookingHistory: "api/bookings/history",
        updateBooking: "Meetings",
        cancelBooking: "Meetings/cancel",
    },
    Rooms: {
        GetAllRooms: "Rooms/list",
        getRoomById: "api/rooms/room",
        GetRoomHistory: "api/Rooms/history",
        updateRoom: "api/rooms/update-room-date",
        cancelRoom: "api/rooms/cancel-room",
    },
    Dashboard: {
        GetInternalSystemTotalRecords: "api/Dashboard/dashboard-data"
    },
};


export const AnonymousUrls = [ //Without Authorization Header
    ApiUrls.Identity.Register,
    ApiUrls.Identity.Login,
    ApiUrls.Identity.ForgetPasswordRequest,
    ApiUrls.Identity.ResetPassword,
    ApiUrls.Identity.ResendOTP,
    ApiUrls.Identity.TwoStepVerification,
    ApiUrls.Identity.ValidateInternalUserToken,
    ApiUrls.Identity.ChangeEmail,
    ApiUrls.Identity.ChangeEmailVerification
];

export const ExternalUserAuthenticatedUrls = [ //External User APIs
    ApiUrls.Identity.ChangePassword,
    ApiUrls.Users.UserInfo,
];

export const InternalUserAuthenticatedURLs = [ //Internal User APIs
    ApiUrls.Invitation.InviteExpert,
    ApiUrls.Invitation.GetAllExpertsInvitations,
    ApiUrls.Roles.AddRole,
    ApiUrls.Roles.GetRoleById,
    ApiUrls.Roles.SearchRoles,
    ApiUrls.Roles.UpdateRole,
    ApiUrls.Roles.AddRoleGroups,
    ApiUrls.Roles.AddRolePages,
    ApiUrls.Roles.DeleteRole,
    ApiUrls.Roles.GetPermissions,
    ApiUrls.Roles.ActivateRole,
    ApiUrls.Pages.AddPage,
    ApiUrls.Pages.UpdatePage,
    ApiUrls.Pages.SearchPages,
    ApiUrls.Pages.GetPageById,
    ApiUrls.Pages.GetCurrentUserPages,
    ApiUrls.Groups.AddGroup,
    ApiUrls.Groups.UpdateGroup,
    ApiUrls.Groups.SearchGroups,
    ApiUrls.Groups.GetGroupById,
    ApiUrls.Groups.DeleteGroup,
    ApiUrls.Groups.ActivateGroup,
    ApiUrls.Identity.AddInternalUser,
    ApiUrls.Identity.UpdateInternalUserInfo,
    ApiUrls.Identity.DisableInternalUser,
    ApiUrls.Identity.ChangeUserGroup,
    ApiUrls.Dashboard.GetInternalSystemTotalRecords,
    ApiUrls.Bookings.updateBooking,
    ApiUrls.Bookings.cancelBooking,
    ApiUrls.Bookings.GetAllBookings,
];

export const ExternalAndEnternalURLS = [ //Internal and External User APIs
    ApiUrls.Users.GetInternalUsers,
    ApiUrls.Bookings.getBookingById,
]


export const IgnoreGlobalErrorUrls = [ //Ignore global error message
];

