import './polyfills.ts';

import { enableProdMode } from '@angular/core';//ng核心模塊
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';//方法:告訴ng啟動時要做的應用

import { AppModule } from './app/app.module';//主模塊
import { environment } from './environments/environment';//環境配置

if (environment.production) {//導出產品時
  enableProdMode();//關閉開發模式
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
