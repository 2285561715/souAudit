import { SFSchema, SFUISchema } from '@delon/form';
import {
  NzFormatEmitEvent,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzModalRef,
  NzDrawerService,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auditindex-index-mana-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class AuditindexIndexManaSetUpComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  activeNode: any = {};
  validateForm: FormGroup;
  current = 0;

  indexesTempValue = [];
  indexesSetslists = [];

  listOfSjtb = [];
  listOfSelectedSjtb = [];
  listOfSjcj = [];
  listOfSelectedSjcj = [];
  listOfFile = [];
  listOfSelectedFile = [];

  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  ofi = 0;
  ofFZi = 0;
  listOfFZControl: Array<{ id: number; controlInstance: string }> = [];

  ngOnInit() {
    this.validateForm = this.fb.group({
      dataSjtb: [null, [Validators.required]],
      dataSjcj: [null, [Validators.required]],
      dataFile: [null, [Validators.required]],
    });
    // console.log(this.activeNode);
    this.addField();
    this.addFZField();
    this.loadSets();
    this.cdr.detectChanges();
  }

  // 获取indexes_sets的conType\typeNO\TypeName\typeValue
  loadSets(): void {
    this.http.get('/api/indexes/sets?indexId=' + this.activeNode.key).subscribe((res: any) => {
      // this.indexesSetslists = res;
      res.forEach(item => {
        switch (item.conType) {
          case 'sjtb':
            this.listOfSelectedSjtb.push(item.typeNo);
            break;
          case 'sjcj':
            this.listOfSelectedSjcj.push(item.typeNo);
            break;
          case 'file':
            this.listOfSelectedFile.push(item.typeNo);
            break;
          case 'tjlx':
            switch (this.ofi) {
              case 0:
                this.validateForm.controls.tjlx0.setValue(item.typeNo);
                break;
              case 1:
                this.addField();
                this.validateForm.controls.tjlx1.setValue(item.typeNo);
                break;
              case 2:
                this.addField();
                this.validateForm.controls.tjlx2.setValue(item.typeNo);
                break;
              case 3:
                this.addField();
                this.validateForm.controls.tjlx3.setValue(item.typeNo);
                break;
              case 4:
                this.addField();
                this.validateForm.controls.tjlx4.setValue(item.typeNo);
                break;
            }
            this.ofi = this.ofi + 1;
            break;
          case 'psbzfz':
            switch (this.ofFZi) {
              case 0:
                this.validateForm.controls.psbzfz0.setValue(item.typeNo);
                break;
              case 1:
                this.addFZField();
                this.validateForm.controls.psbzfz1.setValue(item.typeNo);
                break;
              case 2:
                this.addFZField();
                this.validateForm.controls.psbzfz2.setValue(item.typeNo);
                break;
              case 3:
                this.addFZField();
                this.validateForm.controls.psbzfz3.setValue(item.typeNo);
                break;
              case 4:
                this.addFZField();
                this.validateForm.controls.psbzfz4.setValue(item.typeNo);
                break;
            }
            this.ofFZi = this.ofFZi + 1;
            break;
          default:
            break;
        }
      });

      this.loadInfo();
      // console.log(this.indexesSetslists);
    });
    this.cdr.detectChanges();
  }

  loadInfo(): void {
    // 按评估类别是总校还是分校查询，显示填报表、采集表、资料表清单---------------------------------
    const children: Array<{ id: number; status: boolean; bno: string; bname: string }> = [];
    if (this.activeNode.verIndex.substring(4, 6) === 'zx') {
      // 加载 总校数据填报表、总校数据采集表、总校文字单片材料
      this.http.get('/api/data/tables?dtType=zxtb').subscribe((res: any[]) => {
        this.listOfSjtb = res;
      });
      this.http.get('/api/data/tables?dtType=zxcj').subscribe((res: any[]) => {
        this.listOfSjcj = res;
      });
      this.http.get('/api/wzfile/files?fileType=zxwz').subscribe((res: any[]) => {
        this.listOfFile = res;
      });
      // 加载 end------------------------------------------
    } else {
      // 加载 分校数据填报表、分校数据采集表、分校文字单片材料
      this.http.get('/api/data/tables?dtType=fxtb').subscribe((res: any[]) => {
        this.listOfSjtb = res;
      });
      this.http.get('/api/data/tables?dtType=fxcj').subscribe((res: any[]) => {
        this.listOfSjcj = res;
      });
      this.http.get('/api/wzfile/files?fileType=fxwz').subscribe((res: any[]) => {
        this.listOfFile = res;
      });
      // 加载 end------------------------------------------
    }
    this.cdr.detectChanges();
  }

  // 填报表、采集表、资料单 的change事件函数
  estbFromChange(value: any): void {
    this.listOfSelectedSjtb = value;
  }
  escjFromChange(value: any): void {
    this.listOfSelectedSjcj = value;
  }
  esflFromChange(value: any): void {
    this.listOfSelectedFile = value;
  }

  // 第二个步骤 添加、删除项----------------------------------------------------------------
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `tjlx${id}`,
    };
    const index = this.listOfControl.push(control);
    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required),
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      // console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }
  // 第二个步骤 设置阀值的 添加、删除项---------------------------------------------------------------
  addFZField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfFZControl.length > 0 ? this.listOfFZControl[this.listOfFZControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `psbzfz${id}`,
    };
    const index = this.listOfFZControl.push(control);
    // console.log(this.listOfFZControl[this.listOfFZControl.length - 1]);
    this.validateForm.addControl(
      this.listOfFZControl[index - 1].controlInstance,
      new FormControl(null, Validators.required),
    );
  }

  removeFZField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfFZControl.length > 1) {
      const index = this.listOfFZControl.indexOf(i);
      this.listOfFZControl.splice(index, 1);
      // console.log(this.listOfFZControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }
  // end 第三步骤
  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[name];
  }

  // 切换 步骤条
  changeContent(): void {
    switch (this.current) {
      case 0: {
        document.getElementById('stepAct1').style.display = 'block';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'none';

        break;
      }
      case 1: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'block';
        document.getElementById('stepAct3').style.display = 'none';
        break;
      }
      case 2: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'block';
        break;
      }
      default: {
        // this.index = 'error';
        break;
      }
    }
  }

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
  // -------------------------------------------------------------------------------------

  done(): void {
    // console.log(this.validateForm.value);
    // console.log('done');
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    data.verIndex = this.activeNode.verIndex;
    data.indexId = this.activeNode.key;
    data.indexName = this.activeNode.origin.title;

    data.dataSjtb = this.listOfSelectedSjtb;
    data.dataSjcj = this.listOfSelectedSjcj;
    data.dataFile = this.listOfSelectedFile;

    this.http.post(`/api/indexes/sets`, data).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
