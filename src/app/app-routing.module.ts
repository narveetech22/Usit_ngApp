import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddTechnologyComponent } from './Usit/components/technology/add-technology/add-technology.component';
import { ListTechnologyComponent } from './Usit/components/technology/list-technology/list-technology.component';
import { EditTechnologyComponent } from './Usit/components/technology/edit-technology/edit-technology.component';
import { ListRoleComponent } from './Usit/Usermanagement/role/list-role/list-role.component';
import { RegisterRoleComponent } from './Usit/Usermanagement/role/register-role/register-role.component';
import { EditRoleComponent } from './Usit/Usermanagement/role/edit-role/edit-role.component';
import { RegisterEmployeeComponent } from './Usit/Usermanagement/employee/register-employee/register-employee.component';
import { EditEmployeeComponent } from './Usit/Usermanagement/employee/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './Usit/Usermanagement/employee/list-employees/list-employees.component';
import { MailinboxComponent } from './Usit/components/email/mailinbox/mailinbox.component';
import { LogoutComponent } from './Usit/components/userlogin/logout/logout.component';
import { AddVendorComponent } from './Usit/components/vendormanagement/add-vendor/add-vendor.component';
import { ListVendorComponent } from './Usit/components/vendormanagement/list-vendor/list-vendor.component';
import { EditVendorComponent } from './Usit/components/vendormanagement/edit-vendor/edit-vendor.component';
import { ListRecruiterComponent } from './Usit/components/vendormanagement/list-recruiter/list-recruiter.component';
import { EditRecruiterComponent } from './Usit/components/vendormanagement/edit-recruiter/edit-recruiter.component';
import { AddRecruiterComponent } from './Usit/components/vendormanagement/add-recruiter/add-recruiter.component';
import { CityComponent } from './Usit/components/masters/city/city.component';
import { ExceluploadComponent } from './Usit/components/vendormanagement/excelupload/excelupload.component';
import { AddStateComponent } from './Usit/components/masters/add-state/add-state.component';
import { ListStatesComponent } from './Usit/components/masters/list-states/list-states.component';
import { ListCityComponent } from './Usit/components/masters/list-city/list-city.component';
import { ListPincodeComponent } from './Usit/components/masters/list-pincode/list-pincode.component';
import { PincodeComponent } from './Usit/components/masters/pincode/pincode.component';
import { RecruiterexceluplComponent } from './Usit/components/vendormanagement/recruiterexcelupl/recruiterexcelupl.component';
import { CreateUserComponent } from './Usit/components/userlogin/create-user/create-user.component';
import { ListInterviewComponent } from './Usit/components/sales/interview/list-interview/list-interview.component';
import { AddInterviewComponent } from './Usit/components/sales/interview/add-interview/add-interview.component';
import { EditInterviewComponent } from './Usit/components/sales/interview/edit-interview/edit-interview.component';
import { ListRequirementsComponent } from './Usit/components/recruiting/list-requirements/list-requirements.component';
import { AddRequirementsComponent } from './Usit/components/recruiting/add-requirements/add-requirements.component';
import { EditRequirementsComponent } from './Usit/components/recruiting/edit-requirements/edit-requirements.component';
import { AddtechsupportComponent } from './Usit/components/techsupport/addtechsupport/addtechsupport.component';
import { ListTechsupportComponent } from './Usit/components/techsupport/list-techsupport/list-techsupport.component';
import { EditTechsupportComponent } from './Usit/components/techsupport/edit-techsupport/edit-techsupport.component';
import { RegisterInterviewsComponent } from './Usit/components/recruiting/register-interviews/register-interviews.component';
import { EditRecinterviewComponent } from './Usit/components/recruiting/edit-recinterview/edit-recinterview.component';
import { ListRecinterviewComponent } from './Usit/components/recruiting/list-recinterview/list-recinterview.component';
import { AddVisaComponent } from './Usit/components/masters/add-visa/add-visa.component';
import { ListVisaComponent } from './Usit/components/masters/list-visa/list-visa.component';
import { EditVisaComponent } from './Usit/components/masters/edit-visa/edit-visa.component';
import { EditStatesComponent } from './Usit/components/masters/edit-states/edit-states.component';
import { EditCityComponent } from './Usit/components/masters/edit-city/edit-city.component';
import { EditZipcodeComponent } from './Usit/components/masters/edit-zipcode/edit-zipcode.component';
import { ChangePasswordComponent } from './Usit/components/change-password/change-password.component';
import { ListPrivilegeComponent } from './Usit/components/privilege/list-privilege/list-privilege.component';
import { RegisterPrivilegeComponent } from './Usit/components/privilege/register-privilege/register-privilege.component';
import { LoginComponent } from './Usit/Usermanagement/login/login.component';
import { ForgtpasswordComponent } from './Usit/Usermanagement/forgtpassword/forgtpassword.component';
import { UserprofileComponent } from './Usit/Usermanagement/userprofile/userprofile.component';
import { AddconsultantComponent } from './Usit/consultant/addconsultant/addconsultant.component';
import { ConsultantslistComponent } from './Usit/consultant/consultantslist/consultantslist.component';
import { ManageconsultantComponent } from './Usit/consultant/manageconsultant/manageconsultant.component';
import { SubmissionentryComponent } from './Usit/submission/submissionentry/submissionentry.component';
import { SubmissionlistComponent } from './Usit/submission/submissionlist/submissionlist.component';
import { ManagesubmissionComponent } from './Usit/submission/managesubmission/managesubmission.component';
import { MailbodyComponent } from './Usit/components/email/mailbody/mailbody.component';
import { EmailextractionComponent } from './Usit/components/email/emailextraction/emailextraction.component';
import { ConsultantinfoComponent } from './Usit/consultant/consultantinfo/consultantinfo.component';
import { UserinfoComponent } from './Usit/Usermanagement/userinfo/userinfo.component';
import { ConsultantreportComponent } from './Usit/reports/consultantreport/consultantreport.component';
import { AddQualificationComponent } from './Usit/components/masters/add-qualification/add-qualification.component';
import { ListQualificationComponent } from './Usit/components/masters/list-qualification/list-qualification.component';
import { ManageQualificationComponent } from './Usit/components/masters/manage-qualification/manage-qualification.component';
import { TreegridComponent } from './treegrid/treegrid.component';
import { H1bemployeeinfoComponent } from './h1bemployeeinfo/h1bemployeeinfo.component';
import { H1bemployeelistComponent } from './h1bemployeelist/h1bemployeelist.component';
import { AllattributesComponent } from './allattributes/allattributes.component';


const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  // usit start from here
  { path: 'login', component: LoginComponent },
  //{ path: '/',   redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: "forgot-password", component: ForgtpasswordComponent },
  { path: 'my-profile', component: UserprofileComponent },
  { path: 'list-roles', component: ListRoleComponent },
  { path: 'register-roles', component: RegisterRoleComponent },
  { path: 'edit-roles/:id', component: EditRoleComponent },
  { path: 'register-technology', component: AddTechnologyComponent },
  { path: 'list-technology', component: ListTechnologyComponent },
  { path: 'edit-technology/:id', component: EditTechnologyComponent },
  { path: 'register-employee', component: RegisterEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'list-employees', component: ListEmployeesComponent },
  { path: 'register-city', component: CityComponent },
  { path: 'edit-city/:id', component: EditCityComponent },
  { path: 'list-city', component: ListCityComponent },
  { path: 'list-zipcode', component: ListPincodeComponent },
  { path: 'register-zipcode', component: PincodeComponent },
  { path: 'edit-zipcode/:id', component: EditZipcodeComponent },
  { path: 'add-visa', component: AddVisaComponent },
  { path: 'edit-visa/:id', component: EditVisaComponent },
  { path: 'list-visa', component: ListVisaComponent },
  { path: 'register-state', component: AddStateComponent },
  { path: 'list-state', component: ListStatesComponent },
  { path: 'edit-state/:id', component: EditStatesComponent },

  // Qualification Master
  { path: 'add-qualification', component: AddQualificationComponent },
  { path: 'list-qualification', component: ListQualificationComponent },
  { path: 'edit-qualification/:id', component: ManageQualificationComponent },
  // pre - sales
  { path: 'pre-sales/:flg', component: ConsultantslistComponent },
  // consultant
  { path: 'add-consultants/:flg', component: AddconsultantComponent },
  { path: 'sales-consultants/:flg', component: ConsultantslistComponent },
  { path: 'recruiting-consultants/:flg', component: ConsultantslistComponent },
  { path: 'modify-consultant/:flg/:id', component: ManageconsultantComponent },
  { path: 'modify-consultant/:flg/:id', component: ManageconsultantComponent },
  { path: 'consultant/:flg1/:flg/:id', component: ConsultantinfoComponent },
  { path: 'user/:flg/:id', component: UserinfoComponent },
  { path: 'interview-entry/:flg', component: AddInterviewComponent },
  { path: 'sales-interview/:flg', component: ListInterviewComponent },
  { path: 'recruiting-interview/:flg', component: ListInterviewComponent },
  { path: 'modify-interview/:flg/:id', component: EditInterviewComponent },
  { path: 'modify-interview/:flg/:id', component: EditInterviewComponent },
  { path: 'submission-entry/:flg', component: SubmissionentryComponent },
  { path: 'sales-submission/:flg', component: SubmissionlistComponent },
  { path: 'recruiting-submission/:flg', component: SubmissionlistComponent },
  { path: 'modify-submission/:flg/:id', component: ManagesubmissionComponent },
  { path: 'modify-submission/:flg/:id', component: ManagesubmissionComponent },
  { path: 'list-mail', component: MailinboxComponent },
  { path: 'mail-content/:id', component: MailbodyComponent },

  { path: 'register-vendor', component: AddVendorComponent },
  { path: 'list-vendor', component: ListVendorComponent },
  { path: 'edit-vendor/:id', component: EditVendorComponent },
  { path: 'list-recruiter', component: ListRecruiterComponent },
  { path: 'edit-recruiter/:id', component: EditRecruiterComponent },
  { path: 'register-recruiter', component: AddRecruiterComponent },

  { path: 'excel-upload', component: ExceluploadComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user-register', component: CreateUserComponent },
  { path: 'upload-excel', component: RecruiterexceluplComponent },

  { path: 'list-interview', component: ListInterviewComponent },
  { path: 'register-interview', component: AddInterviewComponent },
  { path: 'edit-interview/:id', component: EditInterviewComponent },

  { path: 'recruiting-requirements', component: ListRequirementsComponent },
  { path: 'register-recruiting', component: AddRequirementsComponent },
  { path: 'edit-recruiting/:id', component: EditRequirementsComponent },

  { path: 'register-techsupport', component: AddtechsupportComponent },
  { path: 'list-techsupport', component: ListTechsupportComponent },
  { path: 'edit-techsupport/:id', component: EditTechsupportComponent },

  { path: 'add-interview', component: RegisterInterviewsComponent },
  { path: 'edit-interviews/:id', component: EditRecinterviewComponent },
  { path: 'list-interviews', component: ListRecinterviewComponent },

  { path: 'change-password/:id', component: ChangePasswordComponent },
  { path: 'list-privilage/:id', component: ListPrivilegeComponent },
  { path: 'register-privilage', component: RegisterPrivilegeComponent },

  { path: 'extract-email', component: EmailextractionComponent },

  // reports
  { path: 'consultant-report', component: ConsultantreportComponent },
  { path: 'tree-grid/grid', component: TreegridComponent },
  { path: 'h1binfo', component: H1bemployeeinfoComponent },
  { path: 'h1binfolist', component: H1bemployeelistComponent },
  { path: 'ALL', component: AllattributesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
