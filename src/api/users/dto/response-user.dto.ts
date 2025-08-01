import { Exclude, Expose } from "class-transformer";
import { Gender, Status } from "src/constants/app.constant";
import { Role } from "src/constants/role.constant";


@Exclude()
export class ResponseUserDto {

    @Expose()
    id: string;
    
    @Expose()
    fullName: string;

    @Expose()
    avatar?: string;

    @Expose()
    phone?: string;

    @Expose()
    status?: Status;

    @Expose()
    email: string;

    @Expose()
    gender?: Gender; 

    @Expose()
    role: Role

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}