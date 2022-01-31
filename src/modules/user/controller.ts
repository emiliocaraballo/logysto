import { Request, Response } from 'express';
import { general } from '../../config/general';
import { auth } from "../../middlewares/auth";
import { IUser } from './helper';
import { userRepository } from './repository';

class UserController {

    public refresh= async (req: Request, res: Response): Promise<Response> => {
        const { email }: IUser = req.body;

        var id=req.body.token.data.user.id;
        
        if(!general.validateData("mail",email,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Email es obligatorio.'
             });
        }
        try {
          const user=await userRepository.FindId(id,email);
          if(user.ok){
            const token=await auth.generateToken({user:{id:user.data.id}});
            const tokenRefresh=await auth.generateTokenRefresh({user:{id:user.data.id}});
            return res.status(200).json({code:1,data:{
                token:token,
                tokenrefresh:tokenRefresh,
                data:{
                    name:user.data.name,
                    lastname:user.data.lastname,
                    email:user.data.email,
                    phone:user.data.phone
                }
            },message:""});
        }
        } catch (error) {
            
        }

         return res.status(404).json({code:0,message:"Verifique el correo"});
    }
    public login= async (req: Request, res: Response): Promise<Response> => {
        
        req.body.email=req.body.username;
        const { email,password }: IUser = req.body;
        
        if(!general.validateData("mail",email,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Email es obligatorio.'
             });
         }
        if(!general.validateData("string",password,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Password es obligatorio.'
             });
         }

         try {
            const validarUser=await userRepository.login(req.body);
            if(validarUser.ok){
                const token=await auth.generateToken({user:{id:validarUser.data.id}});
                const tokenRefresh=await auth.generateTokenRefresh({user:{id:validarUser.data.id}});

                return res.status(200).json({code:1,data:{
                    token:token,
                    tokenrefresh:tokenRefresh,
                    data:{
                        name:validarUser.data.name,
                        lastname:validarUser.data.lastname,
                        email:validarUser.data.email,
                        phone:validarUser.data.phone
                    }
                },message:""});
            }
         } catch (error) {
             
         }
         return res.status(404).json({code:0,message:"Email o password incorrecto."});
    }
    public create= async (req: Request, res: Response): Promise<Response> => {
        /** atravez de la Interface se configura lo dato permitido por el body */
        const { name,lastname,identification,phone,email,password }: IUser = req.body;
        
        /**validar*/
        if(!general.validateData("string",name,1)){
           return res.status(400).json({
                code:0,
                message: 'Nombre es obligatorio.'
            });
        }
        if(!general.validateData("string",lastname,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Apellido es obligatorio.'
             });
         }
        if(!general.validateData("string",identification,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Identificación es obligatorio.'
             });
         }
        if(!general.validateData("string",phone,10,10)){
            return res.status(400).json({
                 code:0,
                 message: 'Celular es obligatorio y solo permite 10 dígito.'
             });
         }
         if(!general.validateData("mail",email,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Email es obligatorio o verifique formato.'
             });
         }
         if(!general.validateData("string",password,1)){
            return res.status(400).json({
                 code:0,
                 message: 'Password es obligatorio.'
             });
         }
         /** end:validar */
         
         try { 
            
            const validarUser=await userRepository.ValidateUser(req.body);
            if(validarUser.ok){
                return res.status(400).json({code:0,message:"Email ya existe."});
            }
            const createService=await userRepository.create(req.body);
            if(createService.ok){
                return res.status(201).json({code:1,message:"Se ha registrado exitosamente"});
            }
         } catch (e) {
            // console.log(e.message);
         }
         return res.status(404).json({code:0,message:"Hubo un inconveniente por favor intentelo más tarde."});
    }

}
export const userController = new UserController;