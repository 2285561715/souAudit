import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { format } from 'date-fns';

@Component({
  selector: 'app-auditindex-index-mana-profile-edit',
  templateUrl: './edit.component.html',
})
export class AuditindexIndexManaProfileEditComponent implements OnInit {
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
        'autotypeset',
        'blockquote',
        'pasteplain',
        '|',
        'forecolor',
        'backcolor',
        'insertorderedlist',
        'insertunorderedlist',
        'selectall',
        'cleardoc',
        // '|',
        // 'insertimage',
        // 'attachment',
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
        'source',
      ],
    ],
    autoClearinitialContent: true,
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    wordCount: false,
    initialFrameHeight: 200,
  };

  schema: SFSchema = {
    properties: {
      remark: { type: 'string', title: '模板范文' },
    },
    required: ['remark'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 11 },
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 22 },
      autosize: { minRows: 10, maxRows: 15 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    this.i = this.record;
  }

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
  // save(value: any) {
  //   value.id = this.record.id;
  //   value.dataFromDate = value.dataFromDate.substring(0, 10);
  //   value.dataEndDate = value.dataEndDate.substring(0, 10);
  //   value.releaseDate = value.releaseDate.substring(0, 10);

  //   const date = new Date();
  //   let month: string | number = date.getMonth() + 1;
  //   let strDate: string | number = date.getDate();
  //   month = month < 10 ? '0' + month : month;
  //   strDate = strDate < 10 ? '0' + strDate : strDate;

  //   value.lastModTime =
  //     date.getFullYear() +
  //     '-' +
  //     month +
  //     '-' +
  //     strDate +
  //     ' ' +
  //     date.getHours() +
  //     ':' +
  //     date.getMinutes() +
  //     ':' +
  //     date.getSeconds();

  //   this.http.put(`/api/main/infos`, value).subscribe(res => {
  //     this.msgSrv.success('保存成功');
  //     this.modal.close(true);
  //   });
  // }

  close() {
    this.modal.destroy();
  }
}
