import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-steprocess-tbjczx-wzfiledit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class StepProcessTbjcZxWzfileditEditComponent implements OnInit {
  record: any = [];
  dataValue: any;
  i: any;

  config = {
    toolbars: [
      [
        'bold',
        'italic',
        'underline',
        'superscript',
        'subscript',
        'removeformat',
        'formatmatch',
        'pasteplain',
        '|',
        'rowspacingtop',
        'rowspacingbottom',
        'lineheight',
        'fontsize',
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
        'indent',
        'justifyleft',
        'justifycenter',
        'justifyright',
        'justifyjustify',
        '|',
        'inserttable',
        'mergecells',
        'deletetable',
        '|',
        'spechars',
        'horizontal',
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
    console.log(this.dataValue);
    this.validateForm = this.fb.group({
      indexPGfile: [this.dataValue.pgfile, [Validators.required]],
      attachfiles: [this.dataValue.atfile, [Validators.required]],
    });
  }

  // --------------------------------------------------------------------------
  onChanges(values: any): void {
    // console.log(values);
  }
  _ready(event: any): void {}
  _destroy(): void {
    // console.log('enter  destory');
  }
  _change(event: any) {}
  // --------------------------------------------------------------------------
  submitForm() {
    const fdata = this.validateForm.value;
    const date = new Date();
    const subData = {
      tableName: 'ad_apply_wbswz',
      updateValues:
        "index_comments='" +
        fdata.indexPGfile +
        "',other_attachments='" +
        fdata.attachfiles +
        "',up_time='" +
        format(date, 'YYYY-MM-DD HH:mm:ss') +
        "' ",
      predication: " id='" + this.dataValue.wzid + "'",
    };
    // this.http.put('/api/dynamic/update', subData).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   this.modal.close(true);
    // });
  }
  // ---------------------------------------------------------------------------

  close() {
    this.modal.destroy();
  }
}
