import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-stepprocess-tbjczx-zxtbk051-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepProcessTbjcZxtbK051IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
    private modalService: NzModalService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};
  upUrl = '';

  @Input() dataStr: any;

  nzOptions = [
    {
      value: '高教',
      label: '高教',
      children: [
        { value: '教授', label: '教授', isLeaf: true },
        { value: '副教授', label: '副教授', isLeaf: true },
        { value: '讲师', label: '讲师', isLeaf: true },
        { value: '助教', label: '助教', isLeaf: true },
      ],
    },
    {
      value: '中专/技工',
      label: '中专/技工',
      children: [
        { value: '正高级教师', label: '正高级教师', isLeaf: true },
        { value: '高级讲师', label: '高级讲师', isLeaf: true },
        { value: '讲师', label: '讲师', isLeaf: true },
        { value: '助理讲师', label: '助理讲师', isLeaf: true },
        { value: '教员', label: '教员', isLeaf: true },
      ],
    },
    {
      value: '中小学教师',
      label: '中小学教师',
      children: [
        { value: '正高级教师', label: '正高级教师', isLeaf: true },
        { value: '高级教师', label: '高级教师', isLeaf: true },
        { value: '一级教师', label: '一级教师', isLeaf: true },
        { value: '二级教师', label: '二级教师', isLeaf: true },
        { value: '三级教师', label: '三级教师', isLeaf: true },
      ],
    },
    {
      value: '幼教',
      label: '幼教',
      children: [
        { value: '正高级教师', label: '正高级教师', isLeaf: true },
        { value: '高级教师', label: '高级教师', isLeaf: true },
        { value: '一级教师', label: '一级教师', isLeaf: true },
        { value: '二级教师', label: '二级教师', isLeaf: true },
        { value: '三级教师', label: '三级教师', isLeaf: true },
      ],
    },
    {
      value: '实验人员',
      label: '实验人员',
      children: [
        { value: '正高级实验师', label: '正高级实验师', isLeaf: true },
        { value: '高级实验师', label: '高级实验师', isLeaf: true },
        { value: '实验师', label: '实验师', isLeaf: true },
        { value: '助理实验师', label: '助理实验师', isLeaf: true },
        { value: '实验员', label: '实验员', isLeaf: true },
      ],
    },
    {
      value: '科学研究',
      label: '科学研究',
      children: [
        { value: '研究员', label: '研究员', isLeaf: true },
        { value: '副研究员', label: '副研究员', isLeaf: true },
        { value: '助理研究员', label: '助理研究员', isLeaf: true },
        { value: '研究实习员', label: '研究实习员', isLeaf: true },
      ],
    },
    {
      value: '政工专业',
      label: '政工专业',
      children: [
        { value: '教授级高级政工师', label: '教授级高级政工师', isLeaf: true },
        { value: '高级政工师', label: '高级政工师', isLeaf: true },
        { value: '政工师', label: '政工师', isLeaf: true },
        { value: '助理政工师', label: '助理政工师', isLeaf: true },
        { value: '政工员', label: '政工员', isLeaf: true },
      ],
    },
    {
      value: '技工实习指导',
      label: '技工实习指导',
      children: [
        { value: '正高级实习指导教师', label: '正高级实习指导教师', isLeaf: true },
        { value: '高级实习指导教师', label: '高级实习指导教师', isLeaf: true },
        { value: '一级实习指导教师', label: '一级实习指导教师', isLeaf: true },
        { value: '二级实习指导教师', label: '二级实习指导教师', isLeaf: true },
        { value: '三级实习指导教师', label: '三级实习指导教师', isLeaf: true },
      ],
    },
    {
      value: '工程技术',
      label: '工程技术',
      children: [
        { value: '正高级工程师', label: '正高级工程师', isLeaf: true },
        { value: '高级工程师', label: '高级工程师', isLeaf: true },
        { value: '工程师', label: '工程师', isLeaf: true },
        { value: '助理工程师', label: '助理工程师', isLeaf: true },
        { value: '技术员', label: '技术员', isLeaf: true },
      ],
    },
    {
      value: '经济专业',
      label: '经济专业',
      children: [
        { value: '正高级经济师', label: '正高级经济师', isLeaf: true },
        { value: '高级经济师', label: '高级经济师', isLeaf: true },
        { value: '经济师', label: '经济师', isLeaf: true },
        { value: '助理经济师', label: '助理经济师', isLeaf: true },
        { value: '经济员', label: '经济员', isLeaf: true },
      ],
    },
    {
      value: '会计专业',
      label: '会计专业',
      children: [
        { value: '正高级会计师', label: '正高级会计师', isLeaf: true },
        { value: '高级会计师', label: '高级会计师', isLeaf: true },
        { value: '会计师', label: '会计师', isLeaf: true },
        { value: '助理会计师', label: '助理会计师', isLeaf: true },
        { value: '会计员', label: '会计员', isLeaf: true },
      ],
    },
    {
      value: '图书/文博/档案',
      label: '图书/文博/档案',
      children: [
        { value: '研究馆员', label: '研究馆员', isLeaf: true },
        { value: '副研究馆员', label: '副研究馆员', isLeaf: true },
        { value: '馆员', label: '馆员', isLeaf: true },
        { value: '助理馆员', label: '助理馆员', isLeaf: true },
        { value: '管理员', label: '管理员', isLeaf: true },
      ],
    },
    {
      value: '律师',
      label: '律师',
      children: [
        { value: '一级律师', label: '一级律师', isLeaf: true },
        { value: '二级律师', label: '二级律师', isLeaf: true },
        { value: '三级律师', label: '三级律师', isLeaf: true },
        { value: '四级律师', label: '四级律师', isLeaf: true },
        { value: '律师助理', label: '律师助理', isLeaf: true },
      ],
    },
    {
      value: '卫生技术',
      label: '卫生技术',
      children: [
        { value: '主任医/药/护/技师', label: '主任医/药/护/技师', isLeaf: true },
        { value: '副主任医/药/护/技师', label: '副主任医/药/护/技师', isLeaf: true },
        { value: '主治医/药/护/技师、', label: '主治医/药/护/技师、', isLeaf: true },
        { value: '医/药/护/技师', label: '医/药/护/技师', isLeaf: true },
        { value: '医/药/护/技士', label: '医/药/护/技士', isLeaf: true },
      ],
    },
    {
      value: '艺术专业',
      label: '艺术专业',
      children: [
        { value: '一级演员', label: '一级演员', isLeaf: true },
        { value: '二级演员', label: '二级演员', isLeaf: true },
        { value: '三级演员', label: '三级演员', isLeaf: true },
        { value: '四级演员', label: '四级演员', isLeaf: true },
      ],
    },
    {
      value: '新闻专业',
      label: '新闻专业',
      children: [
        { value: '高级记者/编辑', label: '高级记者/编辑', isLeaf: true },
        { value: '主任记者/编辑', label: '主任记者/编辑', isLeaf: true },
        { value: '记者/编辑', label: '记者/编辑', isLeaf: true },
        { value: '助理记者/编辑', label: '助理记者/编辑', isLeaf: true },
      ],
    },
    {
      value: '统计专业',
      label: '统计专业',
      children: [
        { value: '正高级统计师', label: '正高级统计师', isLeaf: true },
        { value: '高级统计师', label: '高级统计师', isLeaf: true },
        { value: '统计师', label: '统计师', isLeaf: true },
        { value: '助理统计师', label: '助理统计师', isLeaf: true },
        { value: '统计员', label: '统计员', isLeaf: true },
      ],
    },
  ];

  ngOnInit(): void {
    // console.log(this.dataStr);
    // this.upUrl =
    //   '/api/excel/import?tableName=' +
    //   this.dataStr.dtNo +
    //   '&startLine=1' +
    //   '&appId=' +
    //   this.dataStr.appId +
    //   '&stepId=' +
    //   this.dataStr.stepId;
    this.loadInfo();
  }

  loadInfo(): void {
    this.listOfData = [];
    // 获得数据表的数据
    this.http.get('/api/data/tables/search/zxtb/' + this.dataStr.dtNo).subscribe((res: any[]) => {
      res.forEach(item => {
        item.id = item.id + '';
        this.listOfData = [...this.listOfData, item];
        this.editCache[item.id] = {
          edit: false,
          data: { ...item },
        };
      });

      this.cdr.detectChanges();
    });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }
  // 保存数据
  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const data = this.editCache[id].data;

    // 登录用户部门id
    this.http
      .put(
        `/api/data/tables/entry?id=` +
          id +
          `&tableno=` +
          this.dataStr.dtNo +
          `&appId=` +
          this.dataStr.appId +
          `&stepId=` +
          this.dataStr.stepId +
          `&deptId=` +
          this.loadUser.user.bid,
        data,
      )
      .subscribe(res => {
        this.msgSrv.success('保存成功');
      });

    this.editCache[id].edit = false;
  }

  // 新增1条数据
  addData(): void {
    const date = new Date();
    this.http
      .put(
        `/api/data/tables/entry/init?tableno=` +
          this.dataStr.dtNo +
          `&nd=` +
          date.getFullYear() +
          `&appId=` +
          this.dataStr.appId +
          `&stepId=` +
          this.dataStr.stepId +
          `&deptId=51252&deptName=上海开放大学`,
      )
      .subscribe(res => {
        this.msgSrv.success('新增数据成功');
        this.loadInfo();
      });
  }

  dataDelete(id: string): void {
    this.http.delete('/api/data/tables/entry/del?tableno=' + this.dataStr.dtNo + '&id=' + id).subscribe((res: any) => {
      this.msgSrv.success('删除数据成功');
      this.loadInfo();
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  // 数据导入后回调函数
  fupChange(event): void {
    if (event.type === 'success') {
      this.msgSrv.success('本次导入数据：' + event.fileList[0].response + ' 条！');
      this.loadInfo();
    }
  }
  // -----------------
  deleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(),
    });
  }

  deleteInfo() {
    const subData = {
      tableName: this.dataStr.dtNo,
      predication: 'islock=0',
    };
    this.http.request('delete', '/api/dynamic/delete', { body: subData }).subscribe((res: any) => {
      this.msgSrv.success('清空数据成功');
      this.loadInfo();
    });
  }
  // -------------------------------
  onChanges(values: any): void {
    // console.log(values, this.values);
  }
}
