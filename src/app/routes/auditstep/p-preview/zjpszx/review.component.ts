import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-auditstep-preview-zjpszx-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.less'],
})
export class AuditstepPreviewZjpsZxReviewComponent implements OnInit {
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
        // 'attachment',
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
      point: [this.dataValue.pspoint, [Validators.required]],
      ppmark: [this.dataValue.ppmark, [Validators.required]],
      remark: [this.dataValue.psremark, [Validators.required]],
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
      tableName: 'ad_apply_wbszjps',
      updateValues:
        "ps_point='" +
        fdata.point +
        "',pp_mark='" +
        fdata.ppmark +
        "',ps_text='" +
        fdata.remark +
        "',mod_time='" +
        format(date, 'YYYY-MM-DD HH:mm:ss') +
        "' ",
      predication: " id='" + this.dataValue.pid + "'",
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
