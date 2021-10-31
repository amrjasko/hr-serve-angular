import { Department } from "./department";

export class Employee {
    constructor(public employeeId: number, public firstName: string,
        public lastName: string, public phoneNumber: string
        ,public hireDate : Date,public salary:number,public departmentId:number,
        public managerId:number) { };
}
