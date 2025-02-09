import { User } from 'your-user-model-path'; // Adjust the import to your User model path

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
