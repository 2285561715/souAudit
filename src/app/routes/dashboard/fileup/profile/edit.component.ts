import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-dashboard-fileup-profile-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class DashboardFileupProfileEditComponent implements OnInit {
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
    this.validateForm = this.fb.group({
      remark: [this.record.remark, [Validators.required]],
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

  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
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

  close() {
    this.modal.destroy();
  }
}
