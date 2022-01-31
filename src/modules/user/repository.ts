
import { IQueryResponse } from '../../interfaces/postgres_responses';
import { getRepository, Repository } from 'typeorm';
import { IUser } from './helper';
import { User } from '../../database/entity/users';
import { general } from '../../config/general';

class UserRepository {

    public FindId=async(id: string,email:string): Promise<IQueryResponse>=>{
        try {
            const userRepo:Repository<User>=getRepository(User);
            const result=await userRepo.findOne({id:id,email:email.toLocaleLowerCase()})
            return {
                ok:result!=undefined,
                data:result
            }
        } catch (error) {
            console.log(error.message);
        }
        return {
            ok:false
        }
    }

    public login=async(data: IUser): Promise<IQueryResponse>=>{
        try {
            const validateUser=await this.ValidateUser(data);
            if(validateUser.ok){
                let password = await general.CompareBcrypt(data.password,validateUser.data.password);
                if (password) {
                    return {
                        ok:true,
                        data:validateUser.data
                    }
                }
            }
        } catch (error) {
            
        }
        return {
            ok:false
        }
    }

    public ValidateUser=async(data: IUser): Promise<IQueryResponse>=>{
        try {
            const userRepo:Repository<User>=getRepository(User);
            const result=await userRepo.findOne({email:data.email.toLocaleLowerCase()})
            return {
                ok:result!=undefined,
                data:result
            }
        } catch (error) {
            console.log(error.message);
        }
        return {
            ok:false
        }
    }

    public create= async(data: IUser): Promise<IQueryResponse>=>{
        try {
            const userRepo:Repository<User>=getRepository(User);
            var user=new User();
            user.name=data.name;
            user.lastname=data.lastname;
            user.identification=data.identification;
            user.phone=data.phone;
            user.password=await general.EncryptBcrypt(data.password.toLocaleLowerCase());
            user.email=data.email.toLocaleLowerCase();
            const result=await userRepo.save(user);
            return {
                ok:result.sequence>0?true:false,
                data:result
            }
        } catch (error) {
            console.log(error.message);
        }
        return {
            ok:false
        }
    }



}
export const userRepository = new UserRepository;