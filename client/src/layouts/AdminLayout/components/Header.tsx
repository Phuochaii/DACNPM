import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedButton from '../../HRLayout/components/RoundedButton';
import { useAuth0 } from '@auth0/auth0-react';
import { AUTH0_CLIENT_ID } from '../../../shared/services/authen/infrastructure/config';
import {
  Roles,
  useProfileContext,
} from '../../../shared/services/authen/domain/context';
const accountButton = {
  name: '',
  link: '',
  icon: ChevronDown,
  iconSize: 20,
  image:
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg',
};

function Header() {
  const navigation = useNavigate();
  const { logout } = useAuth0();
  const { profile } = useProfileContext();

  const [displayAccountTab, setDisplayAccountTab] = useState(false);

  return (
    <div className="flex fixed bg-white items-center justify-between h-16 gap-6 px-4 top-0 left-0 right-0 z-50">
      <div className="flex-1 h-full">
        <img
          src="../../../images/t4cvs-logo.png"
          className="object-contain h-full"
        ></img>
      </div>
      {/* <SearchBar placeholder="Search " /> */}

      <li className="relative list-none">
        <a
          className="inline-flex items-center text-center bg-transparent"
          onClick={() => setDisplayAccountTab(!displayAccountTab)}
        >
          <RoundedButton
            text={accountButton.name}
            icon={accountButton.icon}
            image={profile?.picture ?? accountButton.image}
            iconSize={accountButton.iconSize}
            onClick={() => {
              navigation(accountButton.link);
            }}
          />
        </a>
        {/* <!-- Dropdown menu --> */}
        {displayAccountTab ? (
          <div className="absolute right-0 z-50 pt-3 top-8">
            <ul
              className="max-h-[320px] overflow-y-scroll dropdown  hover:text-green-500 w-56 z-50font-semibold text-base bg-white border border-slate-100 rounded-lg py-2 flex flex-col gap-3 shadow-lg"
              aria-labelledby="dropdownDividerButton"
            >
              <li
                className={'px-4 py-2 m-0 border-b-gray-200 border'}
                onClick={() => {
                  logout({
                    clientId: AUTH0_CLIENT_ID,
                    logoutParams: {
                      returnTo: `${window.location.origin}${Roles.ADMIN.loginUrl}`,
                    },
                  });
                }}
              >
                <span className="text-black cursor-pointer hover:text-green-500">
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </li>
    </div>
  );
}

export default Header;
