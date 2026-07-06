import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "src/shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UserTokensRepository();

    const userToken = await usersTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError("User Token does not exist.");
    }

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User does not exist.");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.");
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
