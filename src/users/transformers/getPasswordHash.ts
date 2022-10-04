import { hash } from 'bcrypt';
export async function getPasswordHash(password: string): Promise<string> {
  return await hash(password, 10);
}
