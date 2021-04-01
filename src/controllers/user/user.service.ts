import { User } from "./user.entity";

interface IUserParam {
    [key: string]: number | string,
}

export const getUser = async (param: IUserParam): Promise<User> => {
    const user = await User.findOne(param);
    console.log(user);
    return user;
}