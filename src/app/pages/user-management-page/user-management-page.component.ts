import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';
import { User } from 'src/app/dto/user';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserMasterService } from 'src/app/pages/user-management-page/user-master.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent {

  constructor(private utilityService: UtilityService, private userMasterService: UserMasterService, public spinner: NgxSpinnerService, private chref: ChangeDetectorRef) {
    this.utilityService.componentTitle = "USER MANAGEMENT";
  }
  private dataTable: any;
  public index: number;
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  userModel: User;
  userList: User[] = new Array<User>();
  ngOnInit() {
    let that = this;
    this.spinner.show();
    this.userMasterService.getAllUsers().subscribe(response => {
      if (response != null) {
        that.userList = response;

        $(document).ready(function () {
          that.dataTable = (<any>$('#dtBasicExample')).DataTable(
            {
              "bLengthChange": false,
              "retrieve": true,
              "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
              }],
              "order": [[1, 'asc']]

            }
          );//.rows(this.userList).add().draw();
          that.dataTable.on('order.dt search.dt', function () {
            that.dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
              cell.innerHTML = i + 1;
            });
          }).draw();
          $('.dataTables_length').addClass('bs-select');
          that.spinner.hide();
        });
      }
    });
    //that.dataTable.row.add(that.userList).draw()//"full-hold");
  }


  onNew() {

    this.userModel = new User();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display User registration entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      this.spinner.show();
      let that = this;

      that.userModel.active = true;
      this.userMasterService.addUser(this.userModel).subscribe(response => {
        // that.dataTable.clear();
        if ($.fn.dataTable.isDataTable("#dtBasicExample")) {
          that.dataTable.destroy();
        }
        that.userList.push(<User>response);
        console.log(that.userModel + " list length: " + this.userList.length);
        that.chref.detectChanges();
        // that.initializeDataTable();
        that.dataTable = (<any>$('#dtBasicExample')).DataTable(
          {
            "bLengthChange": false,
            "retrieve": true,
            "columnDefs": [{
              "searchable": false,
              "orderable": false,
              "targets": 0
            }],
            "order": [[1, 'asc']]

          }
        );//.rows(this.userList).add().draw();
        that.dataTable.on('order.dt search.dt', function () {
          that.dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
          });
        }).draw();

        $('.dataTables_length').addClass('bs-select');
        that.spinner.hide();
      });
    }
    else {
      this.spinner.show();
      let that = this;
      console.log("password: " + this.userModel.password);
      this.userMasterService.updateUser(this.userModel).subscribe(response => {
        that.dataTable.destroy();
        that.userList[this.selectedRow] = that.userModel;
        that.chref.detectChanges();
        that.dataTable = (<any>$('#dtBasicExample')).DataTable(
          {
            "bLengthChange": false,
            "retrieve": true,
            "columnDefs": [{
              "searchable": false,
              "orderable": false,
              "targets": 0
            }],
            "order": [[1, 'asc']]

          }
        );
        that.dataTable.on('order.dt search.dt', function () {
          that.dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
          });
        }).draw();

        $('.dataTables_length').addClass('bs-select');

        that.spinner.hide();
      })
    }
    this.showNew = false;
  }
  onModelChange(event: any) {
    console.log("Password: " + event);
  }
  onEdit(index) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new registration.
    this.userModel = new User();
    // Retrieve selected registration from list and assign to model.
    this.userModel = Object.assign({}, this.userList[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display registration entry section.
    this.showNew = true;
  }

  onDelete(index, userId) {
    this.spinner.show();
    let that = this;
    this.userMasterService.deleteUserById(userId).subscribe(response => {
      if ($.fn.dataTable.isDataTable("#dtBasicExample")) {
        that.dataTable.destroy();
      }

      that.userList.splice(index, 1);
      that.chref.detectChanges();
      that.dataTable = (<any>$('#dtBasicExample')).DataTable(
        {
          "bLengthChange": false,
          "retrieve": true,
          "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0
          }],
          "order": [[1, 'asc']]

        }
      );
        that.dataTable.on('order.dt search.dt', function () {
        that.dataTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
      }).draw();

      $('.dataTables_length').addClass('bs-select');
      that.spinner.hide();
    });
  }

  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

}
