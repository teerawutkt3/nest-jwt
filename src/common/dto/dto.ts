export class CommonResponse<T> {
  constructor();
  constructor(message: string);
  constructor(message: string, data: T);
  constructor(message?: string, data?: T) {
    this.message = message;
    this.data = data;
  }
  message: string;
  data: T;
}

export class UserProfile {
  username: string;
  permission = new Permission();
}

export class Permission {
  roles: string[];
  privileges: string[];
}
