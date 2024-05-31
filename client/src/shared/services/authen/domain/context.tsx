import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import Spinner from '../../../../pages/Spinner';
import { useNavigate } from 'react-router-dom';
import { AUTH0_BACKEND_AUDIENCE } from '../infrastructure/config';
import { isUser, getProfile as getUserProfile, createUser } from '../../../../modules/user-module';
import { getProfile as getHrProfile, isHr } from '../../../../modules/hr-module';

type Profile = {
    name: string,
    picture?: string,
}
export interface Role {
    check: (token: string) => Promise<boolean>,
    redirectUrl: string,
    RegisterProfile: () => JSX.Element,
    loginUrl: string,
    registerApiUrl: string,
    getProfile: (token: string) => Promise<Profile>,
}

export const Roles: { [key in "HR" | "USER"]: Role } = {
    HR: {
        check: async (token) => {
            return await isHr(token);
        },
        RegisterProfile: () => {
            const navigate = useNavigate();
            useEffect(() => {
                navigate('/hr-profile-register');
            }, [navigate]);
            return <Spinner />
        },
        redirectUrl: '/hr/news',
        loginUrl: '/hr-login',
        registerApiUrl: 'http://localhost:3000/employer/account',
        getProfile: async (token) => {
            const profile = await getHrProfile(token);
            return {
                name: profile.fullname,
                picture: profile.image,
            }
        },
    },
    USER: {
        check: async (token) => {
            return await isUser(token);
        },
        redirectUrl: '/',
        RegisterProfile: () => {
            console.log('Register user profile')
            const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
            const navigate = useNavigate();
            const { setRole } = useProfileContext();
            useEffect(() => {
                if(isLoading) return;
                if (!isAuthenticated) {
                    navigate(Roles.USER.loginUrl);
                    return;
                };
                if (!user) return console.error('isAuthenticated is true but user is null!');
                const registerProfile = async () => {
                    try {
                        const token = await getAccessTokenSilently({
                            authorizationParams: {
                                audience: AUTH0_BACKEND_AUDIENCE,
                            },
                            cacheMode: 'off'
                        });
                        await createUser({
                            fullname: user.name as string,
                            phone: user.phone_number,
                            image: user.picture,
                            token,
                        });
                        setRole(Roles.USER)
                    } catch (error) {
                        console.error(error);
                        alert('Register user profile failed!');
                        window.location.reload();
                    }
                }
                registerProfile();
            }, [isAuthenticated,isLoading]);
            return <Spinner />
        },
        loginUrl: '/user-login',
        registerApiUrl: 'http://localhost:3000/user/account',
        getProfile: async (token) => {
            const profile = await getUserProfile(token);
            return {
                name: profile.fullname,
                picture: profile.image,
            }
        },
    },
}

type ProfileContextInterface = {
    profile?: Profile,
    setProfile: (user: Profile) => void,
    role?: Role | null,
    setRole: (role: Role | null | undefined) => void,
};
const ProfileContext = createContext<ProfileContextInterface>({
    setProfile: () => { },
    setRole: () => { },
});
export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const [role, setRole] = useState<Role | undefined | null>(undefined);
    const value = {
        profile,
        setProfile,
        role,
        setRole,
    };
    useEffect(() => {
        if (!isAuthenticated || !role) return;
        const getProfile = async () => {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: AUTH0_BACKEND_AUDIENCE,
                    },
                    cacheMode: 'off',
                });
                const profile = await role.getProfile(token);
                setProfile(profile);
            } catch (error) {
                console.error(error);
                alert('Get user profile failed!');
                window.location.reload();
            }
        }
        getProfile();
    }, [isAuthenticated, role])

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}
export const useProfileContext = () => useContext(ProfileContext);