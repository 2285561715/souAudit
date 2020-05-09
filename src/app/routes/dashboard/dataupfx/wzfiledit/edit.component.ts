import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-dashboard-dataupfx-wzfiledit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class DashboardDataUpFxWzfileditEditComponent implements OnInit {
  record: any = [];
  i: any;

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

  config_attach = {
    toolbars: [['attachment', '|', 'bold', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', 'horizontal']],
    autoClearinitialContent: true,
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    wordCount: false,
    initialFrameHeight: 200,
  };

  validateForm: FormGroup;
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    console.log(this.record);

    this.validateForm = this.fb.group({
      indexPGfile: [this.record.indexPGfile, [Validators.required]],
      attachfiles: [this.record.attachfiles, [Validators.required]],
    });

    this.i = this.record;
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

  save(value: any) {
    value.id = this.record.id;
    const subData = {
      tableName: 'ad_indexes',
      updateValues: "report_model='" + value.remark + "'",
      predication: 'id=' + value.id,
    };
    this.http.put('/api/dynamic/update', subData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  // --------------------------------------------------------------------------
  submitForm() {
    const fdata = this.validateForm.value;
    const subData = {
      tableName: 'ad_indexes',
      updateValues: "remark='" + fdata.remark + "',view_point='" + fdata.viewPoint + "' ",
      predication: 'id=' + this.record.id,
    };
    this.http.put('/api/dynamic/update', subData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }
  // ---------------------------------------------------------------------------

  close() {
    this.modal.destroy();
  }
}
