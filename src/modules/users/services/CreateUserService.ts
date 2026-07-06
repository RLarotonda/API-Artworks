import AppError from "src/shared/errors/AppError";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest):
    Promise<User> {
        const usersRepository = new UsersRepository();
        const emailExists = await usersRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email address already used');
        }
        const hashedPassword = await hash(password, 8);
        const user = await usersRepository.createUser({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
}