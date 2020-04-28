import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-zx-handupdatatable-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class SysdataZxHandupdatatableEditComponent implements OnInit {
  record: any = {};

  config = {
    toolbars: [
      [
        'bold',
        'italic',
        'underline',
        'fontborder',
        'strikethrough',
        'superscript',
        'subscript',
        'removeformat',
        'formatmatch',
        // 'autotypeset',
        // 'blockquote',
        'pasteplain',
        '|',
        'forecolor',
        'backcolor',
        'insertorderedlist',
        'insertunorderedlist',
        'selectall',
        'cleardoc',
        '|',
        'insertimage',
        'attachment',
        '|',
        'inserttable',
        'insertparagraphbeforetable',
        'insertrow',
        'insertcol',
        'mergeright',
        'mergedown',
        'deleterow',
        'deletecol',
        'splittorows',
        'splittocols',
        'splittocells',
        'mergecells',
        'deletetable',
        '|',
        'horizontal',
        // 'source',
      ],
    ],
    autoClearinitialContent: true,
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    wordCount: false,
    initialFrameHeight: 200,
  };

  current = 0;
  validateForm: FormGroup;
  listOfDept = [];
  dutyDeptName: string;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      dtName: [this.record.dtName, [Validators.required]],
      fieldsNum: [this.record.fieldsNum, [Validators.required]],
      dutyDept: [this.record.dutyDept, [Validators.required]],
      zdNameList: [this.record.zdNameList],
      zdZhNameList: [this.record.zdZhNameList],
      zdTypeList: [this.record.zdTypeList],
      descRules: [this.record.descRules, [Validators.required]],
      checkRules: [this.record.checkRules],
      tableHtml: [this.record.tableHtml],
    });
    this.loadInfo();
  }

  loadInfo(): void {
    this.http.get('/api/departments').subscribe((res: any) => {
      this.listOfDept = res;
    });
    this.cdr.detectChanges();
  }

  esFromChange(value: any): void {
    this.listOfDept.forEach(element => {
      if (element.id === value) {
        this.dutyDeptName = element.bname;
      }
    });
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        document.getElementById('stepAct1').style.display = 'block';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'none';
        document.getElementById('stepAct4').style.display = 'none';
        break;
      }
      case 1: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'block';
        document.getElementById('stepAct3').style.display = 'none';
        document.getElementById('stepAct4').style.display = 'none';
        break;
      }
      case 2: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'block';
        document.getElementById('stepAct4').style.display = 'none';
        break;
      }
      case 3: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'none';
        document.getElementById('stepAct4').style.display = 'block';
        break;
      }
      default: {
        // do nothing;
      }
    }
  }
  // --------------------------------------------------------------------------
  onChanges(values: any): void {
    console.log(values);
  }

  _ready(event: any): void {}

  _destroy(): void {
    console.log('enter  destory');
  }

  _change(event: any) {}
  // --------------------------------------------------------------------------
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  onIndexChange(index: number): void {
    this.current = index;
    this.changeContent();
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const data = this.validateForm.value;
    data.id = this.record.id;
    data.dutyDeptName = this.dutyDeptName;
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;
    data.modTime =
      date.getFullYear() +
      '-' +
      month +
      '-' +
      strDate +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();

    this.http.put(`/api/data/tables`, data).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }
  close() {
    this.modal.destroy();
  }
}
