export const AUTHGUARD_JWT = 'jwt';
export const SWAGGER_ACCESS_TOKEN = 'ACCESS_TOKEN';

export const MENUS = [
  {
    menu: 'USER_MANAGEMENT',
    name: 'จัดการผู้ใช้งาน',
    subMenus: [
      { code: 'USER', name: 'ผู้ใช้งาน', parent: 'USER_MANAGEMENT' },
      { code: 'ROLE', name: 'บทบาท', parent: 'USER_MANAGEMENT' },
      { code: 'LOOKUP', name: 'Lookup', parent: 'USER_MANAGEMENT' },
      {
        code: 'LOGIN_HISTORY',
        name: 'ประวัติการเข้าสู่ระบบ',
        parent: 'USER_MANAGEMENT',
      },
    ],
  },
];

// ==> Roles
export const ROLE_SUPER_ADMIN = 'SUPER_ADMIN';
export const ROLE_ADMIN = 'ADMIN';
export const ROLE_MEMBER = 'MEMBER';

// ==> Privileges
export const CAN_ACCESS_MENU_USER = 'CAN_ACCESS_MENU_USER';
export const CAN_GET_USER = 'CAN_GET_USER';
export const CAN_CREATE_USER = 'CAN_CREATE_USER';
export const CAN_UPDATE_USER = 'CAN_UPDATE_USER';
export const CAN_DELETE_USER = 'CAN_DELETE_USER';
export const CAN_ACCESS_MENU_ROLE = 'CAN_ACCESS_MENU_ROLE';
export const CAN_GET_ROLE = 'CAN_GET_ROLE';
export const CAN_CREATE_ROLE = 'CAN_CREATE_ROLE';
export const CAN_UPDATE_ROLE = 'CAN_UPDATE_ROLE';
export const CAN_DELETE_ROLE = 'CAN_DELETE_ROLE';
export const CAN_ACCESS_MENU_LOOKUP = 'CAN_ACCESS_MENU_LOOKUP';
export const CAN_GET_LOOKUP = 'CAN_GET_LOOKUP';
export const CAN_CREATE_LOOKUP = 'CAN_CREATE_LOOKUP';
export const CAN_UPDATE_LOOKUP = 'CAN_UPDATE_LOOKUP';
export const CAN_DELETE_LOOKUP = 'CAN_DELETE_LOOKUP';

export const ROLES = [
  { code: ROLE_SUPER_ADMIN, name: 'SUPER_ADMIN' },
  { code: ROLE_ADMIN, name: 'ADMIN' },
  { code: ROLE_MEMBER, name: 'MEMBER' },
];

export const PRIVILEGES = [
  { group: 'USER', code: CAN_ACCESS_MENU_USER, name: 'Can access menu' },
  { group: 'USER', code: CAN_GET_USER, name: 'Can get' },
  { group: 'USER', code: CAN_CREATE_USER, name: 'Can create' },
  { group: 'USER', code: CAN_UPDATE_USER, name: 'Can update' },
  { group: 'USER', code: CAN_DELETE_USER, name: 'Can delete' },
  { group: 'ROLE', code: CAN_ACCESS_MENU_ROLE, name: 'Can access menu' },
  { group: 'ROLE', code: CAN_GET_ROLE, name: 'Can get' },
  { group: 'ROLE', code: CAN_CREATE_ROLE, name: 'Can create' },
  { group: 'ROLE', code: CAN_UPDATE_ROLE, name: 'Can update' },
  { group: 'ROLE', code: CAN_DELETE_ROLE, name: 'Can delete' },
  { group: 'LOOKUP', code: CAN_ACCESS_MENU_LOOKUP, name: 'Can access menu' },
  { group: 'LOOKUP', code: CAN_GET_LOOKUP, name: 'Can get' },
  { group: 'LOOKUP', code: CAN_CREATE_LOOKUP, name: 'Can create' },
  { group: 'LOOKUP', code: CAN_UPDATE_LOOKUP, name: 'Can update' },
  { group: 'LOOKUP', code: CAN_DELETE_LOOKUP, name: 'Can delete' },
];
