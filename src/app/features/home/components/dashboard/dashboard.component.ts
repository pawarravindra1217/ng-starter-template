import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { GlobalConstants } from 'src/app/core/utils/global-constants';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { EmployeeDataFormatter } from '../../data-formatter/employee-data-formatter';
import { Employee } from '../../models/employee';
import { HomeStringConstants } from '../../utils/home-string-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] | undefined;
  ASSETS_LINK: any = HomeStringConstants.ASSETS;
  constructor(public _authService: AuthenticationService, private httpService: HttpService<Employee>) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.httpService.getAll(GlobalConstants.endPoints.EMPLOYEE.getAll, new EmployeeDataFormatter)
                    .subscribe((res: Employee[]) => {
                      console.log('Employee data', res);
                      this.employees = res;
                    });
  }
}
