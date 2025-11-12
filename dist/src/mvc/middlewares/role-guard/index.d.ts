type Role =
    | 'admin'
    | 'student'
    | 'job_seeker'
    | 'institute'
    | 'employer'
    | 'SuperAdmin'
    | 'Student'
    | 'Institute'
    | 'Employer'
    | 'JobSeeker'
    | 'Teacher'
    | 'Admin'
    | 'PartnerAdmin'
    | 'Partner'
    | 'Counsellor'
    | 'SuperAdmin';
declare const roleGuardMiddleware: (
    allowedRoles: Role[]
) => (req: any, res: any, next: any) => any;
export default roleGuardMiddleware;
