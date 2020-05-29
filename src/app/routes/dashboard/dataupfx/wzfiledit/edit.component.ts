import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { UEditorComponent } from 'ngx-ueditor';

@Component({
  selector: 'app-dashboard-dataupfx-wzfiledit-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class DashboardDataUpFxWzfileditEditComponent implements OnInit {
  isVisible = false;
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

  config_attach = {
    toolbars: [['attachment', '|', 'bold', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', 'horizontal']],
    autoClearinitialContent: true,
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    wordCount: false,
    initialFrameHeight: 200,
  };

  validateForm: FormGroup;

  @ViewChild('full1', { static: true }) full1: UEditorComponent;
  @ViewChild('full2', { static: true }) full2: UEditorComponent;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private el: ElementRef,
  ) {}

  temptext: string;

  ngOnInit(): void {
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
  _change(event: any) {
    this.temptext = this.full1.Instance.getContentTxt();
    if (this.temptext.length > 1088) {
      this.isVisible = true;
    }
  }
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
      predication:
        " ver_index='" +
        this.dataValue.verIndex +
        "' and index_id='" +
        this.dataValue.id +
        "' and dept_id='" +
        this.dataValue.deptId +
        "' and app_id='" +
        this.dataValue.appId +
        "' and step_id='" +
        this.dataValue.stepId +
        "'",
    };

    if (this.temptext.length > 1088) {
      this.isVisible = true;
    } else {
      // 字数小于1000可以提交
      this.http.put('/api/dynamic/update', subData).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }
  // ---------------------------------------------------------------------------
  handleOk(): void {
    this.isVisible = false;
  }

  close() {
    this.modal.destroy();
  }
}
