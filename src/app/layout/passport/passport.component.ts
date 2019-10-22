import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {
  constructor(private msgSrv: NzMessageService, public http: _HttpClient) {}
  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];

  shoucang(sTitle: string, sURL: string): void {
    this.msgSrv.success('加入收藏失败，请使用Ctrl+D进行添加!');
  }
}
