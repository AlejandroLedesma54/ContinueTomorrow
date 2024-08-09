import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import PermissionRepository from "../repositories/permissions";
import { Action } from "../interfaces/typeHelpers";

@injectable()
export default class UserPermissions{
    constructor(@inject("PermissionRepository") private permissionRepository: PermissionRepository) {}

    checkPermissions(action: Action, entityId: number){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const roleId: number = req.body.user.roleId
                const permissions = await this.permissionRepository.getPermissionsByRoleId(roleId);
                const permissionByEntity = permissions.find(p => p.entityId === entityId);
                console.log(permissionByEntity);

                if (!permissionByEntity) {
                    return res.status(403).send({ message: 'Permission not found' });
                }

                let hasPermission = false
                switch(action){
                    case 'create':
                        hasPermission = permissionByEntity.canCreate
                        break;          
                    case 'read':
                        hasPermission = permissionByEntity.canGet
                        break;          
                    case 'delete':
                        hasPermission = permissionByEntity.canDelete
                        break;  
                    case 'update':
                        hasPermission = permissionByEntity.canUpdate
                    
                }

                if (!hasPermission) {
                    return res.status(403).send({ message: 'Permission denied' });
                }
    
                next();
            }catch(error){
                console.error('Error checking permissions:', error);
                res.status(500).send('Internal server error');
            }
        }
    }

}