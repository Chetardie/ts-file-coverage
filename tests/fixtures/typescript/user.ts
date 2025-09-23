export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export class UserService {
  private users: User[] = [];

  constructor(private apiUrl: string) {}

  async getUser(id: number): Promise<User | null> {
    const response = await fetch(`${this.apiUrl}/users/${id}`);
    if (!response.ok) {
      return null;
    }
    return response.json();
  }

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUsersByStatus(isActive: boolean): User[] {
    return this.users.filter((user) => user.isActive === isActive);
  }
}
