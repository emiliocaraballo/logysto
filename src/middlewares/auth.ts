import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';

class Auth {
    // general token
    public generateToken = async (data: any) => {
        return jwt.sign({
            data
        },
            process.env.JWT_SECRET + '',
            {
                expiresIn: process.env.JWT_DURATION
            }
        );
    }

    // validar el token.
    public validateToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: string = req.headers.authorization + '';
            return jwt.verify(token, process.env.JWT_SECRET + '', async (err) => {
                if (err) return res.status(401).json({
                    code: -2,
                    message: 'Token Invalido'
                });     

            const datatoken = jwt_decode(token);
            req.body.token=datatoken;
            next();
        });
            
        } catch (error) {
            
        }
        res.status(401).json({
            code:-2,
            message:"Token Invalido",
        })
    }
    
    public generateTokenRefresh = async (data: any) => {
        return jwt.sign({
            data
        },
            process.env.JWT_SECRET_REFRESH + '',
            {
                expiresIn: process.env.JWT_DURATION_REFRESH
            }
        );
    }
     // validar el token.
     public validateTokenRefresh = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: string = req.headers.authorization + '';
            
            return jwt.verify(token, process.env.JWT_SECRET_REFRESH + '', async (err) => {
                if (err) return res.status(401).json({
                    code: -2,
                    message: 'Token Invalido'
                });     

            const datatoken = jwt_decode(token);
            req.body.token=datatoken;
            next();
        });
            
        } catch (error) {
            
        }
        res.status(401).json({
            code:-2,
            message:"Token Invalido",
        })
    }

}

export const auth: Auth = new Auth;