import AppError from "src/shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path/win32";

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = new UsersRepository();
        const usersTokensRepository = new UserTokensRepository();
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        const user = await usersRepository.findByEmail(email);

        if (!user) {
        throw new AppError("User does not exist.");
        }

        const { token } = await usersTokensRepository.generate(user.id);

        // futuramente, enviar o token por e-mail
        console.log(token);
        await EtherealMail.sendMail({
            to: {name: user.name, email: user.email}, 
            subject: '[API VENDAS] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                name: user.name,
                link: `http://localhost:3000/reset_password?token=${token}`, //front que vai tratar
                },
            },
        });
    }
}

