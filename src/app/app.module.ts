import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HealthTipsListContainerComponent } from './pages/health-tips-list-container/health-tips-list-container.component';
import { HealthTipDetailContainerComponent } from './pages/health-tip-detail-container/health-tip-detail-container.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ROOT_REDUCER } from 'src/state/app.state';
import { HealthTipsEffects } from 'src/state/effects/health-tips.effects';
import { HealthTipCardComponent } from './components/health-tip-card/health-tip-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HealthTipsListContainerComponent,
    HealthTipDetailContainerComponent,
    NotFoundPageComponent,
    HealthTipCardComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot([HealthTipsEffects]),
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
