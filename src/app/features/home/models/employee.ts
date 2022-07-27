import { Resource } from "src/app/core/models/Resource";

export class Employee extends Resource{
    employee_name: string | undefined;
	employee_salary: number | undefined;
	employee_age: number | undefined;
}