import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from "ngx-ui-loader";

import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterRoleComponent } from './Usit/Usermanagement/role/register-role/register-role.component';
import { RegisterEmployeeComponent } from './Usit/Usermanagement/employee/register-employee/register-employee.component';
import { EditEmployeeComponent } from './Usit/Usermanagement/employee/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './Usit/Usermanagement/employee/list-employees/list-employees.component';



import { EditRoleComponent } from './Usit/Usermanagement/role/edit-role/edit-role.component';
import { ListRoleComponent } from './Usit/Usermanagement/role/list-role/list-role.component';
import { RegisterPrivilegeComponent } from './Usit/components/privilege/register-privilege/register-privilege.component';
import { ListPrivilegeComponent } from './Usit/components/privilege/list-privilege/list-privilege.component';
import { EditPrivilegeComponent } from './Usit/components/privilege/edit-privilege/edit-privilege.component';
import { AddInterviewComponent } from './Usit/components/sales/interview/add-interview/add-interview.component';
import { ListInterviewComponent } from './Usit/components/sales/interview/list-interview/list-interview.component';
import { EditInterviewComponent } from './Usit/components/sales/interview/edit-interview/edit-interview.component';
import { AddTechnologyComponent } from './Usit/components/technology/add-technology/add-technology.component';
import { EditTechnologyComponent } from './Usit/components/technology/edit-technology/edit-technology.component';
import { ListTechnologyComponent } from './Usit/components/technology/list-technology/list-technology.component';
import { MailinboxComponent } from './Usit/components/email/mailinbox/mailinbox.component';
import { LogoutComponent } from './Usit/components/userlogin/logout/logout.component';
import { AddVendorComponent } from './Usit/components/vendormanagement/add-vendor/add-vendor.component';
import { EditVendorComponent } from './Usit/components/vendormanagement/edit-vendor/edit-vendor.component';
import { ListVendorComponent } from './Usit/components/vendormanagement/list-vendor/list-vendor.component';
import { ListRecruiterComponent } from './Usit/components/vendormanagement/list-recruiter/list-recruiter.component';
import { EditRecruiterComponent } from './Usit/components/vendormanagement/edit-recruiter/edit-recruiter.component';
import { AddRecruiterComponent } from './Usit/components/vendormanagement/add-recruiter/add-recruiter.component';
import { CityComponent } from './Usit/components/masters/city/city.component';
import { PincodeComponent } from './Usit/components/masters/pincode/pincode.component';
import { ListPincodeComponent } from './Usit/components/masters/list-pincode/list-pincode.component';
import { ListCityComponent } from './Usit/components/masters/list-city/list-city.component';
import { ExceluploadComponent } from './Usit/components/vendormanagement/excelupload/excelupload.component';
import { AddStateComponent } from './Usit/components/masters/add-state/add-state.component';
import { ListStatesComponent } from './Usit/components/masters/list-states/list-states.component';
import { RecruiterexceluplComponent } from './Usit/components/vendormanagement/recruiterexcelupl/recruiterexcelupl.component';
import { CreateUserComponent } from './Usit/components/userlogin/create-user/create-user.component';
import { ListRequirementsComponent } from './Usit/components/recruiting/list-requirements/list-requirements.component';
import { EditRequirementsComponent } from './Usit/components/recruiting/edit-requirements/edit-requirements.component';
import { AddRequirementsComponent } from './Usit/components/recruiting/add-requirements/add-requirements.component';
import { AddtechsupportComponent } from './Usit/components/techsupport/addtechsupport/addtechsupport.component';
import { ListTechsupportComponent } from './Usit/components/techsupport/list-techsupport/list-techsupport.component';
import { EditTechsupportComponent } from './Usit/components/techsupport/edit-techsupport/edit-techsupport.component';
import { RegisterInterviewsComponent } from './Usit/components/recruiting/register-interviews/register-interviews.component';
import { EditRecinterviewComponent } from './Usit/components/recruiting/edit-recinterview/edit-recinterview.component';
import { ListRecinterviewComponent } from './Usit/components/recruiting/list-recinterview/list-recinterview.component';
import { AddVisaComponent } from './Usit/components/masters/add-visa/add-visa.component';
import { EditVisaComponent } from './Usit/components/masters/edit-visa/edit-visa.component';
import { ListVisaComponent } from './Usit/components/masters/list-visa/list-visa.component';
import { EditStatesComponent } from './Usit/components/masters/edit-states/edit-states.component';
import { EditCityComponent } from './Usit/components/masters/edit-city/edit-city.component';
import { EditZipcodeComponent } from './Usit/components/masters/edit-zipcode/edit-zipcode.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ResetPasswordComponent } from './Usit/components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Usit/components/change-password/change-password.component';
import { HttpInterceptorService } from './httpInterceptor.service';

//usit start here
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

import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { EmailextractionComponent } from './Usit/components/email/emailextraction/emailextraction.component';
import { ConsultantinfoComponent } from './Usit/consultant/consultantinfo/consultantinfo.component';
import { UserinfoComponent } from './Usit/Usermanagement/userinfo/userinfo.component';
import { ConsultantreportComponent } from './Usit/reports/consultantreport/consultantreport.component';
import { AddQualificationComponent } from './Usit/components/masters/add-qualification/add-qualification.component';
import { ListQualificationComponent } from './Usit/components/masters/list-qualification/list-qualification.component';
import { ManageQualificationComponent } from './Usit/components/masters/manage-qualification/manage-qualification.component';
import {MatChipsModule} from '@angular/material/chips';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TreegridComponent } from './treegrid/treegrid.component';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { H1bemployeeinfoComponent } from './h1bemployeeinfo/h1bemployeeinfo.component';
import { H1bemployeelistComponent } from './h1bemployeelist/h1bemployeelist.component';
import { AllattributesComponent } from './allattributes/allattributes.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { IntlInputPhoneModule } from 'intl-input-phone';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    RegisterEmployeeComponent,
    EditEmployeeComponent,
    EditRoleComponent,
    ListRoleComponent,
    RegisterRoleComponent,
    RegisterPrivilegeComponent,
    ListPrivilegeComponent,
    EditPrivilegeComponent,
    AddInterviewComponent,
    ListInterviewComponent,
    EditInterviewComponent,
    AddTechnologyComponent,
    EditTechnologyComponent,
    ListTechnologyComponent,
    ListEmployeesComponent,

    MailinboxComponent,
    LogoutComponent,
    AddVendorComponent,
    EditVendorComponent,
    ListVendorComponent,
    ListRecruiterComponent,
    EditRecruiterComponent,
    AddRecruiterComponent,
    CityComponent,
    PincodeComponent,
    ListPincodeComponent,
    ListCityComponent,
    ExceluploadComponent,
    AddStateComponent,
    ListStatesComponent,
    RecruiterexceluplComponent,
    CreateUserComponent,
    ListRequirementsComponent,
    EditRequirementsComponent,
    AddRequirementsComponent,
    AddtechsupportComponent,
    ListTechsupportComponent,
    EditTechsupportComponent,
    RegisterInterviewsComponent,
    EditRecinterviewComponent,
    ListRecinterviewComponent,
    AddVisaComponent,
    EditVisaComponent,
    ListVisaComponent,
    EditStatesComponent,
    EditCityComponent,
    EditZipcodeComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,

    // usit start here
    LoginComponent,
    ForgtpasswordComponent,
    UserprofileComponent,
    AddconsultantComponent,
    ConsultantslistComponent,
    ManageconsultantComponent,
    SubmissionentryComponent,
    SubmissionlistComponent,
    ManagesubmissionComponent,
    MailbodyComponent,
    EmailextractionComponent,
    ConsultantinfoComponent,
    UserinfoComponent,
    ConsultantreportComponent,
    AddQualificationComponent,
    ListQualificationComponent,
    ManageQualificationComponent,
    TreegridComponent,
    H1bemployeeinfoComponent,
    H1bemployeelistComponent,
    AllattributesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatInputModule,
    MatTableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxUiLoaderModule,
    MatChipsModule,
    GooglePlaceModule,
    MatAutocompleteModule,
    TreeGridModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    TooltipModule
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy,

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },PageService,
    SortService,
    FilterService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
