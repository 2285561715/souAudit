import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auditindex-index-mana-profile-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class AuditindexIndexManaProfileEditComponent implements OnInit {
  record: any = [];
  validateForm: FormGroup;

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

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private fb: FormBuilder,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      remark: [this.record.remark, [Validators.required]],
      viewPoint: [this.record.vp, [Validators.required]],
    });
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

  close() {
    this.modal.destroy();
  }
}
