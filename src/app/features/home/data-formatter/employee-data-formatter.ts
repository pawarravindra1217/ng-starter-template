import { DTOFormatter } from "src/app/core/interfaces/dto-formatter";
import { Resource } from "src/app/core/models/Resource";
import { Employee } from "../models/employee";

export class EmployeeDataFormatter implements DTOFormatter {
    createPostData(resource: Employee) {
        return  {
            name: resource.employee_name,
            salary: resource.employee_salary,
            age: resource.employee_age
        }
    }
    formatGetData(json: Employee): Employee {
        const employee = new Employee();
        employee.id = json.id;
        employee.employee_name = json.employee_name;
        employee.employee_age = json.employee_age;
        employee.employee_salary = json.employee_salary;
        return employee;
    }
}