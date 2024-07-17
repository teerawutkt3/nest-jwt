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

export const ROLE_SUPER_ADMIN = 'SUPER_ADMIN';
export const ROLE_ADMIN = 'ADMIN';
export const ROLE_MEMBER = 'MEMBER';

export const ROLES = [
  { code: ROLE_SUPER_ADMIN, name: 'SUPER_ADMIN' },
  { code: ROLE_ADMIN, name: 'ADMIN' },
  { code: ROLE_MEMBER, name: 'MEMBER' },
];

export const PRIVILEGES = [
  { group: 'USER', code: 'CAN_ACCESS_MENU_USER', name: 'Can access menu' },
  { group: 'USER', code: 'CAN_GET_USER', name: 'Can get' },
  { group: 'USER', code: 'CAN_CREATE_USER', name: 'Can create' },
  { group: 'USER', code: 'CAN_UPDATE_USER', name: 'Can update' },
  { group: 'USER', code: 'CAN_DELETE_USER', name: 'Can delete' },

  { group: 'ROLE', code: 'CAN_ACCESS_MENU_ROLE', name: 'Can access menu' },
  { group: 'ROLE', code: 'CAN_GET_ROLE', name: 'Can get' },
  { group: 'ROLE', code: 'CAN_CREATE_ROLE', name: 'Can create' },
  { group: 'ROLE', code: 'CAN_UPDATE_ROLE', name: 'Can update' },
  { group: 'ROLE', code: 'CAN_DELETE_ROLE', name: 'Can delete' },

  { group: 'LOOKUP', code: 'CAN_ACCESS_MENU_LOOKUP', name: 'Can access menu' },
  { group: 'LOOKUP', code: 'CAN_GET_LOOKUP', name: 'Can get' },
  { group: 'LOOKUP', code: 'CAN_CREATE_LOOKUP', name: 'Can create' },
  { group: 'LOOKUP', code: 'CAN_UPDATE_LOOKUP', name: 'Can update' },
  { group: 'LOOKUP', code: 'CAN_DELETE_LOOKUP', name: 'Can delete' },
];
